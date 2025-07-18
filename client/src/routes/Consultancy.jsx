export default function Consultancy() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Consultancy Experience</h1>

      <p className="mb-6 text-gray-700 dark:text-gray-300">
        During my consultancy engagement with <a href="https://askaritechnologies.com" target="_blank" className="text-blue-500 underline">Askari Technologies</a>, I contributed to a range of quality assurance initiatives that supported their mission of delivering secure, scalable, and high-performance digital solutions.
      </p>

      <ul className="list-disc list-inside space-y-4 text-gray-700 dark:text-gray-300">
        <li>
          <strong>Performance Testing:</strong> I designed and executed performance test scenarios to evaluate how their APIs and web applications handled high traffic loads. This included stress testing, spike testing, and endurance testing using tools like JMeter and k6.
        </li>
        <li>
          <strong>API Testing:</strong> I validated the functionality, reliability, and security of RESTful APIs using Postman and REST Assured. My focus was on ensuring consistent response formats, proper error handling, and authentication flows.
        </li>
        <li>
          <strong>Regression Testing:</strong> I implemented manual regression cycles to ensure that new updates didn’t break existing functionality. This was especially critical during frequent deployments and feature rollouts.
        </li>
        <li>
          <strong>Manual Testing:</strong> I conducted exploratory and scenario-based manual testing across multiple modules, including user onboarding, payment workflows, and admin dashboards. I documented bugs and collaborated closely with developers to resolve issues.
        </li>
      </ul>

      <p className="mt-6 text-gray-700 dark:text-gray-300">
        My work helped improve system stability, reduce post-release defects, and enhance the overall user experience for Askari Technologies’ clients. It was a rewarding opportunity to apply my QA expertise in a fast-paced, innovation-driven environment.
      </p>

      {/* Testimonial Section */}
      <h2 className="text-2xl font-bold mt-12 mb-4">Client Feedback</h2>
      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md shadow-sm max-w-xl">
        <p className="italic text-gray-800 dark:text-gray-200">
          “Felister brought clarity and structure to our QA process. Her attention to detail and ability to catch edge-case bugs saved us countless hours post-deployment. We highly recommend her for any team looking to elevate their testing standards.”
        </p>
        <p className="mt-2 font-semibold text-gray-600 dark:text-gray-300">— Askari Technologies Team</p>
      </div>

      {/* Contact Form */}
      <h2 className="text-2xl font-bold mt-12 mb-4">Get in Touch</h2>
      <form className="space-y-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
          <textarea
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tell me about your QA needs..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
