import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateItem {
    @Field({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    imageUrl?: string;

    @Field({ nullable: true })
    price?: number;

    @Field({ nullable: true })
    quantity?: number;
}
