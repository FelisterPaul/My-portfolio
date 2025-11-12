import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  
  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-md z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
          Felister Paul
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center">
          <Link to="/ongoing-projects" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
            Ongoing Projects
          </Link>
          <Link to="/completed-projects" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
            Completed Projects
          </Link>
          <Link to="/consultancy" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
            Consultancy
          </Link>

          {/* Admin-only buttons */}
          {isAdmin && (
            <>
              <Link 
                to="/admin/projects" 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
              >
                ➕ Add/Remove Projects
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
