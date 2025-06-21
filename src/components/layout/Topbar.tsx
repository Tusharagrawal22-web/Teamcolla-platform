// src/components/Topbar.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Topbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">TeamColla</h1>
      <nav className="flex items-center gap-6">
        <Link to="/dashboard/projects" className="text-sm text-blue-600 hover:underline">Projects</Link>
        <Link to="/dashboard/tasks" className="text-sm text-blue-600 hover:underline">Tasks</Link>
        <Link to="/dashboard/team" className="text-sm text-blue-600 hover:underline">Team</Link>
        <Link to="/dashboard/chat" className="text-sm text-blue-600 hover:underline">Chat</Link>
        <button
          onClick={handleLogout}
          className="bg-black text-white px-3 py-1 rounded text-sm hover:bg-gray-800"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
