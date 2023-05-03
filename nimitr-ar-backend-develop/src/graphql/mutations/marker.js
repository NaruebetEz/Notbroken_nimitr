"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const marker_1 = require("../type-composers/marker");
const markerMutations = {
    createMarker: marker_1.MarkerTC.getResolver('createOne'),
    updateMarker: marker_1.MarkerTC.getResolver('updateById'),
    removeMarker: marker_1.MarkerTC.getResolver('removeById'),
};
exports.default = markerMutations;
