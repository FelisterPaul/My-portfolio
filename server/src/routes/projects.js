import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// 🟢 Create new project
router.post('/', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.error("❌ Error creating project:", err);
    res.status(400).json({ error: err.message });
  }
});

// 🔍 Get all projects (with optional status filter)
router.get('/', async (req, res) => {
  const { status } = req.query;
  try {
    const query = status ? { status } : {};
    const projects = await Project.find(query).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error("❌ Error fetching projects:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🔍 Get single project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    console.error("❌ Error retrieving project:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Update project by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: 'Project not found' });
    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating project:", err);
    res.status(400).json({ error: err.message });
  }
});

// 🗑️ Delete project by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted successfully', id: deleted._id });
  } catch (err) {
    console.error("❌ Error deleting project:", err);
    res.status(400).json({ error: err.message });
  }
});

export default router;
