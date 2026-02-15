import apiClient from '@/lib/apiClient';
import type { User, ApiResponse } from '@/types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await apiClient.post<ApiResponse<LoginResponse>>('/auth/login-with-password', payload);
    return data.data;
  },

  getMe: async (): Promise<User> => {
    const { data } = await apiClient.get<ApiResponse<User>>('/auth/me');
    return data.data;
  },
};
