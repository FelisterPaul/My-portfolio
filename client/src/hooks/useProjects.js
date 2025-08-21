import { useState, useEffect, useCallback } from 'react';
import api from '../config/api';

export default function useProjects(status = null) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const url = status ? `/projects/status/${status}` : '/projects';
      const response = await api.get(url);
      setProjects(response.data || []);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      setError(err.message);
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
      setLoading(true);
      setError(null);
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter(project => project._id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (projectData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/projects', projectData);
      setProjects([...projects, response.data]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { 
    projects, 
    loading, 
    error,
    deleteProject,
    addProject,
    refetch: fetchProjects
  };
}
