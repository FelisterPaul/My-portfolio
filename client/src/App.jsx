
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import WorkExperience from './routes/WorkExperience.jsx';
import Consultancy from './routes/Consultancy.jsx';
import CompletedProjects from './routes/CompletedProjects.jsx';
import OngoingProjects from './routes/OngoingProjects.jsx';
import Projects from './routes/Projects.jsx';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      AOS.init({
        duration: 800,
        once: true,
      });
    } catch (error) {
      console.error('AOS initialization failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <NavBar />
        <main className="pt-24 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<WorkExperience />} />
              <Route path="/consultancy" element={<Consultancy />} />
              <Route path="/completed-projects" element={<CompletedProjects />} />
              <Route path="/ongoing-projects" element={<OngoingProjects />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;