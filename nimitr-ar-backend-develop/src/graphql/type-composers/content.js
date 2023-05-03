"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentTC = void 0;
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const content_1 = __importDefault(require("../../models/content"));
const project_1 = require("./project");
const marker_1 = require("./marker");
const media_1 = require("./media");
exports.ContentTC = (0, graphql_compose_mongoose_1.composeWithMongoose)(content_1.default);
exports.ContentTC.addRelation('project', {
    resolver: () => project_1.ProjectTC.getResolver('findById'),
    prepareArgs: {
        _id: (source) => source.project,
    },
    projection: { project: true },
});
exports.ContentTC.addRelation('marker', {
    resolver: () => marker_1.MarkerTC.getResolver('findById'),
    prepareArgs: {
        _id: (source) => source.marker,
    },
    projection: { marker: true },
});
exports.ContentTC.addRelation('media', {
    resolver: () => media_1.MediaTC.getResolver('findOne'),
    prepareArgs: {
        filter: (source) => ({ content: source._id }),
    },
    projection: { id: true },
});
