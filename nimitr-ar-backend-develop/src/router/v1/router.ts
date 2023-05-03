import { Router } from 'express'

import { check } from './auth/auth'
import validationEmailSend from './controller/email/validate'
import validationGroup from './controller/group/validate'

// http://localhost:4000/api/v1/message
const routerv1 = Router()

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

export default routerv1
