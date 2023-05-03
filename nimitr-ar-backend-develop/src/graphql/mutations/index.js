"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const project_1 = __importDefault(require("./project"));
const content_1 = __importDefault(require("./content"));
const medie_1 = __importDefault(require("./medie"));
const marker_1 = __importDefault(require("./marker"));
exports.default = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, auth_1.default), user_1.default), project_1.default), medie_1.default), marker_1.default), content_1.default);
