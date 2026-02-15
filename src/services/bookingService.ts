import apiClient from '@/lib/apiClient';
import type { Booking, ApiResponse, PaginatedResponse, BookingFilters } from '@/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const BASE = '/bookings';

export const bookingService = {
  getAll: async (params?: BookingFilters): Promise<PaginatedResponse<Booking>> => {
    const { data } = await apiClient.get<PaginatedResponse<Booking>>(BASE, { params });
    return data;
  },

  getById: async (id: string): Promise<Booking> => {
    const { data } = await apiClient.get<ApiResponse<Booking>>(`${BASE}/${id}`);
    return data.data;
  },

  updateStatus: async (id: string, bookingStatus: Booking['bookingStatus']): Promise<Booking> => {
    const { data } = await apiClient.patch<ApiResponse<Booking>>(`${BASE}/${id}/status`, { bookingStatus });
    return data.data;
  },
};

export function useBookings(params?: BookingFilters) {
  return useQuery({
    queryKey: ['bookings', params],
    queryFn: () => bookingService.getAll(params),
  });
}

export function useBooking(id: string) {
  return useQuery({
    queryKey: ['bookings', id],
    queryFn: () => bookingService.getById(id),
    enabled: !!id,
  });
}

export function useUpdateBookingStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, bookingStatus }: { id: string; bookingStatus: Booking['bookingStatus'] }) =>
      bookingService.updateStatus(id, bookingStatus),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['bookings'] }),
  });
}
