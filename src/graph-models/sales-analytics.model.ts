
import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class CategoryBreakdown {
    @Field()
    category: string;

    @Field()
    revenue: number;
}

@ObjectType()
export class SalesAnalyticsModel {
    @Field()
    totalRevenue: number;

    @Field()
    completedOrders: number;

    @Field(()=> [CategoryBreakdown])
    categoryBreakdown: CategoryBreakdown[];
}
    