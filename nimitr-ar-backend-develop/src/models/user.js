"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserModel = exports.MemberUserModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const DKey = 'Lv';
const enumUserType = {
    ADMIN: 'Admin',
    MEMBER: 'Member',
};
const enumUserRank = {
    NOMAL: 'Normal',
    PREMIUM: 'Premium',
    ADMIN: 'Admin',
};
const UserSchema = new Schema({
    role: {
        type: String,
        required: true,
        enum: Object.keys(enumUserType),
    },
    rank: {
        type: String,
        required: true,
        enum: Object.keys(enumUserRank),
    },
    username: { type: String, required: true },
    password: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    mobile: { type: String },
}, { timestamps: true });
const AdminUserSchema = new Schema({});
const MemberUserSchema = new Schema({});
// const StudentUserSchema = new Schema({})
UserSchema.set('discriminatorKey', DKey);
exports.UserModel = mongoose_1.default.model('User', UserSchema);
exports.MemberUserModel = exports.UserModel.discriminator(enumUserType.MEMBER, MemberUserSchema);
exports.AdminUserModel = exports.UserModel.discriminator(enumUserType.ADMIN, AdminUserSchema);
// export const TeacherUserModel = UserModel.discriminator(
//   enumUserType.TEACHER,
//   TeacherUserSchema
// )
// export const StudentUserModel = UserModel.discriminator(
//   enumUserType.STUDENT,
//   StudentUserSchema
// )
exports.default = exports.UserModel;
// import mongoose from 'mongoose'
// const { Schema } = mongoose
// const DKey = 'Lv'
// const enumUserType = {
//   ADMIN: 'Admin',
//   TEACHER: 'Teacher',
//   STUDENT: 'Student',
// }
// const UserSchema = new Schema(
//   {
//     role: {
//       type: String,
//       required: true,
//       enum: Object.keys(enumUserType),
//     },
//     code: { type: String },
//     firstname: { type: String, },
//     lastname: { type: String, },
//     username: { type: String, required: true, },
//     avatar: { type: String, },
//     email: { type: String, },
//     mobile: { type: String, },
//     description: { type: String, },
//     password: { type: String, },
//     facebook: {
//       name: { type: String, },
//       link: { type: String, }
//     },
//     youtube: {
//       name: { type: String, },
//       link: { type: String, }
//     },
//     instagram: {
//       name: { type: String, },
//       link: { type: String, }
//     },
//     createdById: { type: String, },
//     isTeacher: { type: Boolean, default: false, },
//     expire: { type: Date },
//     member: { type: String, enum: ['NORMAL', 'VIP'], default: 'NORMAL' }
//   },
//   { timestamps: true }
// )
// const AdminUserSchema = new Schema({})
// // const TeacherUserSchema = new Schema({})
// // const StudentUserSchema = new Schema({})
// UserSchema.set('discriminatorKey', DKey)
// export const UserModel = mongoose.model('User', UserSchema)
// export const AdminUserModel = UserModel.discriminator(
//   enumUserType.ADMIN,
//   AdminUserSchema
// )
// // export const TeacherUserModel = UserModel.discriminator(
// //   enumUserType.TEACHER,
// //   TeacherUserSchema
// // )
// // export const StudentUserModel = UserModel.discriminator(
// //   enumUserType.STUDENT,
// //   StudentUserSchema
// // )
// export default UserModel
