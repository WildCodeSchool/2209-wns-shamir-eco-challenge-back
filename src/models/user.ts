import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  email!: string;

  @Field()
  @Column()
  hashedPassword!: string;

  @Field()
  @Column()
  role!: string;

  @Field()
  @Column({ nullable: true })
  name!: string;

  @Field()
  @Column()
  image!: string;

  @Field()
  @Column()
  color!: string;
}
