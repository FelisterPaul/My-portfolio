import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

const isAdmin = (req, res, next) => {
  // For now, always allow. Replace with real auth in production.
  next();
};

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ dateStarted: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

router.post('/', isAdmin, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

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
