import { InputType, Field } from "type-graphql";

@InputType()
export class CreateChallengeInput {
 
  @Field()
  name!: string;
}