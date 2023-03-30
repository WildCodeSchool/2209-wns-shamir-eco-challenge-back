import { InputType, Field } from "type-graphql";
import { Gesture } from "../models/gesture";
import { User } from "../models/user";

@InputType()
export class UpdateChallengeInput {
  @Field()
  name!: string;

  @Field()
  image!: string;

  @Field()
  startDate!: string;

  @Field()
  endDate!: string;

  @Field()
  challengeStatus!: string;

  @Field(() => [Number], { nullable: false })
  gestures: Gesture[];

  @Field(() => [Number], { nullable: false })
  players: User[];
}
