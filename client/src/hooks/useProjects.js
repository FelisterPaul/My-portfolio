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
      await api.delete(`/projects/${id}`);
      await fetchProjects();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  return { 
    projects, 
    loading, 
    error,
    deleteProject,
    refetch: fetchProjects
  };
}
