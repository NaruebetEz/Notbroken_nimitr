"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_1 = require("../type-composers/project");
const projectQueries = {
    project: project_1.ProjectTC.getResolver('findOne'),
    projectId: project_1.ProjectTC.getResolver('findById'),
    projects: project_1.ProjectTC.getResolver('findMany'),
};
exports.default = projectQueries;
