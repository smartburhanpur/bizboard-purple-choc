import apiClient from '@/lib/apiClient';
import type { Lead, ApiResponse, PaginatedResponse, LeadFilters } from '@/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const BASE = '/leads';

export const leadService = {
  getAll: async (params?: LeadFilters): Promise<PaginatedResponse<Lead>> => {
    const { data } = await apiClient.get<PaginatedResponse<Lead>>(BASE, { params });
    return data;
  },

  getById: async (id: string): Promise<Lead> => {
    const { data } = await apiClient.get<ApiResponse<Lead>>(`${BASE}/${id}`);
    return data.data;
  },

  create: async (payload: Partial<Lead>): Promise<Lead> => {
    const { data } = await apiClient.post<ApiResponse<Lead>>(BASE, payload);
    return data.data;
  },

  updateStatus: async (id: string, status: Lead['status']): Promise<Lead> => {
    const { data } = await apiClient.patch<ApiResponse<Lead>>(`${BASE}/${id}/status`, { status });
    return data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`${BASE}/${id}`);
  },
};

export function useLeads(params?: LeadFilters) {
  return useQuery({
    queryKey: ['leads', params],
    queryFn: () => leadService.getAll(params),
  });
}

export function useLead(id: string) {
  return useQuery({
    queryKey: ['leads', id],
    queryFn: () => leadService.getById(id),
    enabled: !!id,
  });
}

export function useUpdateLeadStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Lead['status'] }) => leadService.updateStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['leads'] }),
  });
}
