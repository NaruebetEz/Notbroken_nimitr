import mongoose from 'mongoose'
const { Schema } = mongoose

const ContentSchema = new Schema(
	{
		project: {
			type: Schema.Types.ObjectId,
			ref: 'Project',
			required: true,
		},

		name: { type: String, required: true },

		scale: { type: Number },

		rotationX: { type: Number },

		rotationY: { type: Number },

		rotationZ: { type: Number },

		marker: {
			type: Schema.Types.ObjectId,
			ref: 'Marker',
		},

		media: {
			type: Schema.Types.ObjectId,
			ref: 'Media',
		},

		contentStatus: {
			type: String,
			enum: ['CONTENT_ALIVE', 'CONTENT_DELETE'],
			default: 'CONTENT_ALIVE',
		},
	},
	{ timestamps: true }
)

export const ContentModel = mongoose.model('Content', ContentSchema)

export default ContentModel
