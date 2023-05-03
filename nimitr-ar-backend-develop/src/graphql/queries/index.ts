import userQueries from './user'
import projectQueries from './project'
import markerQueries from './marker'
import mediaQueries from './media'
import contentQueries from './content'
import modelQueries from './model'


export default {
	...userQueries,
	...mediaQueries,
	...markerQueries,
	...contentQueries,
	...projectQueries,
	...modelQueries,
}
