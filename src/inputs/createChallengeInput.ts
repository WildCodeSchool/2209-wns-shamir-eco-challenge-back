import { InputType, Field } from "type-graphql";

@InputType()
export class CreateChallengeInput {
  @Field()
  id!: number;

  @Field()
  name!: string;
}