"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const ContentSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    name: { type: String, required: true },
    scale: { type: Number },
    rotationX: { type: Number },
    rotationY: { type: Number },
    rotationZ: { type: Number },
    marker: {
        type: Schema.Types.ObjectId,
        ref: 'Marker',
    },
    media: {
        type: Schema.Types.ObjectId,
        ref: 'Media',
    },
    contentStatus: {
        type: String,
        enum: ['CONTENT_ALIVE', 'CONTENT_DELETE'],
        default: 'CONTENT_ALIVE',
    },
}, { timestamps: true });
exports.ContentModel = mongoose_1.default.model('Content', ContentSchema);
exports.default = exports.ContentModel;
