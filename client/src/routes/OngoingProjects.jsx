import { useState } from 'react';
import useProjects from '../hooks/useProjects';
import ProjectForm from '../components/ProjectForm';

export default function OngoingProjects() {
  const { projects, loading, error, deleteProject, addProject, refetch } = useProjects('ongoing');
  const [isAdding, setIsAdding] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
      refetch();
    }
  };

  const handleAdd = async (projectData) => {
    await addProject(projectData);
    setIsAdding(false);
    refetch();
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Ongoing Projects</h1>
        <button onClick={() => setIsAdding(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Project
        </button>
      </div>

      {isAdding && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <ProjectForm onSubmit={handleAdd} onCancel={() => setIsAdding(false)} />
          </div>
        </div>
      )}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map(project => (
          <div 
            key={project._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
            <button onClick={() => handleDelete(project._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
