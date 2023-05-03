"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../type-composers/user");
const userQueries = {
    users: user_1.UserTC.getResolver('findMany'),
    userId: user_1.UserTC.getResolver('findById'),
    adminUser: user_1.AdminUserTC.getResolver('findOne'),
    adminUserId: user_1.AdminUserTC.getResolver('findById'),
    adminUsers: user_1.AdminUserTC.getResolver('findMany'),
    memberUser: user_1.MemberUserTC.getResolver('findOne'),
    memberUserId: user_1.MemberUserTC.getResolver('findById'),
    memberUsers: user_1.MemberUserTC.getResolver('findMany'),
};
exports.default = userQueries;
