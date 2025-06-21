import mongoose from 'mongoose';
const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: {type: String},
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
},{timestamps:ture});
const Project = mongoose.model('Project', ProjectSchema);

export default Project;

