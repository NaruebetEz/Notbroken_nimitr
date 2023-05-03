import {
	composeWithMongooseDiscriminators,
	ComposeWithMongooseOpts,
	composeWithMongoose,
} from 'graphql-compose-mongoose'

import { UserModel, AdminUserModel, MemberUserModel } from '../../models'

const baseOptions = {
	fields: {
		remove: ['password'],
	},
}

export const UserTC = composeWithMongooseDiscriminators(UserModel, baseOptions)
// export const TeacherUserTC = UserTC.discriminator(TeacherUserModel)
export const AdminUserTC = UserTC.discriminator(AdminUserModel)
export const MemberUserTC = UserTC.discriminator(MemberUserModel)

// export const StudentUserTC = UserTC.discriminator(StudentUserModel)

UserTC.addRelation('createdById', {
	resolver: () => UserTC.getResolver('findById'),
	prepareArgs: {
		_id: (source) => source.createdById,
	},
	projection: { createdById: true },
})

export default UserTC
