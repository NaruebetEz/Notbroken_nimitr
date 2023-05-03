"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_compose_1 = require("graphql-compose");
const queries_1 = __importDefault(require("./queries"));
const mutations_1 = __importDefault(require("./mutations"));
graphql_compose_1.schemaComposer.Query.addFields(queries_1.default);
graphql_compose_1.schemaComposer.Mutation.addFields(mutations_1.default);
// schemaComposer.Subscription.addFields(subscriptionFields)
const GQLSchema = graphql_compose_1.schemaComposer.buildSchema();
exports.default = GQLSchema;
