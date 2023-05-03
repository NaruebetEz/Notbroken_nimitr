"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// http://localhost:4000/api/v1/message
const routerv1 = (0, express_1.Router)();
// routerv1
// 	.route('/group')
// 	.post(validationGroup as any, group.createGroup as any)
// 	.get(group.getAllGroups as any)
// routerv1
// 	.route('/group/:groupId')
// 	.get(group.getByIdGroup as any)
// 	.put(group.updateGroup as any)
// 	.delete(group.deleteGroup as any)
// router.route('/message/:id')
//   .put(validationCustomer, message.updateCustomer)
//   .delete(message.deleteCustomer)
// router.route('/message/:code')
//   .get(message.getByCodeCustomer)
exports.default = routerv1;
