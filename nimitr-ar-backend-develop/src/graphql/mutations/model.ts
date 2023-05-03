import { ModelTC } from '../type-composers/model'

const ModelMutations = {
	createModel: ModelTC.getResolver('createOne'),
	updateModel: ModelTC.getResolver('updateById'),
	removeModel: ModelTC.getResolver('removeById'),
}

export default ModelMutations
