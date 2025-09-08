import { useAuth } from '../context/AuthContext';

export default function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
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