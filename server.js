import {ApolloServer} from "apollo-server-express";
import mongoose from "mongoose";
import express from "express";
import {createServer} from "http";

import resolvers from "./src/apollo-server/resolver.js";
import typeDefs from "./src/apollo-server/schema.js";
import baseInfo from "./src/baseInfo.json" assert {type: "json"};
import ExchangeInfo from "./src/models/exchangeInfo.js";

import dotenv from "dotenv";
dotenv.config();

mongoose.set('strictQuery', false);
mongoose
    .connect(`mongodb://localhost:${process.env.MONGO_PORT}/test`)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log(error));

// baseInfo 를 등록
baseInfo.map((info) => {
    let newInfo = new ExchangeInfo(info);
    newInfo.save().then(r => console.log(r));
})

const app = express();
const server = new ApolloServer({typeDefs, resolvers});
await server.start();

server.applyMiddleware({app, path: "/graphql"});

const httpserver = createServer(app);
httpserver.listen({port: process.env.PORT}, () => {
    console.log(`Apollo Server on http://localhost:${process.env.PORT}/graphql`);
});