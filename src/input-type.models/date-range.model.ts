import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DateRangeModel {
    @Field()
    startDate: Date;

    @Field()
    endDate: Date;
}