import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Change from named export to default export
export default function useProjects(status) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://localhost:5000/api/projects${status ? `/status/${status}` : ''}`);
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

  return { 
    projects, 
    loading, 
    error,
    mutate: fetchProjects,
    clearError: () => setError(null)
  };
}
