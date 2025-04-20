import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LimitInputTypeModel{

    @Field()
    limit: number;
}