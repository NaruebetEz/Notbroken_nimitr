import mongoose from 'mongoose'

const { Schema } = mongoose

const MediaSchema = new Schema(
	{
		content: {
			type: Schema.Types.ObjectId,
			ref: 'Content',
		},

		project: {
			type: Schema.Types.ObjectId,
			ref: 'Project',
			required: true,
		},

		name: {
			type: String,
		},

		type: {
			type: String,
		},

		mediaUrl: {
			type: String,
		},
	},
	{ timestamps: true }
)

export const MediaModel = mongoose.model('Media', MediaSchema)

export default MediaModel
