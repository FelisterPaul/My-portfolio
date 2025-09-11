import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  );
}