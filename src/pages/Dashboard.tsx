// src/pages/Dashboard.tsx

import DashboardLayout from '../components/layout/DashboardLayout';
import { Outlet } from 'react-router-dom';

/**
 * This component wraps the authenticated dashboard layout
 * and renders child pages like Projects, Tasks, Team, Chat, etc.
 */
export default function Dashboard() {
  return (
    <DashboardLayout>
      {/* Renders nested routes like /dashboard/projects, /dashboard/tasks etc. */}
      <Outlet />
    </DashboardLayout>
  );
}
