import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ProjectForm from '../components/ProjectForm';

export default function CompletedProjects() {
  const { isAdmin } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/projects?status=completed');
      setProjects(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(typeof err === 'string' ? err : (err?.message || 'Failed to load projects'));
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (projectData) => {
    try {
      await axios.post('/api/projects', 
        { ...projectData, status: 'completed' },
        { headers: { 'x-admin-role': isAdmin ? 'admin' : '' } }
      );
      setIsAdding(false);
      fetchProjects();
    } catch (err) {
      console.error('Error adding project:', err);
      alert('Failed to add project');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await axios.delete(`/api/projects/${id}`, 
        { headers: { 'x-admin-role': isAdmin ? 'admin' : '' } }
      );
      fetchProjects();
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('Failed to delete project');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Completed Projects</h1>
        {isAdmin && (
          <button onClick={() => setIsAdding(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Project
          </button>
        )}
      </div>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">{error}</div>}

      {isAdding && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full">
            <ProjectForm onSubmit={handleAdd} onCancel={() => setIsAdding(false)} />
          </div>
        </div>
      )}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.length === 0 && (
          <div className="col-span-full text-center text-gray-600 dark:text-gray-300">No projects found.</div>
        )}

        {projects.map((project) => (
          <div key={project._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-3">{project.description}</p>
            {project.techStack && <p className="text-sm text-gray-500 mb-3">Tech: {project.techStack.join(', ')}</p>}
            {isAdmin && (
              <button onClick={() => handleDelete(project._id)} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
