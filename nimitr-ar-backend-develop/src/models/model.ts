import mongoose from 'mongoose'
const { Schema } = mongoose

const ModelSchema = new Schema(
	{
		// project: {
		// 	type: Schema.Types.ObjectId,
		// 	ref: 'Project',
		// 	required: true,
		// },

		name: { type: String, required: true },

		scale: { type: Number },

		rotationX: { type: Number },

		rotationY: { type: Number },

		rotationZ: { type: Number },

		type: {
			type: String,
		},

		mediaUrl: {
			type: String,
		},

		modelStatus: {
			type: String,
			enum: ['MODEL_ALIVE', 'MODEL_DELETE'],
			default: 'MODEL_ALIVE',
		},
	},
	{ timestamps: true }
)

export const ModelModel = mongoose.model('Model', ModelSchema)

export default ModelModel
