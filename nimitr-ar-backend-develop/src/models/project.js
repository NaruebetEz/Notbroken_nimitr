"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const ProjectSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    url: { type: String },
    imageurl: { type: String },
    contents: { type: Array },
    projectStatus: {
        type: String,
        enum: ['PROJECT_ALIVE', 'PROJECT_DELETE'],
        default: 'PROJECT_ALIVE',
    },
}, { timestamps: true });
exports.ProjectModel = mongoose_1.default.model('Project', ProjectSchema);
exports.default = exports.ProjectModel;
