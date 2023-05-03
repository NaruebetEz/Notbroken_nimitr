"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const content_1 = require("../type-composers/content");
const contentQueries = {
    content: content_1.ContentTC.getResolver('findOne'),
    contentId: content_1.ContentTC.getResolver('findById'),
    contents: content_1.ContentTC.getResolver('findMany'),
};
exports.default = contentQueries;
