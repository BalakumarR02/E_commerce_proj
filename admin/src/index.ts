import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import {
    ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";
import { ItemResover } from "./resolvers/ItemResolver";
import { UserResolver } from "./resolvers/UserResolver";

import { redis } from "./redis";

declare module 'express-session' {
    interface Session {
        userId: number;
    }
}

const main = async () => {
    await createConnection();

    const schema = await buildSchema({
        resolvers: [ItemResover, UserResolver],
    });

    const apolloServer = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
        context: ({ req, res }: any) => ({ req, res })
    });

    const app = Express();

    const RedisStore = connectRedis(session);

    app.use(
        cors({
            credentials: true,
            origin: "http://localhost:3000"
        })
    );

    app.use(
        session({
            store: new RedisStore({
                client: redis as any
            }),
            name: "qid",
            secret: "aslkdfjoiq12312",
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
                sameSite: false
            }
        })
    );
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(4000, () => {
        console.log("server started on http://localhost:4000/graphql");
    });
};

main();