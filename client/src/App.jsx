import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import WorkExperience from './routes/WorkExperience.jsx';
import Consultancy from './routes/Consultancy.jsx';
import CompletedProjects from './routes/CompletedProjects.jsx';
import OngoingProjects from './routes/OngoingProjects.jsx';
import Projects from './routes/Projects.jsx';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const { user, loading } = useAuth();
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

  if (loading || isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <NavBar />
          <main className="pt-24 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    user ? (
                      <WorkExperience />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route path="/consultancy" element={<Consultancy />} />
                <Route path="/completed-projects" element={<CompletedProjects />} />
                <Route path="/ongoing-projects" element={<OngoingProjects />} />
                <Route path="/projects" element={<Projects />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;