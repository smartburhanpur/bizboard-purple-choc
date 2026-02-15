import { mockUsers, mockCredentials } from '@/data/mockData';
import type { User } from '@/types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// Simulate network delay
const delay = (ms = 500) => new Promise(r => setTimeout(r, ms));

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    await delay(800);
    const cred = mockCredentials[payload.email];
    if (!cred || cred.password !== payload.password) {
      throw { response: { data: { message: 'Invalid email or password' } } };
    }
    const user = mockUsers.find(u => u._id === cred.userId);
    if (!user) throw { response: { data: { message: 'User not found' } } };
    return { token: `mock_jwt_token_${user._id}_${Date.now()}`, user };
  },

  getMe: async (): Promise<User> => {
    await delay(300);
    const stored = localStorage.getItem('nearmeb2b_user');
    if (stored) return JSON.parse(stored);
    throw new Error('Not authenticated');
  },
};
