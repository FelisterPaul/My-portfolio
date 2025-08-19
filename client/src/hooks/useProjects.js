import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/projects';

export default function useProjects(status = null) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const url = status 
        ? `${API_URL}/status/${status}`
        : API_URL;

      const response = await axios.get(url);
      
      if (!response.data) {
        throw new Error('No data received from server');
      }

      setProjects(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      setError(err.response?.data?.message || err.message);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const deleteProject = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchProjects(); // Refresh projects after deletion
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return false;
    }
  };

  const addProject = async (projectData) => {
    try {
      await axios.post(API_URL, projectData);
      await fetchProjects(); // Refresh projects after adding
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return false;
    }
  };

  const updateProject = async (id, projectData) => {
    try {
      await axios.put(`${API_URL}/${id}`, projectData);
      await fetchProjects(); // Refresh projects after updating
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return false;
    }
  };

  return { 
    projects, 
    loading, 
    error,
    mutate: fetchProjects,
    clearError: () => setError(null),
    deleteProject,
    addProject,
    updateProject
  };
}
