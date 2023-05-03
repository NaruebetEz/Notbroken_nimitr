"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importDefault(require("mongoose"));
const bluebird_1 = __importDefault(require("bluebird"));
const { uri, mongooseOptions } = config_1.default.get('db.mongodb');
// console.log('moo', mongooseOptions);
const options = Object.assign(Object.assign({}, mongooseOptions), { promiseLibrary: bluebird_1.default });
// mongoose.Promise = Promise
// mongoose.connect(uri, options)
mongoose_1.default.connect(`${uri}`);
