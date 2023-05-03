"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkerModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const MarkerSchema = new Schema({
    content: {
        type: Schema.Types.ObjectId,
        ref: 'Content',
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
    },
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    markerStatus: {
        type: String,
        enum: ['MARKER_ALIVE', 'MARKER_DELETE'],
        default: 'MARKER_ALIVE',
    },
    markerType: {
        type: String,
    },
    markerNo: { type: String },
    markerPattern: {
        type: String,
    },
    markerUrl: {
        type: String,
    },
}, { timestamps: true });
exports.MarkerModel = mongoose_1.default.model('Marker', MarkerSchema);
exports.default = exports.MarkerModel;
