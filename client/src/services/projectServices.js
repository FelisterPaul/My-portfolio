import axios from 'axios';

const API_URL = 'http://localhost:5000/api/projects';

const projectService = {
  // Get all projects
  getAllProjects: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // Get projects by status
  getProjectsByStatus: async (status) => {
    const response = await axios.get(`${API_URL}/status/${status}`);
    return response.data;
  },

  // Create new project
  createProject: async (projectData) => {
    const response = await axios.post(API_URL, projectData);
    return response.data;
  },

  // Update project
  updateProject: async (id, projectData) => {
    const response = await axios.put(`${API_URL}/${id}`, projectData);
    return response.data;
  },

  // Delete project
  deleteProject: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};

export default projectService;