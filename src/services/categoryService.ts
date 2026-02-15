import apiClient from '@/lib/apiClient';
import type { Category, ApiResponse, PaginatedResponse, PaginationParams } from '@/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const BASE = '/categories';

export const categoryService = {
  getAll: async (params?: PaginationParams): Promise<PaginatedResponse<Category>> => {
    const { data } = await apiClient.get<PaginatedResponse<Category>>(BASE, { params });
    return data;
  },

  create: async (payload: { name: string }): Promise<Category> => {
    const { data } = await apiClient.post<ApiResponse<Category>>(BASE, payload);
    return data.data;
  },

  update: async (id: string, payload: { name: string }): Promise<Category> => {
    const { data } = await apiClient.put<ApiResponse<Category>>(`${BASE}/${id}`, payload);
    return data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`${BASE}/${id}`);
  },
};

export function useCategories(params?: PaginationParams) {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => categoryService.getAll(params),
  });
}

export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { name: string }) => categoryService.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['categories'] }),
  });
}

export function useUpdateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) => categoryService.update(id, { name }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['categories'] }),
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categoryService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['categories'] }),
  });
}
