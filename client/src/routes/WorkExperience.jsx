import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Login from '../components/Login';
import { useAuth } from '../context/AuthContext';

export default function WorkExperience() {
  const { user } = useAuth();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const experiences = [
    {
      company: "Solutech Limited",
      role: "Software Quality Assurance Team Lead",
      duration: "Jan 2024 – May 2025 · 1 yr 5 mos",
      location: "Kenya",
      logo: "/logos/solutech.png",
      summary: [
        "Led and managed test activities across 5+ projects.",
        "Resolved 95%+ of critical defects before production release.",
        "Improved test efficiency by 15%.",
        "Created and updated test plans for 15+ projects.",
        "Developed tools that reduced test cycle times by 20%."
      ],
      skills: ["Agile Methodologies", "Leadership", "Test Planning", "Defect Management"]
    },
    {
      company: "Techno Brain Group",
      role: "Project Lead",
      duration: "Aug 2022 – Jan 2023 · 6 mos",
      location: "Kenya",
      logo: "/logos/techno-brain.png",
      summary: [
        "Led validation of Unity apps for HoloLens and VR.",
        "Ensured 100% alignment with customer requirements.",
        "Executed 200+ test cases with 95% coverage.",
        "Improved defect detection by 20%.",
        "Reduced response times by 30%."
      ],
      skills: ["Unity QA", "VR Testing", "Agile Project Management"]
    },
    {
      company: "ICT Authority",
      role: "ICT Help Desk Officer Intern",
      duration: "Jul 2019 – Feb 2020 · 8 mos",
      location: "Nairobi, Kenya",
      logo: "/logos/ict-authority.png",
      summary: [
        "Installed and configured hardware and applications.",
        "Troubleshot system and network issues.",
        "Monitored and maintained computer systems.",
        "Managed user accounts and password issues."
      ],
      skills: ["IT Support", "Troubleshooting", "System Maintenance"]
    }
  ];

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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300 h-full border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Logo Section */}
      <div className="absolute -right-3 -top-3 w-24 h-24 overflow-hidden">
        <div className="absolute transform rotate-45 bg-blue-600 text-white shadow-lg w-[120%] text-center" style={{ top: '32px', right: '-32px' }}>
          <img 
            src={exp.logo} 
            alt={`${exp.company} logo`}
            className="w-8 h-8 mx-auto my-1 object-contain"
          />
        </div>
      </div>

      {/* Header Section */}
      <div className="relative p-6 pb-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {exp.role}
            </h2>
            <h3 className="text-base font-medium text-blue-600 dark:text-blue-400">
              {exp.company}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {exp.duration} · {exp.location}
            </p>
          </div>
        </div>
      </div>

      {/* Summary & Skills */}
      <div className="p-6">
        <ul className="space-y-2 mb-4 text-gray-600 dark:text-gray-300">
          {exp.summary.map((point, i) => (
            <li key={i} className="flex items-start">
              <span className="mr-2 text-blue-500">•</span>
              <span className="text-sm">{point}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
          {exp.skills.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
