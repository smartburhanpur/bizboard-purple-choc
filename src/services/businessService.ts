import { mockBusinesses } from '@/data/mockData';
import type { Business, PaginatedResponse, BusinessFilters } from '@/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const delay = (ms = 400) => new Promise(r => setTimeout(r, ms));

let businesses = [...mockBusinesses];
let nextId = 100;

export const businessService = {
  getAll: async (params?: BusinessFilters): Promise<PaginatedResponse<Business>> => {
    await delay();
    let filtered = [...businesses];
    if (params?.approvalStatus) filtered = filtered.filter(b => b.approvalStatus === params.approvalStatus);
    if (params?.listingType) filtered = filtered.filter(b => b.listingType === params.listingType);
    if (params?.categoryId) filtered = filtered.filter(b => b.categoryId === params.categoryId);
    if (params?.city) filtered = filtered.filter(b => b.city.toLowerCase().includes(params.city!.toLowerCase()));
    if (params?.isPremium !== undefined) filtered = filtered.filter(b => b.isPremium === params.isPremium);
    if (params?.createdBy) filtered = filtered.filter(b => b.createdBy === params.createdBy);
    if (params?.businessType) filtered = filtered.filter(b => b.businessType === params.businessType);
    if (params?.premiumRequestStatus) filtered = filtered.filter(b => b.premiumRequestStatus === params.premiumRequestStatus);
    if (params?.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter(b => b.businessName.toLowerCase().includes(s) || b.city.toLowerCase().includes(s));
    }
    if (params?.sortBy === 'createdAt') {
      filtered.sort((a, b) => params.sortOrder === 'asc'
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const total = filtered.length;
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);
    return { success: true, data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  },

  getById: async (id: string): Promise<Business> => {
    await delay(200);
    const biz = businesses.find(b => b._id === id);
    if (!biz) throw new Error('Business not found');
    return { ...biz };
  },

  create: async (payload: Partial<Business>): Promise<Business> => {
    await delay(600);
    const newBiz: Business = {
      _id: `biz_new_${nextId++}`,
      businessName: payload.businessName || '',
      categoryId: payload.categoryId || '',
      phone: payload.phone || '',
      address: payload.address || '',
      city: payload.city || '',
      listingType: payload.listingType || 'normal',
      businessType: payload.businessType || 'leads',
      approvalStatus: 'pending',
      isPremium: false,
      premiumSource: 'none',
      premiumRequestStatus: 'none',
      isVisible: false,
      serviceArea: payload.serviceArea || '',
      description: payload.description || '',
      ownerId: payload.ownerId,
      paymentDetails: {
        amount: payload.paymentDetails?.amount || 0,
        paymentMode: payload.paymentDetails?.paymentMode || 'cash',
        paymentStatus: 'pending',
        paymentNote: payload.paymentDetails?.paymentNote,
      },
      verification: { status: 'pending' },
      createdBy: payload.createdBy || 'usr_s1',
      createdAt: new Date().toISOString(),
    };
    businesses = [newBiz, ...businesses];
    return newBiz;
  },

  update: async (id: string, payload: Partial<Business>): Promise<Business> => {
    await delay(400);
    businesses = businesses.map(b => b._id === id ? { ...b, ...payload, updatedAt: new Date().toISOString() } : b);
    return businesses.find(b => b._id === id)!;
  },

  delete: async (id: string): Promise<void> => {
    await delay(300);
    businesses = businesses.filter(b => b._id !== id);
  },

  approve: async (id: string): Promise<Business> => {
    await delay(500);
    businesses = businesses.map(b => b._id === id ? { ...b, approvalStatus: 'approved', isVisible: true } : b);
    return businesses.find(b => b._id === id)!;
  },

  reject: async (id: string, rejectionReason: string): Promise<Business> => {
    await delay(500);
    businesses = businesses.map(b => b._id === id ? { ...b, approvalStatus: 'rejected', rejectionReason } : b);
    return businesses.find(b => b._id === id)!;
  },

  verifyPayment: async (id: string): Promise<Business> => {
    await delay(400);
    businesses = businesses.map(b => b._id === id ? { ...b, paymentDetails: { ...b.paymentDetails, paymentStatus: 'verified' }, verification: { status: 'verified' } } : b);
    return businesses.find(b => b._id === id)!;
  },

  toggleVisibility: async (id: string): Promise<Business> => {
    await delay(300);
    businesses = businesses.map(b => b._id === id ? { ...b, isVisible: !b.isVisible } : b);
    return businesses.find(b => b._id === id)!;
  },

  activatePremium: async (id: string): Promise<Business> => {
    await delay(400);
    businesses = businesses.map(b => b._id === id ? { ...b, isPremium: true, listingType: 'premium', premiumSource: 'manual', premiumRequestStatus: 'premium_approved' } : b);
    return businesses.find(b => b._id === id)!;
  },

  deactivatePremium: async (id: string): Promise<Business> => {
    await delay(400);
    businesses = businesses.map(b => b._id === id ? { ...b, isPremium: false, listingType: 'normal', premiumSource: 'none' } : b);
    return businesses.find(b => b._id === id)!;
  },

  requestPremium: async (id: string): Promise<Business> => {
    await delay(400);
    businesses = businesses.map(b => b._id === id ? { ...b, premiumRequestStatus: 'premium_requested' } : b);
    return businesses.find(b => b._id === id)!;
  },

  approvePremiumRequest: async (id: string): Promise<Business> => {
    await delay(400);
    businesses = businesses.map(b => b._id === id ? { ...b, premiumRequestStatus: 'premium_approved', isPremium: true, listingType: 'premium', premiumSource: 'manual' } : b);
    return businesses.find(b => b._id === id)!;
  },

  rejectPremiumRequest: async (id: string): Promise<Business> => {
    await delay(400);
    businesses = businesses.map(b => b._id === id ? { ...b, premiumRequestStatus: 'premium_rejected' } : b);
    return businesses.find(b => b._id === id)!;
  },
};

// ===== React Query Hooks =====
export function useBusinesses(params?: BusinessFilters) {
  return useQuery({ queryKey: ['businesses', params], queryFn: () => businessService.getAll(params) });
}

export function useBusiness(id: string) {
  return useQuery({ queryKey: ['businesses', id], queryFn: () => businessService.getById(id), enabled: !!id });
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

export function useRequestPremium() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => businessService.requestPremium(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['businesses'] }),
  });
}

export function useApprovePremiumRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => businessService.approvePremiumRequest(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['businesses'] }),
  });
}

export function useRejectPremiumRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => businessService.rejectPremiumRequest(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['businesses'] }),
  });
}
