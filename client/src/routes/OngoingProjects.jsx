import { useState, useEffect } from 'react';
import useProjects from '../hooks/useProjects';
import ProjectForm from '../components/ProjectForm';
import { useAuth } from '../context/AuthContext';


export default function OngoingProjects() {
  const { projects, loading, error, deleteProject, addProject, refetch } = useProjects('ongoing');
  const [isAdding, setIsAdding] = useState(false);
  const { user } = useAuth();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        refetch();
      } catch (err) {
        console.error("Error deleting project:", err);
      }
    }
  };

  const handleAdd = async (projectData) => {
    try {
      await addProject(projectData);
      setIsAdding(false);
      refetch();
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    // render readable message and avoid throwing if error is an object
    const message = typeof error === 'string' ? error : (error?.message || JSON.stringify(error));
    return <div className="flex items-center justify-center min-h-screen">Error: {message}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Ongoing Projects</h1>
        {user?.role === 'admin' && (
          <button onClick={() => setIsAdding(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Project
          </button>
        )}
      </div>

      {isAdding && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full">
            <ProjectForm onSubmit={handleAdd} onCancel={() => setIsAdding(false)} />
          </div>
        </div>
      )}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {(projects || []).length === 0 && (
          <div className="col-span-full text-center text-gray-600 dark:text-gray-300">No projects found.</div>
        )}

        {(projects || []).map((project, idx) => (
          <div 
            key={project?._id || project?.id || idx}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-semibold mb-2">{project?.title || 'Untitled project'}</h2>
            <p className="text-gray-600 dark:text-gray-300">{project?.description || ''}</p>
            {user?.role === 'admin' && (
              <button onClick={() => handleDelete(project._id || project.id)} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
