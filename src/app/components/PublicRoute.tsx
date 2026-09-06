import { Navigate } from 'react-router';
import { ReactNode } from 'react';
import { useAuth, getDashboardPath } from '../context/AuthContext';

interface PublicRouteProps {
  children: ReactNode;
}

/**
 * PublicRoute: Redirects already-authenticated users away from auth pages
 * (login, signup, forgot-password, etc.) to their role-appropriate dashboard.
 */
export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user) {
    return <Navigate to={getDashboardPath(user.role)} replace />;
  }

  return <>{children}</>;
}
