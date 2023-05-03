"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const project_1 = __importDefault(require("./project"));
const marker_1 = __importDefault(require("./marker"));
const media_1 = __importDefault(require("./media"));
const content_1 = __importDefault(require("./content"));
const model_1 = __importDefault(require("./model"));
exports.default = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, user_1.default), media_1.default), marker_1.default), content_1.default), project_1.default), model_1.default);
