// models/Project.js
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

// ✅ ES Module export
export default Project;
