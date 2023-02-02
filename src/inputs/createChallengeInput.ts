import { InputType, Field } from "type-graphql";
import { Gesture } from "../models/gesture";

@InputType()
export class CreateChallengeInput {
  @Field()
  name!: string;

  @Field(() => [Number], { nullable: false })
  gestures!: Gesture[];
}