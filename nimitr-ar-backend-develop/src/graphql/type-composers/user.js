"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberUserTC = exports.AdminUserTC = exports.UserTC = void 0;
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const models_1 = require("../../models");
const baseOptions = {
    fields: {
        remove: ['password'],
    },
};
exports.UserTC = (0, graphql_compose_mongoose_1.composeWithMongooseDiscriminators)(models_1.UserModel, baseOptions);
// export const TeacherUserTC = UserTC.discriminator(TeacherUserModel)
exports.AdminUserTC = exports.UserTC.discriminator(models_1.AdminUserModel);
exports.MemberUserTC = exports.UserTC.discriminator(models_1.MemberUserModel);
// export const StudentUserTC = UserTC.discriminator(StudentUserModel)
exports.UserTC.addRelation('createdById', {
    resolver: () => exports.UserTC.getResolver('findById'),
    prepareArgs: {
        _id: (source) => source.createdById,
    },
    projection: { createdById: true },
});
exports.default = exports.UserTC;
