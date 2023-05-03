"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../type-composers/model");
const modelQueries = {
    model: model_1.ModelTC.getResolver('findOne'),
    modelId: model_1.ModelTC.getResolver('findById'),
    models: model_1.ModelTC.getResolver('findMany'),
};
exports.default = modelQueries;
