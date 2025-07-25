import mongoose from 'mongoose';
import { config } from '../config.js';
import Project from '../models/Project.js';

const sampleProjects = [
  {
    title: "QA Dashboard",
    description: "Real-time dashboard for tracking QA KPIs across projects.",
                  "techStack": ["React", "Node.js", "MongoDB", "Socket.io"],
    techStack: ["React", "Node.js", "MongoDB", "Chart.js"],
    status: "ongoing",
    dateStarted: new Date("2025-06-01"),
    highlights: ["Live metrics", "Custom filters", "API integration"]
  },
  {
    title: "Bug Tracker",
    description: "Web app for logging, assigning, and tracking bugs.",
    techStack: ["Express", "MongoDB", "Tailwind CSS"],
    status: "completed",
    dateStarted: new Date("2024-05-01"),
    dateCompleted: new Date("2024-07-12"),
    repoLink: "https://github.com/felister/bug-tracker",
    liveLink: "https://bugtracker.felister.dev",
    highlights: ["User roles", "Priority tagging", "Notification system"]
  },
  {
    title: "Automation Pipeline",
    description: "CI/CD QA automation pipeline with report integration.",
    techStack: ["Jenkins", "Selenium", "Docker"],
    status: "completed",
    dateStarted: new Date("2024-01-10"),
    dateCompleted: new Date("2024-03-20"),
    highlights: ["Parallel testing", "Slack reporting", "Cross-browser coverage"]
  }
];

mongoose.connect(config.mongoUri)
  .then(async () => {
    console.log('MongoDB connected — seeding data...');
    await Project.deleteMany({});
    await Project.insertMany(sampleProjects);
    console.log('✅ Sample projects inserted.');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Seed error:', err);
    mongoose.disconnect();
  });
