import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { User, UserRole } from '@/types';
import { authService } from '@/services/authService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('nearmeb2b_token');
    if (token) {
      authService.getMe()
        .then((u) => setUser(u))
        .catch(() => {
          localStorage.removeItem('nearmeb2b_token');
          localStorage.removeItem('nearmeb2b_user');
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { token, user: loggedInUser } = await authService.login({ email, password });
    localStorage.setItem('nearmeb2b_token', token);
    localStorage.setItem('nearmeb2b_user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('nearmeb2b_token');
    localStorage.removeItem('nearmeb2b_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function getRolePath(role: UserRole): string {
  switch (role) {
    case 'super_admin': return '/super-admin/dashboard';
    case 'admin': return '/admin/dashboard';
    case 'salesman': return '/salesman/dashboard';
    default: return '/login';
  }
}

export function getRoleLabel(role: UserRole): string {
  switch (role) {
    case 'super_admin': return 'Super Admin';
    case 'admin': return 'Admin';
    case 'salesman': return 'Salesman';
    case 'owner': return 'Owner';
    case 'user': return 'User';
  }
}
