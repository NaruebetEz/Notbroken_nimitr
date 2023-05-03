"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_1 = require("../type-composers/project");
const projectMutations = {
    createProject: project_1.ProjectTC.getResolver('createOne'),
    updateProject: project_1.ProjectTC.getResolver('updateById'),
    removeProject: project_1.ProjectTC.getResolver('removeById'),
};
exports.default = projectMutations;
