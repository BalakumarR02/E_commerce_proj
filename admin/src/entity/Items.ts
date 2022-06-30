import { Field, Float, ID, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@ObjectType()
@Entity()
export class Item extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column({ nullable: true })
    imageUrl: string;

    @Field(() => Float)
    @Column("decimal", { precision: 10, scale: 2, default: 0.0 })
    price: number;

    @Field(() => Int)
    @Column()
    quantity: number;

}