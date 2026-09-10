import { createHashRouter, Navigate } from 'react-router';
import { ReactNode } from 'react';
import { SidebarProvider } from './context/SidebarContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute';
import { DashboardLayout } from './components/DashboardLayout';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import TwoFactorPage from './pages/TwoFactorPage';
import SignUpPage from './pages/SignUpPage';
import OverviewPage from './pages/OverviewPage';
import CapitalStructurePage from './pages/CapitalStructurePage';
import CovenantCompliancePage from './pages/CovenantCompliancePage';
import PerformanceAnalysisPage from './pages/PerformanceAnalysisPage';
import SectorNewsPage from './pages/SectorNewsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import UserManagementPage from './pages/UserManagementPage';
import SettingsPage from './pages/SettingsPage';

function DashboardWrapper({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </SidebarProvider>
  );
}

export const router = createHashRouter([
  // ── Public / Auth Routes (redirect away if already authenticated) ──
  {
    path: '/login',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <PublicRoute>
        <ForgotPasswordPage />
      </PublicRoute>
    ),
  },
  {
    path: '/reset-password',
    element: (
      <PublicRoute>
        <ResetPasswordPage />
      </PublicRoute>
    ),
  },
  {
    path: '/signup',
    element: (
      <PublicRoute>
        <SignUpPage />
      </PublicRoute>
    ),
  },
  // 2FA is part of the auth flow — allow access even if pendingEmail exists
  // (TwoFactorPage already guards itself by checking pendingEmail → redirects to /login)
  {
    path: '/2fa',
    element: <TwoFactorPage />,
  },

  // ── Protected Dashboard Routes ──
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['super_admin', 'company_admin', 'normal_user']}>
        <DashboardWrapper>
          <OverviewPage />
        </DashboardWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/capital-structure',
    element: (
      <ProtectedRoute allowedRoles={['super_admin', 'company_admin', 'normal_user']}>
        <DashboardWrapper>
          <CapitalStructurePage />
        </DashboardWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/covenant-compliance',
    element: (
      <ProtectedRoute allowedRoles={['super_admin', 'company_admin', 'normal_user']}>
        <DashboardWrapper>
          <CovenantCompliancePage />
        </DashboardWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/priorities-events',
    element: (
      <ProtectedRoute allowedRoles={['super_admin', 'company_admin', 'normal_user']}>
        <DashboardWrapper>
          <PerformanceAnalysisPage />
        </DashboardWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/sector-news',
    element: (
      <ProtectedRoute allowedRoles={['super_admin', 'company_admin', 'normal_user']}>
        <DashboardWrapper>
          <SectorNewsPage />
        </DashboardWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/user-management',
    element: (
      <ProtectedRoute allowedRoles={['super_admin', 'company_admin']}>
        <DashboardWrapper>
          <UserManagementPage />
        </DashboardWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['super_admin']}>
        <DashboardWrapper>
          <AdminDashboardPage />
        </DashboardWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <DashboardWrapper>
          <SettingsPage />
        </DashboardWrapper>
      </ProtectedRoute>
    ),
  },

  // ── Friendly Redirects & Aliases ──
  {
    path: '/company-admin',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/dashboard/users',
    element: <Navigate to="/dashboard/user-management" replace />,
  },
  {
    path: '/admin/user-management',
    element: <Navigate to="/dashboard/user-management" replace />,
  },
  {
    path: '/admin/users',
    element: <Navigate to="/admin?tab=users" replace />,
  },
  {
    path: '/invite',
    element: <Navigate to="/signup" replace />,
  },

  // ── Catch-all redirects ──
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);
