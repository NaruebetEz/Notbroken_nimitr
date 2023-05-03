import { ModelTC } from '../type-composers/model'

const modelQueries = {
	model: ModelTC.getResolver('findOne'),
	modelId: ModelTC.getResolver('findById'),
	models: ModelTC.getResolver('findMany'),
}

export default modelQueries
