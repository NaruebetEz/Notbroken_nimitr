"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectTC = void 0;
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const project_1 = __importDefault(require("../../models/project"));
const content_1 = require("./content");
const media_1 = require("./media");
const user_1 = require("./user");
const marker_1 = require("./marker");
exports.ProjectTC = (0, graphql_compose_mongoose_1.composeWithMongoose)(project_1.default);
exports.ProjectTC.addRelation('user', {
    resolver: () => user_1.UserTC.getResolver('findById'),
    prepareArgs: {
        _id: (source) => source.user,
    },
    projection: { user: true },
});
exports.ProjectTC.addRelation('contents', {
    resolver: () => content_1.ContentTC.getResolver('findMany'),
    prepareArgs: {
        filter: (source) => ({ project: source._id }),
    },
    projection: { id: true },
});
exports.ProjectTC.addRelation('markers', {
    resolver: () => marker_1.MarkerTC.getResolver('findMany'),
    prepareArgs: {
        filter: (source) => ({ project: source._id }),
    },
    projection: { id: true },
});
exports.ProjectTC.addRelation('medias', {
    resolver: () => media_1.MediaTC.getResolver('findMany'),
    prepareArgs: {
        filter: (source) => ({ project: source._id }),
    },
    projection: { id: true },
});
