
// { "productId": "63f8b3d5a7b1d7f3b0a2c5e5", "name": "Wireless Headphones", "totalSold": 300 }

import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class  ProductSalesModel{
    
    @Field(()=>ID)
    productId: string;

    @Field()
    name: string;

    @Field()
    totalSold: number;
}