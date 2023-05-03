import authMutations from './auth'
import userMutations from './user'

import projectMutations from './project'
import contentMutations from './content'
import mediaMutations from './medie'
import markerMutations from './marker'

export default {
	...authMutations,
	...userMutations,
	...projectMutations,
	...mediaMutations,
	...markerMutations,
	...contentMutations,
}
