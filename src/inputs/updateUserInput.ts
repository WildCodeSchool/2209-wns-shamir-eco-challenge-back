import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateUserInput {
    @Field()
    id!: number;

    @Field()
    name!: string;
}
