import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType, Int } from "type-graphql";

@ObjectType()
@Entity()
export class Challenge {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id?: number;

    @Field()
    @Column()
    name!: string;
}