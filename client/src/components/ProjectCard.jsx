export default function ProjectCard({ title, description, status }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
        status === 'Completed'
          ? 'bg-green-100 text-green-800'
          : status === 'Ongoing'
          ? 'bg-yellow-100 text-yellow-800'
          : 'bg-gray-100 text-gray-800'
      }`}>
        {status}
      </span>
    </div>
  );
}
