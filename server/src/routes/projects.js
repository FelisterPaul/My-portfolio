import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// middleware: check if request has admin role (from query or header for now)
const isAdmin = (req, res, next) => {
  const role = req.headers["x-admin-role"] || req.query.adminRole;
  if (role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access required" });
  }
};

// GET /api/projects?status=ongoing|completed
router.get("/", async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) {
      filter.status = String(status).toLowerCase();
    }
    const projects = await Project.find(filter).sort({ dateStarted: -1 }).lean();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

// GET /api/projects/:id
router.get("/:id", async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).lean();
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    next(err);
  }
});

// POST /api/projects (admin only)
router.post("/", isAdmin, async (req, res, next) => {
  try {
    const { title, description, techStack, status } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "title and description required" });
    }
    const project = new Project({
      title,
      description,
      techStack: techStack || [],
      status: status || "ongoing",
    });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/projects/:id (admin only)
router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
