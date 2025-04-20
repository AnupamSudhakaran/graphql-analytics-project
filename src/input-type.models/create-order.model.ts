import { Field, InputType } from "@nestjs/graphql"

@InputType("prdDetals")
export class ProductDetails {
    @Field()
    productId: string

    @Field()
    quantity: number
}


@InputType("CreateOrderInput")
export class CrateOrderInputModel {

    @Field()
    _id: string

    @Field()
    customerId: string

    @Field(()=> [ProductDetails])
    products: ProductDetails[]

    @Field()
    totalAmount: number

    @Field()
    orderDate: Date

    @Field()
    status: string
}