import { NavLink } from 'react-router-dom';
import LogoutButton from './LogoutButton';

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white px-6 py-4 flex gap-6 shadow-md z-50">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? 'font-bold text-blue-400' : 'hover:text-blue-300'
        }
      >
        Work Experience
      </NavLink>
      <NavLink
        to="/consultancy"
        className={({ isActive }) =>
          isActive ? 'font-bold text-blue-400' : 'hover:text-blue-300'
        }
      >
        Consultancy
      </NavLink>
      <NavLink
        to="/completed-projects"
        className={({ isActive }) =>
          isActive ? 'font-bold text-blue-400' : 'hover:text-blue-300'
        }
      >
        Completed Projects
      </NavLink>
      <NavLink
        to="/ongoing-projects"
        className={({ isActive }) =>
          isActive ? 'font-bold text-blue-400' : 'hover:text-blue-300'
        }
      >
        Ongoing Projects
      </NavLink>
      <LogoutButton />
    </nav>
  );
}
