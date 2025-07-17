import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function WorkExperience() {
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
    <div className="p-6">
      <h1 className="text-4xl font-extrabold mb-10 text-gray-800 dark:text-white text-center">
        Work Experience
      </h1>

      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-blue-500"></div>

        <div className="space-y-12">
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
                data-aos="fade-up"
              >
                <div className="w-full md:w-1/2 px-4">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition hover:shadow-xl">
                    <div className="flex items-center gap-4 mb-4">
                      {exp.logo && (
                        <img
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          className="w-12 h-12 object-contain rounded-md border border-gray-300 dark:border-gray-600"
                        />
                      )}
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{exp.role}</h2>
                        <h3 className="text-md font-medium text-blue-600">{exp.company}</h3>
                        <p className="text-sm text-gray-500">{exp.duration} · {exp.location}</p>
                      </div>
                    </div>

                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1">
                      {exp.summary.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900 shadow-md"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
