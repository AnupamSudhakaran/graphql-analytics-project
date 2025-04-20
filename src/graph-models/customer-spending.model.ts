import { Field, ID, ObjectType } from "@nestjs/graphql";


// {
    //     "customerId": "63f8b3d5a7b1d7f3b0a2c5e1",
    //     "totalSpent": 1500.75,
    //     "averageOrderValue": 250.12,
    //     "lastOrderDate": "2024-02-18T10:30:00Z"
    //   }
    
@ObjectType()
export class CustomerSpendingModel{

    @Field(()=> ID)
    customerId: string;

    @Field()
    totalSpent: number;

    @Field()
    averageOrderValue: number;

    @Field()
    lastOrderDate: Date;
}