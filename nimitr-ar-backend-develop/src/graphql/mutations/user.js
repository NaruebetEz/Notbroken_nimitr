"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pubsub = void 0;
const password_hash_1 = __importDefault(require("password-hash"));
const graphql_subscriptions_1 = require("graphql-subscriptions");
const graphql_compose_1 = require("graphql-compose");
const models_1 = require("../../models");
const user_1 = require("../type-composers/user");
exports.pubsub = new graphql_subscriptions_1.PubSub();
const setPassword = new graphql_compose_1.Resolver({
    name: 'setPassword',
    type: user_1.UserTC.getType(),
    args: {
        _id: 'String!',
        password: 'String!',
    },
    resolve: async ({ args }) => {
        const { _id, password } = args;
        const hashedPassword = password_hash_1.default.generate(password);
        const user = await models_1.UserModel.findOneAndUpdate({ _id }, { password: hashedPassword }, { new: true });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    },
}, graphql_compose_1.schemaComposer);
const userMutations = {
    createAdminUser: user_1.AdminUserTC.getResolver('createOne', [
        async (next, s, a, c, i) => {
            var _a;
            const username = (_a = a === null || a === void 0 ? void 0 : a.record) === null || _a === void 0 ? void 0 : _a.username;
            const user = await models_1.UserModel.findOne({ username });
            if (username === (user === null || user === void 0 ? void 0 : user.username)) {
                throw new Error('User already Exist');
            }
            else if (username !== (user === null || user === void 0 ? void 0 : user.username)) {
                return next(s, a, c, i);
            }
        },
    ]),
    updateAdminUser: user_1.AdminUserTC.getResolver('updateById'),
    removeAdminUser: user_1.AdminUserTC.getResolver('removeById'),
    createMemberUser: user_1.MemberUserTC.getResolver('createOne', [
        async (next, s, a, c, i) => {
            var _a;
            const username = (_a = a === null || a === void 0 ? void 0 : a.record) === null || _a === void 0 ? void 0 : _a.username;
            const user = await models_1.UserModel.findOne({ username });
            if (username === (user === null || user === void 0 ? void 0 : user.username)) {
                throw new Error('User already Exist');
            }
            else if (username !== (user === null || user === void 0 ? void 0 : user.username)) {
                return next(s, a, c, i);
            }
        },
    ]),
    updateMemberUser: user_1.MemberUserTC.getResolver('updateById'),
    removeMemberUser: user_1.MemberUserTC.getResolver('removeById'),
    updateUser: user_1.UserTC.getResolver('updateById'),
    removeUser: user_1.UserTC.getResolver('removeById'),
    setPassword,
};
exports.default = userMutations;
