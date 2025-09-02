import mongoose from 'mongoose';
import { config } from '../config.js';
import Project from '../models/Project.js';

async function seedDatabase() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    console.log('Cleared existing data');

    // Sample projects
    const sampleProjects = [
      {
        title: "QA Dashboard",
        description: "Real-time dashboard for tracking QA KPIs across projects.",
        techStack: ["React", "Node.js", "MongoDB", "Chart.js"],
        status: "ongoing",
        dateStarted: new Date("2025-06-01"),
        highlights: ["Live metrics", "Custom filters", "API integration"]
      },
      {
        title: "Automation Framework",
        description: "Reusable framework for automating web and API tests.",
        techStack: ["Selenium", "C#", "RestSharp", "NUnit"],
        status: "completed",
        dateStarted: new Date("2024-11-15"),
        highlights: ["Modular design", "Cross-browser support", "Detailed reports"]
      },
      {
        title: "Mobile App Testing",
        description: "End-to-end testing of mobile app features and performance.",
        techStack: ["Appium", "Java", "TestNG", "Jenkins"],
        status: "ongoing",
        dateStarted: new Date("2025-01-20"),
        highlights: ["Device farm integration", "Performance testing", "CI/CD pipeline"]
      }
    ];

    // Insert sample projects
    await Project.insertMany(sampleProjects);
    console.log('Inserted sample projects');

    console.log('Database seeding completed');
  } catch (error) {
    console.error('Database seeding failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedDatabase();
