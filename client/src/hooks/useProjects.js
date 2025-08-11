import { useState, useEffect, useCallback } from 'react';
import projectService from '../services/projectService';

export const useProjects = (status) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const data = status 
        ? await projectService.getProjectsByStatus(status)
        : await projectService.getAllProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(err.message);
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
    mutate: fetchProjects // Add this to allow manual refetching
  };
};
