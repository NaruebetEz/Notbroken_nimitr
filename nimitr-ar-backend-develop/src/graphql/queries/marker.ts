import { MarkerTC } from '../type-composers/marker'

const markerQueries = {
	marker: MarkerTC.getResolver('findOne'),
	markerId: MarkerTC.getResolver('findById'),
	markers: MarkerTC.getResolver('findMany'),
}

export default markerQueries
