import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { OrderModel, ProductDetails } from 'src/models/order.model';
import { UUID } from 'bson';
import { json } from 'stream/consumers';
@Injectable()
export class AnalyticsService {

    constructor(
        @InjectModel("order")
        private readonly orderModel: Model<OrderModel>
    ) { }
    async getCustomerSpends(customerId: string): Promise<any> {
        console.log("Customer ID: ", customerId)
        const pipeline = [
            {
                $match: { customerId: customerId, status: "completed" }
            },
            {
                $group: {
                    _id: "$customerId",
                    totalSpent: { $sum: "$totalAmount" },
                    averageOrderValue: { $avg: "$totalAmount" },
                    lastOrderDate: { $max: "$orderDate" }
                }
            },
            {
                $project: {
                    _id: 0,
                    customerId: "$_id",
                    totalSpent: { $round: ["$totalSpent", 2] },
                    averageOrderValue: { $round: ["$averageOrderValue", 2] },
                    lastOrderDate: 1
                }
            }
        ];
        const result = await this.orderModel.aggregate(pipeline).exec();
        console.log("Result: ", result)
        // Mocked data for demonstration purposes
        return result[0];
    }




    async getTopSellingProducts(limit): Promise<any[]> {

        const pipeline: PipelineStage[] = [
            {
                $match: { status: { $ne: "canceled" } }
            },
            {
                $unwind: "$products"
            },
            {
                $group: {
                    _id: "$products.productId",
                    totalSold: { $sum: "$products.quantity" }
                }
            },
            {
                $sort: { totalSold: -1 }
            },
            {
                $limit: limit
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "productInfo"
                }
            },
            {
                $project: {
                    _id: 0,
                    productId: "$_id",
                    name: { $arrayElemAt: ["$productInfo.name", 0] },
                    totalSold: 1
                }
            }
        ];

        const result = await this.orderModel.aggregate(pipeline).exec();
        console.log("Result: ", result)
        return result;
    }


    async getTopSellingProductsByCategory(startDate, endDate) {
        console.log("Start Date: ", startDate, "End Date: ", endDate)
        startDate = new Date(startDate);
        endDate = new Date(endDate);    
        const pipeline = [
            {
                $match: {
                    status: "completed",
                    orderDate: {
                        $gte: startDate, // replace with your startDate
                        $lte: endDate  // replace with your toDate
                    }
                }
            },
            {
                $facet: {
                    summary: [
                        {
                            $group: {
                                _id: null,
                                totalRevenue: { $sum: "$totalAmount" },
                                completedOrders: { $sum: 1 }
                            }
                        }
                    ],
                    categoryData: [
                        { $unwind: "$products" },
                        {
                            $lookup: {
                                from: "products",
                                localField: "products.productId",
                                foreignField: "_id",
                                as: "productDetails"
                            }
                        },
                        { $unwind: "$productDetails" },
                        {
                            $group: {
                                _id: "$productDetails.category",
                                revenue: {
                                    $sum: {
                                        $multiply: [
                                            "$products.quantity",
                                            "$products.priceAtPurchase"
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                category: "$_id",
                                revenue: 1
                            }
                        }
                    ]
                }
            },
            {
                $project: {
                    totalRevenue: { $arrayElemAt: ["$summary.totalRevenue", 0] },
                    completedOrders: { $arrayElemAt: ["$summary.completedOrders", 0] },
                    categoryBreakdown: "$categoryData"
                }
            }
        ]
        const result = await this.orderModel.aggregate(pipeline).exec();
        console.log("Result: ", result)
        console.log("Result[0]: ", result[0].categoryBreakdown)
        return result[0];
    }

    async createOrder(orderModel) {
        try {
            orderModel = JSON.parse(JSON.stringify(orderModel));
            console.log("Order Model: ", orderModel);
            return await this.orderModel.create(orderModel);
        }catch (e) {
            console.log("error",e)
        }
    }

    async getAllOrdersUsingCustomerId(customerId,skip = 0){
        try {
            return await this.orderModel.find({ customerId: customerId }).skip(skip);       
        } catch (error) {
            throw error;
        }
    }


    async adjustToModel() {
        const orders = await this.orderModel.find({});
        console.log("Orders: ", orders)
        orders.forEach(async (order) => {
            const objectOrder = order.products as unknown as string
            console.log("Object Order: ", objectOrder, typeof objectOrder)
            const fixedStr = objectOrder[0].replace(/'/g, '"');
            const arr = JSON.parse(fixedStr);
            order.products = arr as ProductDetails[]

            try {
                const resp = await this.orderModel.updateOne({ _id: order?._id }, order);
            } catch (e) {
                console.log("Error updating order: ", e)
            }
        })

    }
}
