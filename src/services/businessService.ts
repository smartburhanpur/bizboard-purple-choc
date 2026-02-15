import apiClient from '@/lib/apiClient';
import type { Business, ApiResponse, PaginatedResponse, BusinessFilters } from '@/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const BASE = '/businesses';

export const businessService = {
  getAll: async (params?: BusinessFilters): Promise<PaginatedResponse<Business>> => {
    const { data } = await apiClient.get<PaginatedResponse<Business>>(BASE, { params });
    return data;
  },

  getById: async (id: string): Promise<Business> => {
    const { data } = await apiClient.get<ApiResponse<Business>>(`${BASE}/${id}`);
    return data.data;
  },

  create: async (payload: Partial<Business>): Promise<Business> => {
    const { data } = await apiClient.post<ApiResponse<Business>>(BASE, payload);
    return data.data;
  },

  update: async (id: string, payload: Partial<Business>): Promise<Business> => {
    const { data } = await apiClient.put<ApiResponse<Business>>(`${BASE}/${id}`, payload);
    return data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`${BASE}/${id}`);
  },

  approve: async (id: string): Promise<Business> => {
    const { data } = await apiClient.patch<ApiResponse<Business>>(`${BASE}/${id}/approve`);
    return data.data;
  },

  reject: async (id: string, rejectionReason: string): Promise<Business> => {
    const { data } = await apiClient.patch<ApiResponse<Business>>(`${BASE}/${id}/reject`, { rejectionReason });
    return data.data;
  },

  verifyPayment: async (id: string): Promise<Business> => {
    const { data } = await apiClient.patch<ApiResponse<Business>>(`${BASE}/${id}/verify-payment`);
    return data.data;
  },

  toggleVisibility: async (id: string): Promise<Business> => {
    const { data } = await apiClient.patch<ApiResponse<Business>>(`${BASE}/${id}/toggle-visibility`);
    return data.data;
  },

  activatePremium: async (id: string): Promise<Business> => {
    const { data } = await apiClient.patch<ApiResponse<Business>>(`${BASE}/${id}/activate-premium`);
    return data.data;
  },

  deactivatePremium: async (id: string): Promise<Business> => {
    const { data } = await apiClient.patch<ApiResponse<Business>>(`${BASE}/${id}/deactivate-premium`);
    return data.data;
  },
};

// ===== React Query Hooks =====

export function useBusinesses(params?: BusinessFilters) {
  return useQuery({
    queryKey: ['businesses', params],
    queryFn: () => businessService.getAll(params),
  });
}

export function useBusiness(id: string) {
  return useQuery({
    queryKey: ['businesses', id],
    queryFn: () => businessService.getById(id),
    enabled: !!id,
  });
}

export function useCreateBusiness() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Business>) => businessService.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['businesses'] }),
  });
}

export function useUpdateBusiness() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Business> }) => businessService.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['businesses'] }),
  });
}

export function useDeleteBusiness() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => businessService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['businesses'] }),
  });
}

export function useApproveBusiness() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => businessService.approve(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['businesses'] }),
  });
}

export function useRejectBusiness() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, rejectionReason }: { id: string; rejectionReason: string }) =>
      businessService.reject(id, rejectionReason),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['businesses'] }),
  });
}

export function useVerifyPayment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => businessService.verifyPayment(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['businesses'] }),
  });
}

export function useToggleVisibility() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => businessService.toggleVisibility(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['businesses'] }),
  });
}

export function useActivatePremium() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => businessService.activatePremium(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['businesses'] }),
  });
}
