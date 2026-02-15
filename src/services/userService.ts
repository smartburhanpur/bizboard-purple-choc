import { mockUsers } from '@/data/mockData';
import type { User, PaginatedResponse, UserFilters, Subscription } from '@/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const delay = (ms = 400) => new Promise(r => setTimeout(r, ms));

// In-memory state
let users = [...mockUsers];
let nextId = 100;

export const userService = {
  getAll: async (params?: UserFilters): Promise<PaginatedResponse<User>> => {
    await delay();
    let filtered = [...users];
    if (params?.role) filtered = filtered.filter(u => u.role === params.role);
    if (params?.status) filtered = filtered.filter(u => u.status === params.status);
    if (params?.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter(u => u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s) || u.mobile.includes(s));
    }
    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const total = filtered.length;
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);
    return { success: true, data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  },

  getById: async (id: string): Promise<User> => {
    await delay(200);
    const user = users.find(u => u._id === id);
    if (!user) throw new Error('User not found');
    return { ...user };
  },

  create: async (payload: Partial<User>): Promise<User> => {
    await delay(600);
    const newUser: User = {
      _id: `usr_new_${nextId++}`,
      name: payload.name || '',
      mobile: payload.mobile || '',
      email: payload.email || '',
      role: payload.role || 'user',
      status: 'active',
      subscription: { status: 'none' },
      createdAt: new Date().toISOString(),
    };
    users = [newUser, ...users];
    return newUser;
  },

  update: async (id: string, payload: Partial<User>): Promise<User> => {
    await delay(400);
    users = users.map(u => u._id === id ? { ...u, ...payload, updatedAt: new Date().toISOString() } : u);
    return users.find(u => u._id === id)!;
  },

  delete: async (id: string): Promise<void> => {
    await delay(300);
    users = users.filter(u => u._id !== id);
  },

  toggleBlock: async (id: string): Promise<User> => {
    await delay(400);
    users = users.map(u => u._id === id ? { ...u, status: u.status === 'active' ? 'blocked' : 'active' } : u);
    return users.find(u => u._id === id)!;
  },

  activateSubscription: async (id: string, subscription: Partial<Subscription>): Promise<User> => {
    await delay(500);
    users = users.map(u => u._id === id ? { ...u, subscription: { ...u.subscription, ...subscription, status: 'active' } } : u);
    return users.find(u => u._id === id)!;
  },
};

// ===== React Query Hooks =====
export function useUsers(params?: UserFilters) {
  return useQuery({ queryKey: ['users', params], queryFn: () => userService.getAll(params) });
}

export function useUser(id: string) {
  return useQuery({ queryKey: ['users', id], queryFn: () => userService.getById(id), enabled: !!id });
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
