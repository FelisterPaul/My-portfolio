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

// 🔍 Get all projects (with optional status filter - now case-insensitive)
router.get('/', async (req, res) => {
  const { status } = req.query;
  try {
    const query = status
      ? { status: { $regex: `^${status}$`, $options: 'i' } } // ✅ Match 'Ongoing', 'ongoing', etc.
      : {};

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

// 🔍 Get all ongoing projects
router.get('/status/ongoing', async (req, res) => {
  try {
    const projects = await Project.find({ 
      status: { $regex: '^ongoing$', $options: 'i' } 
    }).sort({ dateStarted: -1 });
    res.json(projects);
  } catch (err) {
    console.error("❌ Error fetching ongoing projects:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🔍 Get all in-progress projects
router.get('/status/in-progress', async (req, res) => {
  try {
    const projects = await Project.find({ 
      status: { $regex: '^in-progress$', $options: 'i' } 
    }).sort({ dateStarted: -1 });
    res.json(projects);
  } catch (err) {
    console.error("❌ Error fetching in-progress projects:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Update project status
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  
  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id, 
      { status: status },
      { new: true, runValidators: true }
    );
    
    if (!updated) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating project status:", err);
    res.status(400).json({ error: err.message });
  }
});

// 📊 Get project statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await Project.aggregate([
      {
        $group: {
          _id: { $toLower: '$status' },
          count: { $sum: 1 },
          projects: { $push: '$$ROOT' }
        }
      }
    ]);
    
    res.json(stats);
  } catch (err) {
    console.error("❌ Error fetching project statistics:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
