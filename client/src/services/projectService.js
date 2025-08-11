import axios from 'axios';
import { PROJECT_API } from '../config/api';

const handleError = (error) => {
  const message = error.response?.data?.error || error.message || 'An error occurred';
  throw new Error(message);
};

const projectService = {
  getAllProjects: async () => {
    try {
      const response = await axios.get(PROJECT_API);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  getProjectsByStatus: async (status) => {
    try {
      const response = await axios.get(`${PROJECT_API}/status/${status}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
};

export default projectService;