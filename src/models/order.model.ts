import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Mongoose } from "mongoose";

// _id,customerId,products,totalAmount,orderDate,status

@ObjectType()
export class ProductDetails {
    @Field()
    @Prop({ required: true })
    productId: string

    @Field()
    @Prop({ required: true })
    quantity: number
}

@ObjectType()
@Schema()
export class Order {

    @Field()
    @Prop({ required: true, unique: true ,index: true})
    _id: string

    @Field()
    @Prop({ required: true, index: true })
    customerId: string

    @Field(()=> [ProductDetails])
    @Prop({ required: true })
    products: ProductDetails[]

    @Field()
    @Prop({ required: true })
    totalAmount: number

    @Field()
    @Prop({ required: true })
    orderDate: Date

    @Field()
    @Prop({ required: true })
    status: string
}

export type OrderModel = Order & Document
export const OrderSchema = SchemaFactory.createForClass(Order);

