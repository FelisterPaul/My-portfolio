import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  techStack: [{
    type: String,
    required: true
  }],
  status: {
    type: String,
    enum: ['ongoing', 'completed', 'on-hold'],
    default: 'ongoing',
    lowercase: true
  },
  dateStarted: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Project', projectSchema);
