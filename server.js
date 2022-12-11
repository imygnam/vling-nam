import {ApolloServer} from "apollo-server-express";
import mongoose from "mongoose";
import express from "express";
import {createServer} from "http";

import resolvers from "./src/apollo-server/resolver.js";
import typeDefs from "./src/apollo-server/schema.js";

mongoose.connect("mongodb://localhost:27017/test");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("Connected to MongoDB");
});

const app = express();

const server = new ApolloServer({typeDefs, resolvers});
await server.start();
server.applyMiddleware({app, path: "/graphql"});

const httpserver = createServer(app);
httpserver.listen({port: 5110}, () => {
    console.log("Apollo Server on http://localhost:5110/graphql");
});