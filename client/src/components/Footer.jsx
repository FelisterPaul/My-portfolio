import ThemeToggle from './ThemeToggle.jsx';

export default function Footer() {
  return (
    <footer className="mt-12 py-6 border-t border-gray-300 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
      <div className="flex flex-col items-center gap-2">
        <ThemeToggle />
        <p>© {new Date().getFullYear()} Felister Mwende Paul · QA Portfolio</p>
        <div className="flex gap-4">
          <a href="mailto:felisterpaul4@gmail.com" className="hover:underline">Email</a>
          <a href="https://www.linkedin.com/in/felister-paul/" target="_blank" className="hover:underline">LinkedIn</a>
          <a href="https://github.com/FelisterPaul" target="_blank" className="hover:underline">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
