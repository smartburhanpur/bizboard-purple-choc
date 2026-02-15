import { mockUsers, mockCredentials } from '@/data/mockData';
import type { User } from '@/types';

export interface LoginPayload {
  mobile: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

const delay = (ms = 500) => new Promise(r => setTimeout(r, ms));

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    await delay(800);
    const cred = mockCredentials[payload.mobile];
    if (!cred || cred.password !== payload.password) {
      throw { response: { data: { message: 'Invalid mobile or password' } } };
    }
    const user = mockUsers.find(u => u._id === cred.userId);
    if (!user) throw { response: { data: { message: 'User not found' } } };
    if (user.status === 'blocked') throw { response: { data: { message: 'Account is blocked' } } };
    return { token: `mock_jwt_token_${user._id}_${Date.now()}`, user };
  },

  getMe: async (): Promise<User> => {
    await delay(300);
    const stored = localStorage.getItem('smartburhanpur_user');
    if (stored) return JSON.parse(stored);
    throw new Error('Not authenticated');
  },
};
