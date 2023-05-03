"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelTC = void 0;
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const model_1 = __importDefault(require("../../models/model"));
exports.ModelTC = (0, graphql_compose_mongoose_1.composeWithMongoose)(model_1.default);
