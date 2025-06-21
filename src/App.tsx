import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import ProjectsPage from './pages/dashboard/ProjectsPage';
import TasksPage from './pages/dashboard/TasksPage';
import TeamPage from './pages/dashboard/TeamPage';
import ChatPage from './pages/dashboard/ChatPage';
import ProblemStatementPage from './pages/dashboard/ProblemStatementPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="problem-statement" element={<ProblemStatementPage />} />
      </Route>
    </Routes>
  );
}
