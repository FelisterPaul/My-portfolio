import mongoose from 'mongoose';
import { config } from '../config.js';
import Project from '../models/Project.js';

const sampleProjects = [
  {
    title: "QA Dashboard",
    description: "Real-time dashboard for tracking QA KPIs across projects.",
    techStack: ["React", "Node.js", "MongoDB", "Chart.js"],
    status: "Ongoing",
    dateStarted: new Date("2025-06-01"),
    highlights: ["Live metrics", "Custom filters", "API integration"]
  },
  {
    title: "API Testing Suite",
    description: "Automated API testing framework with detailed reporting.",
    techStack: ["Postman", "Newman", "Postman CLI"],
    status: "Ongoing",
    dateStarted: new Date("2024-05-01"),
    highlights: ["Cross-platform support", "Custom assertions", "Environment management"]
  },
  {
    title: "Automation Pipeline",
    description: "CI/CD QA automation pipeline with report integration.",
    techStack: ["Jenkins", "Selenium", "Docker"],
    status: "Ongoing",
    dateStarted: new Date("2024-01-10"),
    highlights: ["Parallel testing", "Slack reporting", "Cross-browser coverage"]
  }
];

mongoose.connect(config.mongoUri)
  .then(async () => {
    console.log('MongoDB connected — starting seed...');
    await Project.deleteMany({});
    const result = await Project.insertMany(sampleProjects);
    console.log(`✅ ${result.length} projects inserted.`);
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('❌ Seed error:', err);
    mongoose.disconnect();
  });
