import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// Middleware to check if user is admin (example)
const isAdmin = (req, res, next) => {
  // Replace with your actual authentication logic
  const isAdminUser = true; // Example: Check if user is admin
  if (isAdminUser) {
    next();
  } else {
    res.status(403).json({ error: 'Unauthorized' });
  }
};

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ dateStarted: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get projects by status
router.get('/status/:status', async (req, res) => {
  const { status } = req.params;
  try {
    const projects = await Project.find({ 
      status: { $regex: new RegExp(`^${status}$`, 'i') } 
    }).sort({ dateStarted: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add project (Admin only)
router.post('/', isAdmin, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete project (Admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
