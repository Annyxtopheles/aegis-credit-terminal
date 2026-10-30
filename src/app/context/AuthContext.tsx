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
      role: 'normal_user', firm: 'Vanguard Space Systems', jobTitle: 'Orbital Dynamics Analyst', initials: 'SC',
      companyId: 'vanguard-leo', companyName: 'Vanguard LEO Shell-1'
    }
  },
  'fdo@vanguard.space': {
    password: 'Password123!',
    user: {
      id: '1', name: 'Sarah Chen', email: 'fdo@vanguard.space',
      role: 'normal_user', firm: 'Vanguard Space Systems', jobTitle: 'Orbital Dynamics Analyst', initials: 'SC',
      companyId: 'vanguard-leo', companyName: 'Vanguard LEO Shell-1'
    }
  },
  'pm@firm.com': {
    password: 'Password123!',
    user: {
      id: '2', name: 'Michael Ross', email: 'pm@firm.com',
      role: 'normal_user', firm: 'Vanguard Space Systems', jobTitle: 'Telemetry Systems Engineer', initials: 'MR',
      companyId: 'vanguard-leo', companyName: 'Vanguard LEO Shell-1'
    }
  },
  'cfo@apexbrands.com': {
    password: 'Password123!',
    user: {
      id: '3', name: 'Cmdr. James Miller', email: 'cfo@apexbrands.com',
      role: 'company_admin', firm: 'Vanguard Space Systems', jobTitle: 'Constellation Flight Director', initials: 'JM',
      companyId: 'vanguard-leo', companyName: 'Vanguard LEO Shell-1'
    }
  },
  'lead@vanguard.space': {
    password: 'Password123!',
    user: {
      id: '3', name: 'Cmdr. James Miller', email: 'lead@vanguard.space',
      role: 'company_admin', firm: 'Vanguard Space Systems', jobTitle: 'Constellation Flight Director', initials: 'JM',
      companyId: 'vanguard-leo', companyName: 'Vanguard LEO Shell-1'
    }
  },
  'admin@aegisterminal.com': {
    password: 'Password123!',
    user: {
      id: '4', name: 'Dr. Alex Torres', email: 'admin@aegisterminal.com',
      role: 'super_admin', firm: 'KESSLER SSA COMMAND', jobTitle: 'Chief Orbital Safety Director', initials: 'AT',
      twoFactorEnabled: true
    }
  },
  'director@kessler.space': {
    password: 'Password123!',
    user: {
      id: '4', name: 'Dr. Alex Torres', email: 'director@kessler.space',
      role: 'super_admin', firm: 'KESSLER SSA COMMAND', jobTitle: 'Chief Orbital Safety Director', initials: 'AT',
      twoFactorEnabled: true
    }
  },
  'trial@firm.com': {
    password: 'Password123!',
    user: {
      id: '5', name: 'Jordan Smith', email: 'trial@firm.com',
      role: 'normal_user', firm: 'Vanguard Space Systems', jobTitle: 'Conjunction Screening Officer', initials: 'JS',
      companyId: 'vanguard-leo', companyName: 'Vanguard LEO Shell-1'
    }
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(() => {
    const saved = sessionStorage.getItem('kessler-user') || sessionStorage.getItem('aegis-user');
    return saved ? JSON.parse(saved) : null;
  });
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const setUser = useCallback((u: User | null) => {
    setUserState(u);
    if (u) {
      sessionStorage.setItem('kessler-user', JSON.stringify(u));
    } else {
      sessionStorage.removeItem('kessler-user');
      sessionStorage.removeItem('aegis-user');
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<LoginResult> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setIsLoading(false);

    if (loginAttempts >= 5) {
      return { success: false, error: 'Too many authentication attempts. Lockout active for 15 minutes.' };
    }

    const entry = MOCK_USERS[email.toLowerCase()];
    if (!entry || entry.password !== password) {
      setLoginAttempts(p => p + 1);
      return { success: false, error: 'Invalid operator callsign/email or security key.' };
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

    if (code !== '123456') return { success: false, error: 'Invalid cryptographic token.' };
    if (!pendingEmail) return { success: false, error: 'Telemetry session expired. Please re-authenticate.' };

    const entry = MOCK_USERS[pendingEmail];
    if (!entry) return { success: false, error: 'Operator record not found.' };

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
      firm: 'Vanguard Space Systems', jobTitle: data.jobTitle || 'Orbital Dynamics Analyst',
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
