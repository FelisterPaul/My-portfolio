import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    techStack: [String],
    repoLink: { type: String },
    liveLink: { type: String },
    status: { type: String, enum: ['ongoing', 'completed'], default: 'ongoing' },
    dateStarted: { type: Date },
    dateCompleted: { type: Date },
    highlights: [String],
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
