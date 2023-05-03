"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const MediaSchema = new Schema({
    content: {
        type: Schema.Types.ObjectId,
        ref: 'Content',
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    mediaUrl: {
        type: String,
    },
}, { timestamps: true });
exports.MediaModel = mongoose_1.default.model('Media', MediaSchema);
exports.default = exports.MediaModel;
