import ProjectCard from '../components/ProjectCard.jsx';

const completedProjects = [
  {
    id: 1,
    title: "E-Commerce Checkout Testing",
    description: "Performed end-to-end testing on payment workflows and cart functionality.",
    status: "Completed",
  },
  {
    id: 2,
    title: "API Regression Suite",
    description: "Built automated regression tests for RESTful APIs using Postman and REST Assured.",
    status: "Completed",
  },
  {
    id: 3,
    title: "Mobile App QA Audit",
    description: "Led QA audit for Android/iOS app, focusing on usability and performance.",
    status: "Completed",
  },
];

export default function CompletedProjects() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Completed QA Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {completedProjects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            status={project.status}
          />
        ))}
      </div>
    </div>
  );
}
