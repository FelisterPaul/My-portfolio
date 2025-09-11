import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Login from '../components/Login';
import axios from 'axios';

export default function WorkExperience() {
  const { user } = useAuth();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/work-experience'); // Replace with your actual API endpoint
        setExperiences(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (!user) {
    return <Login />;
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen">Error: {error}</div>;
  }

  return (
    <div className="px-4 md:px-6 lg:px-8 py-12 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Login UI always at the top */}
      {!user && (
        <div className="mb-8">
          <Login />
        </div>
      )}

      {/* Work experience content always visible */}
      <section>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-gray-800 dark:text-white">
          Work Experience
        </h1>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                className="group relative"
              >
                <ExperienceCard exp={exp} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ExperienceCard({ exp }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-2">{exp.title}</h2>
      <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
    </div>
  );
}
