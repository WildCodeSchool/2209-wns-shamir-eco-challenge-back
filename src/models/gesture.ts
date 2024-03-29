import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType, Int } from "type-graphql";

@ObjectType()
@Entity()
export class Gesture {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  imgUrl!: string;

  @Field()
  @Column()
  text!: string;
}
