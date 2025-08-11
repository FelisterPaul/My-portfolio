import { useState, useEffect, useCallback } from 'react';
import projectService from '../services/projectService';

export const useProjects = (status) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = status 
        ? await projectService.getProjectsByStatus(status)
        : await projectService.getAllProjects();
      setProjects(data || []);
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

  return { 
    projects, 
    loading, 
    error,
    mutate: fetchProjects,
    clearError: () => setError(null)
  };
};
