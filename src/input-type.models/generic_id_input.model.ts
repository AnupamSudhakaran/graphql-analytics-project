import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GenericIdInputType{
    @Field()
    _id: string;

    @Field({nullable:true})
    skip?:number
}