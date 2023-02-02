import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType, Int } from "type-graphql";
import { Gesture } from "./gesture";

@ObjectType()
@Entity()
export class Challenge {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id?: number;

    @Field()
    @Column()
    name!: string;

    @ManyToMany(() => Gesture, { eager: true })
    @JoinTable()
    gestures: Gesture[];
}