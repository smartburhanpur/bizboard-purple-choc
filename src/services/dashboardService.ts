import apiClient from '@/lib/apiClient';
import type { DashboardStats, ApiResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const dashboardService = {
  getStats: async (role?: string): Promise<DashboardStats> => {
    const { data } = await apiClient.get<ApiResponse<DashboardStats>>('/dashboard/stats', { params: { role } });
    return data.data;
  },
};

export function useDashboardStats(role?: string) {
  return useQuery({
    queryKey: ['dashboard-stats', role],
    queryFn: () => dashboardService.getStats(role),
    refetchInterval: 30000, // refresh every 30s
  });
}
