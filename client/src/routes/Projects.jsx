import { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { PencilSquareIcon as PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function Projects() {
  const { projects, loading, error, mutate } = useProjects();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (loading) {
    return <div className="p-4 text-center">Loading projects...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map(project => (
          <div 
            key={project._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {project.status}
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                  title="Edit project"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this project?')) {
                      // Add delete functionality here
                    }
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  title="Delete project"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {project.techStack?.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}