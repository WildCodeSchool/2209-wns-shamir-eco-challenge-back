import { InputType, Field } from "type-graphql";

@InputType()
export class CreateGestureInput {
  @Field()
  id!: number;

  @Field()
  name!: string;
}