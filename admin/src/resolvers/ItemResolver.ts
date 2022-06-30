import { isAuth } from "../middleware/isAuth";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Item } from "../entity/Items";
import { UpdateItem } from "./input/UpdateItem";


@Resolver()
export class ItemResover {

    @Query(() => String)
    async helloWorld() {
        return "hello";
    }

    @Mutation(() => Item)
    @UseMiddleware(isAuth)
    async createItem(
        @Arg("title") title: string,
        @Arg("description") description: string,
        @Arg("imageUrl") imageUrl: string,
        @Arg("price") price: number,
        @Arg("quantity") quantity: number,
    ): Promise<Item> {
        const item = await Item.create({
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price,
            quantity: quantity,
        }).save();
        return item;
    }

    @Mutation(() => Item)
    @UseMiddleware(isAuth)
    async editItem(
        @Arg("id") id: number,
        @Arg("data") data: UpdateItem,

    ): Promise<Item | null> {
        const item = await Item.findOne({ where: { id: id } });
        if (!item) {
            throw new Error("Item not found");
        }

        Object.assign(item, data);
        await item.save();
        return item;

    }
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteItem(
        @Arg("id") id: number
    ): Promise<Boolean | null> {
        const item = await Item.findOne({ where: { id: id } });
        if (!item) {
            return null;
        }
        const nid = id;
        await item.remove();
        item.id = nid;
        return true;
    }


    @Query(() => [Item])
    @UseMiddleware(isAuth)
    async allItems() {

        const [item, itemcount] = await Item.findAndCount();
        console.log(itemcount);
        return item;
    }



}



