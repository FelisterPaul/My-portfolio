import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import WorkExperience from './routes/WorkExperience';
import Consultancy from './routes/Consultancy';
import CompletedProjects from './routes/CompletedProjects';
import OngoingProjects from './routes/OngoingProjects';
import Projects from './routes/Projects';
import { useAuth } from './context/AuthContext';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function AppRoutes() {
  const { user, loading } = useAuth();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      <main className="pt-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                user ? <WorkExperience /> : <Navigate to="/login" replace />
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
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}