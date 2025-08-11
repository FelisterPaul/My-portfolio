import { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import projectService from '../services/projectService';
import ProjectForm from '../components/ProjectForm';

export default function Projects() {
  const { projects, loading, error, mutate } = useProjects();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreate = async (projectData) => {
    try {
      await projectService.createProject(projectData);
      mutate(); // Refresh projects list
      setIsFormOpen(false);
    } catch (err) {
      console.error('Error creating project:', err);
    }
  };

  const handleUpdate = async (projectData) => {
    try {
      await projectService.updateProject(selectedProject._id, projectData);
      mutate();
      setSelectedProject(null);
    } catch (err) {
      console.error('Error updating project:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.deleteProject(id);
        mutate();
      } catch (err) {
        console.error('Error deleting project:', err);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Project
        </button>
      </div>

      {(isFormOpen || selectedProject) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">
              {selectedProject ? 'Edit' : 'New'} Project
            </h2>
            <ProjectForm
              project={selectedProject}
              onSubmit={selectedProject ? handleUpdate : handleCreate}
              onCancel={() => {
                setSelectedProject(null);
                setIsFormOpen(false);
              }}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project._id} className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="text-gray-600">{project.description}</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setSelectedProject(project)}
                className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="px-3 py-1 text-red-600 hover:bg-red-50 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}