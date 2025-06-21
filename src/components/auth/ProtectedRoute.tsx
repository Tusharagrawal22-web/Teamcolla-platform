import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { ReactNode } from 'react';

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser } = useAuth();

  // if (loading) {
  //   return <div className="text-center p-4">Loading...</div>; // ✅ Controlled loader
  // }

  if (!currentUser) {
    return <Navigate to="/" replace/>;
  }

  return children;
}
