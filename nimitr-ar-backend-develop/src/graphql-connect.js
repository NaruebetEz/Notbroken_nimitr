"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kikstart_graphql_client_1 = require("kikstart-graphql-client");
const client = new kikstart_graphql_client_1.GraphQLClient({
    url: 'http://localhost:4000/graphql',
    wsUrl: 'ws://localhost:4000/graphql'
});
exports.default = client;
