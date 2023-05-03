"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkerTC = void 0;
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const marker_1 = __importDefault(require("../../models/marker"));
const content_1 = require("./content");
const project_1 = require("./project");
exports.MarkerTC = (0, graphql_compose_mongoose_1.composeWithMongoose)(marker_1.default);
exports.MarkerTC.addRelation('marker', {
    resolver: () => content_1.ContentTC.getResolver('findById'),
    prepareArgs: {
        _id: (source) => source.content,
    },
    projection: { content: true },
});
exports.MarkerTC.addRelation('project', {
    resolver: () => project_1.ProjectTC.getResolver('findById'),
    prepareArgs: {
        _id: (source) => source.project,
    },
    projection: { project: true },
});
