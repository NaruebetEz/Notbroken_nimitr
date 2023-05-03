"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaTC = void 0;
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const media_1 = __importDefault(require("../../models/media"));
const content_1 = require("./content");
const project_1 = require("./project");
exports.MediaTC = (0, graphql_compose_mongoose_1.composeWithMongoose)(media_1.default);
exports.MediaTC.addRelation('media', {
    resolver: () => content_1.ContentTC.getResolver('findById'),
    prepareArgs: {
        _id: (source) => source.media,
    },
    projection: { media: true },
});
exports.MediaTC.addRelation('project', {
    resolver: () => project_1.ProjectTC.getResolver('findById'),
    prepareArgs: {
        _id: (source) => source.project,
    },
    projection: { project: true },
});
