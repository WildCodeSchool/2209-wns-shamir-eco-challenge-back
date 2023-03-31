import { InputType, Field } from "type-graphql";


@InputType()
export class UpdateUserInput {
  @Field()
  id!: number;

  @Field({ nullable: true })
  name!: string;

  @Field()
  image!: string;

  @Field()
  email!: string;

  @Field()
  color!: string;

  @Field()
  hashedPassword!: string;

  @Field()
  role!: string;
}
