import { useState, useEffect } from 'react';
import axios from 'axios';

export default function OngoingProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/projects/status/ongoing');
        setProjects(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
            <div
              key={project._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && filteredProjects.length === 0 && (
        <p className="text-gray-500">No ongoing projects match your search or are available right now.</p>
      )}
    </div>
  );
}
