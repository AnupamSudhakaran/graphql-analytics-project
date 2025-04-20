import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
class Customer {
    @Prop({required:true})
    name: string
    
    @Prop({required:true,unique:true})
    email: string

    @Prop({required:true})
    age: number

    @Prop({required:false})
    location: string

    @Prop({required:true})
    gender: string
}

export type CustomerModel =  Customer & Document
export const CustomerSchema = SchemaFactory.createForClass(Customer);
