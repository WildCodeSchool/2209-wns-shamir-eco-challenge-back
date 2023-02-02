import { InputType, Field } from "type-graphql";

@InputType()
export class CreateGestureInput {
  
  @Field()
  name!: string;
}