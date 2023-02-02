import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateGestureInput {
    @Field()
    id!: number;

    @Field()
    name!: string;
}
