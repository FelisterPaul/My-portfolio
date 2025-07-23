import { useState } from 'react';
import ProjectCard from '../components/ProjectCard.jsx';

const ongoingProjects = [
  {
    id: 1,
    title: "My QA Portfolio development",
    description: "A hands-on portfolio built with Vite + React and MongoDB to showcase my Quality Assurance journey. It features completed and ongoing projects, short-term consultancy roles, and tools I work with — including Cypress, Postman, and Playwright",
    status: "Ongoing",
  },
  {
    id: 2,
    title: "Performance Testing for Microservices",
    description: "Using JMeter and k6 to benchmark API performance under load.",
    status: "Ongoing",
  },
  {
    id: 3,
    title: "Security Audit for API Gateway",
    description: "Validating authentication flows and token handling for REST APIs.",
    status: "Ongoing",
  },
];

export default function OngoingProjects() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = ongoingProjects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              status={project.status}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No projects match your search.</p>
      )}
    </div>
  );
}
