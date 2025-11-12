import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProjectForm from '../components/ProjectForm';

export default function AdminProjects() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [ongoingProjects, setOngoingProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [addingTo, setAddingTo] = useState('ongoing'); // 'ongoing' or 'completed'

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchProjects();
  }, [isAdmin, navigate]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const [ongoingRes, completedRes] = await Promise.all([
        axios.get('/api/projects?status=ongoing'),
        axios.get('/api/projects?status=completed')
      ]);
      setOngoingProjects(ongoingRes.data || []);
      setCompletedProjects(completedRes.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err?.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (projectData) => {
    try {
      await axios.post('/api/projects', 
        { ...projectData, status: addingTo },
        { headers: { 'x-admin-role': 'admin' } }
      );
      setIsAdding(false);
      fetchProjects();
    } catch (err) {
      console.error('Error adding project:', err);
      alert('Failed to add project: ' + (err?.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id, status) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await axios.delete(`/api/projects/${id}`, 
        { headers: { 'x-admin-role': 'admin' } }
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

  if (!isAdmin) {
    return <div className="text-center py-12 text-red-600">Access denied. Admin only.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Admin: Manage Projects</h1>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">{error}</div>}

      {isAdding && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Add {addingTo === 'ongoing' ? 'Ongoing' : 'Completed'} Project</h2>
            <ProjectForm onSubmit={handleAdd} onCancel={() => setIsAdding(false)} />
          </div>
        </div>
      )}

      {/* Ongoing Projects */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Ongoing Projects</h2>
          <button 
            onClick={() => { setAddingTo('ongoing'); setIsAdding(true); }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            + Add Ongoing Project
          </button>
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {ongoingProjects.length === 0 && (
            <div className="col-span-full text-center text-gray-600 dark:text-gray-300">No ongoing projects.</div>
          )}
          {ongoingProjects.map((project) => (
            <div key={project._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">{project.description}</p>
              {project.techStack && <p className="text-sm text-gray-500 mb-3">Tech: {project.techStack.join(', ')}</p>}
              <button 
                onClick={() => handleDelete(project._id, 'ongoing')}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Completed Projects */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Completed Projects</h2>
          <button 
            onClick={() => { setAddingTo('completed'); setIsAdding(true); }}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            + Add Completed Project
          </button>
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {completedProjects.length === 0 && (
            <div className="col-span-full text-center text-gray-600 dark:text-gray-300">No completed projects.</div>
          )}
          {completedProjects.map((project) => (
            <div key={project._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">{project.description}</p>
              {project.techStack && <p className="text-sm text-gray-500 mb-3">Tech: {project.techStack.join(', ')}</p>}
              <button 
                onClick={() => handleDelete(project._id, 'completed')}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}