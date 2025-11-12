import React, { useEffect, useState } from 'react';
import axios from 'axios';

const defaultExperiences = [
	{
		title: 'Software Quality Assurance Team Lead — Solutech Limited',
		period: 'Jan 2024 – May 2025 · Kenya',
		bullets: [
		 'Led and managed test activities (planning, execution, reporting) across 5+ projects.',
		 'Identified and resolved 95%+ of critical defects prior to production.',
		 'Introduced lifecycle/testing tools, improving test efficiency by ~15%.',
		 'Created/updated test plans for 15+ projects to align with timelines.',
		 'Designed tools/processes that reduced test cycle time by ~20%.'
		]
	},
	{
		title: 'Software Quality Assurance Engineer — Solutech Limited',
		period: 'Jan 2023 – May 2025 · Nairobi County, Kenya',
		bullets: [
		 'Monitored scope changes and mitigated risks (10% reduction in delays).',
		 'Coordinated test environments to achieve ~99% availability.',
		 'Managed UAT and ensured successful sign-offs.',
		 'Prioritized defects, reducing backlog by ~30% in the first quarter.',
		 'Provided accurate time estimates, supporting on-time delivery in ~95% of projects.'
		]
	},
	{
		title: 'Project Lead — Techno Brain Group',
		period: 'Aug 2022 – Jan 2023 · Kenya',
		bullets: [
		 'Led 5+ engineers validating Unity applications for HoloLens (1 & 2) and VR headsets.',
		 'Reviewed requirements to ensure 100% alignment with objectives.',
		 'Created/executed 200+ test cases covering ~95% of requirements.',
		 'Improved defect detection rates by ~20% through manual testing guidance.',
		 'Managed and prioritized 150+ bug reports to resolution.'
		]
	},
	{
		title: 'Software Testing Engineer — Techno Brain Group',
		period: 'Feb 2020 – Jan 2023 · Kenya',
		bullets: [
		 'Designed 100+ test scenarios and set up test environments.',
		 'Improved requirements testability and reduced ambiguities by ~15%.',
		 'Achieved ~95% coverage across functional and non-functional tests.',
		 'Reported/tracked 200+ defects to closure, identifying 90%+ of critical issues early.'
		]
	},
	{
		title: 'ICT Help Desk Officer Intern — ICT Authority (PDTP Intern)',
		period: 'Jul 2019 – Feb 2020 · Nairobi, Kenya',
		bullets: [
		 'Installed/configured hardware and software; troubleshot system and network issues.',
		 'Monitored and maintained computer systems to ensure smooth operations.'
		]
	}
];

export default function WorkExperience() {
  const [experiences, setExperiences] = useState(defaultExperiences);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/work-experience');
        if (!mounted) return;
        if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
          setExperiences(response.data);
        } else {
          setExperiences(defaultExperiences);
        }
      } catch (err) {
        console.warn('WorkExperience: failed to fetch remote experiences:', err?.message || err);
        setExperiences(defaultExperiences);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchExperiences();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="px-4 md:px-6 lg:px-8 py-12 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <section>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-gray-800 dark:text-white">
          Work Experience
        </h1>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp, index) => (
              <div key={exp.id || exp.title || index} data-aos="zoom-in" data-aos-delay={index * 100} className="group relative">
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
      <h2 className="text-xl font-semibold mb-1">{exp.title}</h2>
      {exp.period && <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{exp.period}</p>}
      {exp.description && <p className="text-gray-600 dark:text-gray-300 mb-3">{exp.description}</p>}
      {exp.bullets && (
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
          {exp.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
