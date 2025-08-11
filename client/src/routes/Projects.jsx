import { useProjects } from '../hooks/useProjects';

export default function Projects() {
  const { projects, loading, error } = useProjects();

  if (loading) {
    return <div className="p-4">Loading projects...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map(project => (
            <div key={project._id} className="border p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}