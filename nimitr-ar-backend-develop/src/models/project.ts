import mongoose from 'mongoose'
const { Schema } = mongoose

const ProjectSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		name: { type: String, required: true },
		url: { type: String },
		imageurl: { type: String },
		contents: { type: Array },
		projectStatus: {
			type: String,
			enum: ['PROJECT_ALIVE', 'PROJECT_DELETE'],
			default: 'PROJECT_ALIVE',
		},
	},
	{ timestamps: true }
)

export const ProjectModel = mongoose.model('Project', ProjectSchema)

export default ProjectModel
