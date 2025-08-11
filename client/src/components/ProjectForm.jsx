import { useState } from 'react';

export default function ProjectForm({ project, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    techStack: project?.techStack?.join(', ') || '',
    status: project?.status || 'ongoing',
    category: project?.category || 'web',
    priority: project?.priority || 3,
    dateStarted: project?.dateStarted?.split('T')[0] || new Date().toISOString().split('T')[0],
    highlights: project?.highlights?.join('\n') || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      techStack: formData.techStack.split(',').map(tech => tech.trim()),
      highlights: formData.highlights.split('\n').filter(h => h.trim())
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      {/* Add other form fields similarly */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          {project ? 'Update' : 'Create'} Project
        </button>
      </div>
    </form>
  );
}