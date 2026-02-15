import apiClient from '@/lib/apiClient';
import type { User, ApiResponse, PaginatedResponse, UserFilters, Subscription } from '@/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const BASE = '/users';

export const userService = {
  getAll: async (params?: UserFilters): Promise<PaginatedResponse<User>> => {
    const { data } = await apiClient.get<PaginatedResponse<User>>(BASE, { params });
    return data;
  },

  getById: async (id: string): Promise<User> => {
    const { data } = await apiClient.get<ApiResponse<User>>(`${BASE}/${id}`);
    return data.data;
  },

  create: async (payload: Partial<User>): Promise<User> => {
    const { data } = await apiClient.post<ApiResponse<User>>(BASE, payload);
    return data.data;
  },

  update: async (id: string, payload: Partial<User>): Promise<User> => {
    const { data } = await apiClient.put<ApiResponse<User>>(`${BASE}/${id}`, payload);
    return data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`${BASE}/${id}`);
  },

  toggleBlock: async (id: string): Promise<User> => {
    const { data } = await apiClient.patch<ApiResponse<User>>(`${BASE}/${id}/toggle-block`);
    return data.data;
  },

  activateSubscription: async (id: string, subscription: Partial<Subscription>): Promise<User> => {
    const { data } = await apiClient.patch<ApiResponse<User>>(`${BASE}/${id}/subscription`, subscription);
    return data.data;
  },
};

// ===== React Query Hooks =====

export function useUsers(params?: UserFilters) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => userService.getAll(params),
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => userService.getById(id),
    enabled: !!id,
  });
}

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<User>) => userService.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<User> }) => userService.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => userService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
}

export function useToggleBlockUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => userService.toggleBlock(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
}

export function useActivateSubscription() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, subscription }: { id: string; subscription: Partial<Subscription> }) =>
      userService.activateSubscription(id, subscription),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
}
