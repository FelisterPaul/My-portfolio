import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: [true, 'Project title is required'],
      trim: true,
      maxLength: [100, 'Title cannot be more than 100 characters']
    },
    description: { 
      type: String,
      trim: true,
      maxLength: [500, 'Description cannot be more than 500 characters']
    },
    techStack: {
      type: [String],
      validate: {
        validator: function(v) {
          return v.length > 0;
        },
        message: 'At least one technology must be specified'
      }
    },
    repoLink: { 
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\//.test(v);
        },
        message: 'Repository link must be a valid URL'
      }
    },
    liveLink: { 
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\//.test(v);
        },
        message: 'Live link must be a valid URL'
      }
    },
    status: { 
      type: String, 
      enum: {
        values: ['ongoing', 'in-progress', 'completed', 'on-hold'],
        message: '{VALUE} is not a valid status'
      },
      default: 'ongoing',
      lowercase: true
    },
    dateStarted: { 
      type: Date,
      required: [true, 'Start date is required'],
      default: Date.now
    },
    dateCompleted: { 
      type: Date,
      validate: {
        validator: function(v) {
          return !v || v >= this.dateStarted;
        },
        message: 'Completion date cannot be earlier than start date'
      }
    },
    highlights: {
      type: [String],
      validate: {
        validator: function(v) {
          return v.every(item => item.length <= 200);
        },
        message: 'Each highlight must be 200 characters or less'
      }
    },
    priority: {
      type: Number,
      min: [1, 'Priority must be between 1 and 5'],
      max: [5, 'Priority must be between 1 and 5'],
      default: 3
    },
    category: {
      type: String,
      enum: {
        values: ['web', 'mobile', 'api', 'automation', 'other'],
        message: '{VALUE} is not a valid category'
      },
      required: [true, 'Project category is required']
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for project duration
projectSchema.virtual('duration').get(function() {
  const end = this.dateCompleted || new Date();
  return Math.ceil((end - this.dateStarted) / (1000 * 60 * 60 * 24));
});

// Index for better query performance
projectSchema.index({ status: 1, dateStarted: -1 });
projectSchema.index({ category: 1 });

export default mongoose.model('Project', projectSchema);
