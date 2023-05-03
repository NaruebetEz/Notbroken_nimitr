"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const media_1 = require("../type-composers/media");
const mediaQueries = {
    media: media_1.MediaTC.getResolver('findOne'),
    mediaId: media_1.MediaTC.getResolver('findById'),
    medias: media_1.MediaTC.getResolver('findMany'),
};
exports.default = mediaQueries;
