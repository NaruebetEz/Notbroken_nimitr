"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const content_1 = require("../type-composers/content");
const ContentMutations = {
    createContent: content_1.ContentTC.getResolver('createOne'),
    updateContent: content_1.ContentTC.getResolver('updateById'),
    removeContent: content_1.ContentTC.getResolver('removeById'),
};
exports.default = ContentMutations;
