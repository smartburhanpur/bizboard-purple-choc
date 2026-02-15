import { calculateStats } from '@/data/mockData';
import type { DashboardStats } from '@/types';
import { useQuery } from '@tanstack/react-query';

const delay = (ms = 400) => new Promise(r => setTimeout(r, ms));

export const dashboardService = {
  getStats: async (role?: string, userId?: string): Promise<DashboardStats> => {
    await delay();
    return calculateStats(role, userId);
  },
};

export function useDashboardStats(role?: string, userId?: string) {
  return useQuery({
    queryKey: ['dashboard-stats', role, userId],
    queryFn: () => dashboardService.getStats(role, userId),
    refetchInterval: 30000,
  });
}
