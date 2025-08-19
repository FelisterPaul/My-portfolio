import { useState } from 'react';
import useProjects from '../hooks/useProjects';

export default function OngoingProjects() {
  const { projects, loading, error } = useProjects('ongoing');

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Ongoing QA Projects</h1>

      <input
        type="text"
        placeholder="Search projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* 🟡 Loading state */}
      {loading && (
        <p className="text-blue-600 animate-pulse mb-4">Loading projects from database...</p>
      )}

      {/* 🔴 Error state */}
      {error && (
        <p className="text-red-500 mb-4">Oops! Failed to fetch data: {error}</p>
      )}

      {/* ✅ Success or Empty fallback */}
      {!loading && !error && filteredProjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project._id}
              title={project.title}
              description={project.description}
              status={project.status}
            />
          ))}
        </div>
      )}

      {!loading && !error && filteredProjects.length === 0 && (
        <p className="text-gray-500">No ongoing projects match your search or are available right now.</p>
      )}
    </div>
  );
}
