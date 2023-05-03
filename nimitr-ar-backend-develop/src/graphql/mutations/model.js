"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../type-composers/model");
const ModelMutations = {
    createModel: model_1.ModelTC.getResolver('createOne'),
    updateModel: model_1.ModelTC.getResolver('updateById'),
    removeModel: model_1.ModelTC.getResolver('removeById'),
};
exports.default = ModelMutations;
