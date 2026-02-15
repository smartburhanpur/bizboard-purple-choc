import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Demo users for testing
const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'superadmin@nearmeb2b.city': {
    password: 'admin123',
    user: {
      id: '1',
      name: 'Rajesh Kumar',
      email: 'superadmin@nearmeb2b.city',
      phone: '+91 98765 43210',
      role: 'super_admin',
      status: 'active',
      createdAt: '2024-01-01',
    },
  },
  'admin@nearmeb2b.city': {
    password: 'admin123',
    user: {
      id: '2',
      name: 'Priya Sharma',
      email: 'admin@nearmeb2b.city',
      phone: '+91 98765 43211',
      role: 'admin',
      status: 'active',
      createdAt: '2024-02-01',
    },
  },
  'salesman@nearmeb2b.city': {
    password: 'admin123',
    user: {
      id: '3',
      name: 'Amit Patel',
      email: 'salesman@nearmeb2b.city',
      phone: '+91 98765 43212',
      role: 'salesman',
      status: 'active',
      createdAt: '2024-03-01',
    },
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('nearmeb2b_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('nearmeb2b_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    const entry = DEMO_USERS[email.toLowerCase()];
    if (!entry || entry.password !== password) {
      throw new Error('Invalid email or password');
    }
    if (entry.user.status === 'blocked') {
      throw new Error('Your account has been blocked');
    }
    setUser(entry.user);
    localStorage.setItem('nearmeb2b_user', JSON.stringify(entry.user));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
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
  }
}

export function getRoleLabel(role: UserRole): string {
  switch (role) {
    case 'super_admin': return 'Super Admin';
    case 'admin': return 'Admin';
    case 'salesman': return 'Salesman';
  }
}
