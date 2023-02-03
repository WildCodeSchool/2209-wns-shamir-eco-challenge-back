import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType, Int } from "type-graphql";
import { Gesture } from "./gesture";
import { User } from "./user";

@ObjectType()
@Entity()
export class Challenge {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  image!: string;

  @Field()
  @Column()
  startDate!: string;

  @Field()
  @Column()
  endDate!: string;

  @Field()
  @Column()
  challengeStatus!: string;

  @Field(() => [Gesture])
  @ManyToMany(() => Gesture, (gesture) => gesture.id, { eager: true })
  @JoinTable()
  gestures: Gesture[];

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.id, { eager: true })
  @JoinTable()
  players: User[];
}
