import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export type UserRole = 'super_admin' | 'company_admin' | 'normal_user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  firm: string;
  jobTitle: string;
  initials: string;
  twoFactorEnabled?: boolean;
  companyId?: string;
  companyName?: string;
  isNewUser?: boolean;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  jobTitle?: string;
  phone?: string;
}

type LoginResult = { success: boolean; requires2FA?: boolean; error?: string };
type AuthResult = { success: boolean; error?: string };

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  pendingEmail: string | null;
  isLoading: boolean;
  loginAttempts: number;
  login: (email: string, password: string) => Promise<LoginResult>;
  verify2FA: (code: string) => Promise<AuthResult>;
  logout: () => void;
  signup: (data: SignupData) => Promise<AuthResult>;
  setUser: (user: User | null) => void;
  dismissOnboarding: () => void;
}

const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'analyst@firm.com': {
    password: 'Password123!',
    user: {
      id: '1', name: 'Sarah Chen', email: 'analyst@firm.com',
      role: 'normal_user', firm: 'Apex Brands Group', jobTitle: 'Financial Analyst', initials: 'SC',
      companyId: 'apexbrands', companyName: 'Apex Brands Group'
    }
  },
  'pm@firm.com': {
    password: 'Password123!',
    user: {
      id: '2', name: 'Michael Ross', email: 'pm@firm.com',
      role: 'normal_user', firm: 'Apex Brands Group', jobTitle: 'IR Manager', initials: 'MR',
      companyId: 'apexbrands', companyName: 'Apex Brands Group'
    }
  },
  'cfo@apexbrands.com': {
    password: 'Password123!',
    user: {
      id: '3', name: 'James Miller', email: 'cfo@apexbrands.com',
      role: 'company_admin', firm: 'Apex Brands Group', jobTitle: 'Chief Financial Officer', initials: 'JM',
      companyId: 'apexbrands', companyName: 'Apex Brands Group'
    }
  },
  'admin@aegisterminal.com': {
    password: 'Password123!',
    user: {
      id: '4', name: 'Alex Torres', email: 'admin@aegisterminal.com',
      role: 'super_admin', firm: 'AEGIS', jobTitle: 'Platform Administrator', initials: 'AT',
      twoFactorEnabled: true
    }
  },
  'trial@firm.com': {
    password: 'Password123!',
    user: {
      id: '5', name: 'Jordan Smith', email: 'trial@firm.com',
      role: 'normal_user', firm: 'Apex Brands Group', jobTitle: 'Analyst', initials: 'JS',
      companyId: 'apexbrands', companyName: 'Apex Brands Group'
    }
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(() => {
    const saved = sessionStorage.getItem('aegis-user');
    return saved ? JSON.parse(saved) : null;
  });
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const setUser = useCallback((u: User | null) => {
    setUserState(u);
    if (u) sessionStorage.setItem('aegis-user', JSON.stringify(u));
    else sessionStorage.removeItem('aegis-user');
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<LoginResult> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setIsLoading(false);

    if (loginAttempts >= 5) {
      return { success: false, error: 'Too many attempts. Try again in 15 minutes.' };
    }

    const entry = MOCK_USERS[email.toLowerCase()];
    if (!entry || entry.password !== password) {
      setLoginAttempts(p => p + 1);
      return { success: false, error: 'Invalid email or password.' };
    }

    setLoginAttempts(0);

    if (entry.user.twoFactorEnabled) {
      setPendingEmail(email.toLowerCase());
      return { success: true, requires2FA: true };
    }

    setUser(entry.user);
    return { success: true };
  }, [loginAttempts, setUser]);

  const verify2FA = useCallback(async (code: string): Promise<AuthResult> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setIsLoading(false);

    if (code !== '123456') return { success: false, error: 'Invalid verification code.' };
    if (!pendingEmail) return { success: false, error: 'Session expired. Please log in again.' };

    const entry = MOCK_USERS[pendingEmail];
    if (!entry) return { success: false, error: 'User not found.' };

    setUser(entry.user);
    setPendingEmail(null);
    return { success: true };
  }, [pendingEmail, setUser]);

  const logout = useCallback(() => {
    setUser(null);
    setPendingEmail(null);
  }, [setUser]);

  const signup = useCallback(async (data: SignupData): Promise<AuthResult> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsLoading(false);

    const nameParts = data.name.trim().split(' ');
    const initials = nameParts.length >= 2
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
      : data.name.slice(0, 2).toUpperCase();

    const newUser: User = {
      id: Math.random().toString(36).slice(2),
      name: data.name, email: data.email, role: 'normal_user',
      firm: 'New Organization', jobTitle: data.jobTitle || 'Analyst',
      initials, isNewUser: true
    };

    setUser(newUser);
    return { success: true };
  }, [setUser]);

  const dismissOnboarding = useCallback(() => {
    if (user) {
      const updated = { ...user, isNewUser: false };
      setUser(updated);
    }
  }, [user, setUser]);

  return (
    <AuthContext.Provider value={{
      user, isAuthenticated: !!user, pendingEmail, isLoading, loginAttempts,
      login, verify2FA, logout, signup, setUser, dismissOnboarding
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function getDashboardPath(role: UserRole): string {
  switch (role) {
    case 'super_admin': return '/admin';
    case 'company_admin': return '/dashboard';
    case 'normal_user': return '/dashboard';
    default: return '/dashboard';
  }
}
