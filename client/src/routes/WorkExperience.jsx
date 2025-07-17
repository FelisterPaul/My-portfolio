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
    // Add more roles as needed...
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Work Experience</h1>

      <div className="relative border-l-2 border-blue-500 pl-6 space-y-10">
        {experiences.map((exp, index) => (
          <div key={index} className="relative" data-aos="fade-up">
            <div className="absolute -left-3 top-1 w-6 h-6 bg-blue-500 rounded-full border-4 border-white dark:border-gray-800"></div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4 mb-2">
                {exp.logo && (
                  <img src={exp.logo} alt={`${exp.company} logo`} className="w-10 h-10 object-contain" />
                )}
                <div>
                  <h2 className="text-xl font-semibold">{exp.role}</h2>
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
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
