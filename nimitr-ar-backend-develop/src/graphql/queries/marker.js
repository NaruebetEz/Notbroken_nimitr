"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const marker_1 = require("../type-composers/marker");
const markerQueries = {
    marker: marker_1.MarkerTC.getResolver('findOne'),
    markerId: marker_1.MarkerTC.getResolver('findById'),
    markers: marker_1.MarkerTC.getResolver('findMany'),
};
exports.default = markerQueries;
