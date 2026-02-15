import { mockCategories } from '@/data/mockData';
import type { Category, PaginatedResponse, PaginationParams } from '@/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const delay = (ms = 400) => new Promise(r => setTimeout(r, ms));

let categories = [...mockCategories];
let nextId = 100;

export const categoryService = {
  getAll: async (params?: PaginationParams): Promise<PaginatedResponse<Category>> => {
    await delay();
    let filtered = [...categories];
    if (params?.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter(c => c.name.toLowerCase().includes(s));
    }
    const page = params?.page || 1;
    const limit = params?.limit || 50;
    const total = filtered.length;
    return { success: true, data: filtered, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  },

  create: async (payload: { name: string }): Promise<Category> => {
    await delay(500);
    const newCat: Category = { _id: `cat_new_${nextId++}`, name: payload.name, businessCount: 0, createdAt: new Date().toISOString() };
    categories = [...categories, newCat];
    return newCat;
  },

  update: async (id: string, payload: { name: string }): Promise<Category> => {
    await delay(400);
    categories = categories.map(c => c._id === id ? { ...c, name: payload.name } : c);
    return categories.find(c => c._id === id)!;
  },

  delete: async (id: string): Promise<void> => {
    await delay(300);
    categories = categories.filter(c => c._id !== id);
  },
};

export function useCategories(params?: PaginationParams) {
  return useQuery({ queryKey: ['categories', params], queryFn: () => categoryService.getAll(params) });
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
