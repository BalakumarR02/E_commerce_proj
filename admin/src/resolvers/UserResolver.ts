import { User } from "../entity/User";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import * as  bcrypt from "bcryptjs";
import { MyContext } from "../MyContext";


@Resolver()
export class UserResolver {

    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: MyContext): Promise<User | null> {
        if (!ctx.req.session!.userId) {
            return null;
        }

        return await User.findOne({ where: { id: ctx.req.session!.userId } }) as User;
    }
    @Mutation(() => User)
    async Register(
        @Arg("username") username: string,
        @Arg("password") password: string,

    ): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            username: username,
            password: hashedPassword
        }).save();

        return user;
    }
    @Mutation(() => User, { nullable: true })
    async login(
        @Arg("username") username: string,
        @Arg("password") password: string,
        @Ctx() ctx: MyContext
    ): Promise<User | null> {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return null;
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid || !user.confirmed) {
            return null;
        }

        ctx.req.session!.userId = user.id;

        return user;
    }

    @Mutation(() => Boolean)
    logout(@Ctx() { req, res }: MyContext) {
        return new Promise((resolve) =>
            req.session.destroy((err) => {
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }
                res.clearCookie('qid');
                resolve(true);
            })
        );

    }
}



