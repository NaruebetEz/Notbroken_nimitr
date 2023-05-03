"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const ModelSchema = new Schema({
    // project: {
    // 	type: Schema.Types.ObjectId,
    // 	ref: 'Project',
    // 	required: true,
    // },
    name: { type: String, required: true },
    scale: { type: Number },
    rotationX: { type: Number },
    rotationY: { type: Number },
    rotationZ: { type: Number },
    type: {
        type: String,
    },
    mediaUrl: {
        type: String,
    },
    modelStatus: {
        type: String,
        enum: ['MODEL_ALIVE', 'MODEL_DELETE'],
        default: 'MODEL_ALIVE',
    },
}, { timestamps: true });
exports.ModelModel = mongoose_1.default.model('Model', ModelSchema);
exports.default = exports.ModelModel;
