import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUserInput {
  @Field()
  password!: string;

  @Field()
  email!: string;
}
