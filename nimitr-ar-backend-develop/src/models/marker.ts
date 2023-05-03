import mongoose from 'mongoose'

const { Schema } = mongoose

const MarkerSchema = new Schema(
	{
		content: {
			type: Schema.Types.ObjectId,
			ref: 'Content',
		},

		project: {
			type: Schema.Types.ObjectId,
			ref: 'Project',
		},

		name: {
			type: String,
		},

		type: {
			type: String,
		},

		markerStatus: {
			type: String,
			enum: ['MARKER_ALIVE', 'MARKER_DELETE'],
			default: 'MARKER_ALIVE',
		},

		markerType: {
			type: String,
		},

		markerNo: { type: String },

		markerPattern: {
			type: String,
		},

		markerUrl: {
			type: String,
		},
	},
	{ timestamps: true }
)

export const MarkerModel = mongoose.model('Marker', MarkerSchema)

export default MarkerModel
