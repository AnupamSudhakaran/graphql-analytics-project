import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

// _id,name,category,price,stock

@Schema()
class Product {

    @Prop({required:true})
    name: string
    
    @Prop({required:true})
    category: string

    @Prop({required:true})
    price: number

    @Prop({required:true})
    stock: number
}

export type ProductModel =  Product & Document
export const ProductSchmea = SchemaFactory.createForClass(Product);
