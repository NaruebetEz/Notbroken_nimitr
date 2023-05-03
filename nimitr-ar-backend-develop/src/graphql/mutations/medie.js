"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const media_1 = require("../type-composers/media");
const mediaMutations = {
    createMedia: media_1.MediaTC.getResolver('createOne'),
    updateMedia: media_1.MediaTC.getResolver('updateById'),
    removeMedia: media_1.MediaTC.getResolver('removeById'),
};
exports.default = mediaMutations;
