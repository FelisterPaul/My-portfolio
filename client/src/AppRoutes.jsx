import { useAuth } from './context/AuthContext';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import WorkExperience from './routes/WorkExperience.jsx';
import Consultancy from './routes/Consultancy.jsx';
import CompletedProjects from './routes/CompletedProjects.jsx';
import OngoingProjects from './routes/OngoingProjects.jsx';
import Projects from './routes/Projects.jsx';
import AdminProjects from './routes/AdminProjects.jsx';

function AppRoutes() {
  const { isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      <main className="pt-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <Routes>
            {/* public routes */}
            <Route path="/" element={<WorkExperience />} />
            <Route path="/consultancy" element={<Consultancy />} />
            <Route path="/completed-projects" element={<CompletedProjects />} />
            <Route path="/ongoing-projects" element={<OngoingProjects />} />
            <Route path="/projects" element={<Projects />} />
            
            {/* admin-only routes */}
            {isAdmin && (
              <>
                <Route path="/admin/projects" element={<AdminProjects />} />
              </>
            )}
            
            {/* catch-all */}
            <Route path="*" element={<div className="text-center py-12">Page not found</div>} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AppRoutes;