import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AnalyticsService } from "./analytics.service";
import { CustomerSpendingModel } from "src/graph-models/customer-spending.model";
import { GenericIdInputType } from "src/input-type.models/generic_id_input.model";
import { ProductSalesModel } from "src/graph-models/products-sales.model";
import { LimitInputTypeModel } from "src/input-type.models/limit-input.model";
import { SalesAnalyticsModel } from "src/graph-models/sales-analytics.model";
import { DateRangeModel } from "src/input-type.models/date-range.model";
import { Order, OrderModel, OrderSchema } from "src/models/order.model";
import {CrateOrderInputModel} from "src/input-type.models/create-order.model";
@Resolver()
export class AnalyticsResolver {
    constructor(private readonly analyticsService: AnalyticsService) {}
    
    @Query(()=>CustomerSpendingModel,{nullable:true}) 
    async getCustomerSpends(@Args('params') { _id }:GenericIdInputType): Promise<CustomerSpendingModel> {
        const resp =  await this.analyticsService.getCustomerSpends(_id);
        return resp;
    }

    @Query(()=>[ProductSalesModel], {nullable:true})
    async getTopSellingProducts(@Args('params') { limit }: LimitInputTypeModel) : Promise<ProductSalesModel[]>  {
        return await this.analyticsService.getTopSellingProducts(limit) as unknown as ProductSalesModel[];
    }

    @Query(()=>SalesAnalyticsModel, {nullable:true})
    async getTopSellingProductsByCategory(@Args('params') { startDate, endDate}: DateRangeModel): Promise<SalesAnalyticsModel> {
    
        return await this.analyticsService.getTopSellingProductsByCategory(startDate, endDate) as unknown as SalesAnalyticsModel;
    }

    @Mutation(() => Order,{nullable:true})
    async createOrder(@Args("createOrderInput") orderModel: CrateOrderInputModel): Promise<Order> {
        return await this.analyticsService.createOrder(orderModel) as unknown as Order;
    }

    @Query(()=>[Order],{nullable:true})
    async getAllOrdersUsingCustomerId(@Args('params') { _id ,skip}:GenericIdInputType){
        return await this.analyticsService.getAllOrdersUsingCustomerId(_id,skip) as unknown as Order[];
    }

}