import { mockLeads } from '@/data/mockData';
import type { Lead, PaginatedResponse, LeadFilters } from '@/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const delay = (ms = 400) => new Promise(r => setTimeout(r, ms));

let leads = [...mockLeads];

export const leadService = {
  getAll: async (params?: LeadFilters): Promise<PaginatedResponse<Lead>> => {
    await delay();
    let filtered = [...leads];
    if (params?.status) filtered = filtered.filter(l => l.status === params.status);
    if (params?.assignedTo) filtered = filtered.filter(l => l.assignedTo === params.assignedTo);
    if (params?.businessId) filtered = filtered.filter(l => l.businessId === params.businessId);
    if (params?.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter(l => l.customerName.toLowerCase().includes(s) || l.phone.includes(s) || l.message.toLowerCase().includes(s));
    }
    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const total = filtered.length;
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);
    return { success: true, data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  },

  getById: async (id: string): Promise<Lead> => {
    await delay(200);
    const lead = leads.find(l => l._id === id);
    if (!lead) throw new Error('Lead not found');
    return { ...lead };
  },

  create: async (payload: Partial<Lead>): Promise<Lead> => {
    await delay(500);
    const newLead: Lead = {
      _id: `lead_new_${Date.now()}`,
      customerName: payload.customerName || '',
      phone: payload.phone || '',
      message: payload.message || '',
      status: 'new',
      leadType: payload.leadType || 'lead',
      assignedTo: payload.assignedTo || '',
      businessId: payload.businessId,
      createdAt: new Date().toISOString(),
    };
    leads = [newLead, ...leads];
    return newLead;
  },

  updateStatus: async (id: string, status: Lead['status']): Promise<Lead> => {
    await delay(300);
    leads = leads.map(l => l._id === id ? { ...l, status, updatedAt: new Date().toISOString() } : l);
    return leads.find(l => l._id === id)!;
  },

  bulkAssign: async (leadIds: string[], assignedBusinessId: string): Promise<Lead[]> => {
    await delay(500);
    leads = leads.map(l => leadIds.includes(l._id) ? { ...l, assignedBusinessId, updatedAt: new Date().toISOString() } : l);
    return leads.filter(l => leadIds.includes(l._id));
  },

  delete: async (id: string): Promise<void> => {
    await delay(300);
    leads = leads.filter(l => l._id !== id);
  },
};

export function useLeads(params?: LeadFilters) {
  return useQuery({ queryKey: ['leads', params], queryFn: () => leadService.getAll(params) });
}

export function useLead(id: string) {
  return useQuery({ queryKey: ['leads', id], queryFn: () => leadService.getById(id), enabled: !!id });
}

export function useUpdateLeadStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Lead['status'] }) => leadService.updateStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['leads'] }),
  });
}

export function useBulkAssignLeads() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ leadIds, assignedBusinessId }: { leadIds: string[]; assignedBusinessId: string }) =>
      leadService.bulkAssign(leadIds, assignedBusinessId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['leads'] }),
  });
}
