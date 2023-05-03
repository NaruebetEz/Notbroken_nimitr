"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const password_hash_1 = __importDefault(require("password-hash"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_compose_1 = require("graphql-compose");
const models_1 = require("../../models");
const util_1 = require("../../../config/util");
const loginResolver = new graphql_compose_1.Resolver({
    name: "login",
    type: "String",
    args: {
        username: "String!",
        password: "String!",
    },
    resolve: async ({ args }) => {
        const { username, password } = args;
        const user = await models_1.UserModel.findOne({ username });
        // console.log(user)
        if (!user) {
            throw new apollo_server_express_1.UserInputError(`Username ${username} not found`);
        }
        const valid = password_hash_1.default.verify(password, `${user.password}`);
        if (!valid) {
            throw new apollo_server_express_1.UserInputError("Incorrect password");
        }
        if (user.role === "TEACHER") {
            await models_1.UserModel.findOneAndUpdate({ username }, { isTeacher: true });
        }
        return (0, util_1.jwtSign)({
            _id: user._id,
            role: user.role,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            mobile: user.mobile,
        }, "3d");
    },
}, graphql_compose_1.schemaComposer);
const authMutations = {
    login: loginResolver,
};
exports.default = authMutations;
