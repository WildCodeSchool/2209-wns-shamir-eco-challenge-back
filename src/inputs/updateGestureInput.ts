import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateGestureInput {
  @Field()
  name!: string;

  @Field()
  imgUrl!: string;

  @Field()
  text!: string;
}
