import { mockBookings, mockBusinesses } from '@/data/mockData';
import type { Booking, PaginatedResponse, BookingFilters } from '@/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const delay = (ms = 400) => new Promise(r => setTimeout(r, ms));

let bookings = [...mockBookings];

export const bookingService = {
  getAll: async (params?: BookingFilters): Promise<PaginatedResponse<Booking>> => {
    await delay();
    let filtered = [...bookings];
    if (params?.bookingStatus) filtered = filtered.filter(b => b.bookingStatus === params.bookingStatus);
    if (params?.paymentStatus) filtered = filtered.filter(b => b.paymentStatus === params.paymentStatus);
    if (params?.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter(b => {
        const bizName = mockBusinesses.find(biz => biz._id === b.businessId)?.businessName || '';
        return b.customerName?.toLowerCase().includes(s) || bizName.toLowerCase().includes(s);
      });
    }
    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const total = filtered.length;
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);
    return { success: true, data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  },

  getById: async (id: string): Promise<Booking> => {
    await delay(200);
    const booking = bookings.find(b => b._id === id);
    if (!booking) throw new Error('Booking not found');
    return { ...booking };
  },

  updateStatus: async (id: string, bookingStatus: Booking['bookingStatus']): Promise<Booking> => {
    await delay(300);
    bookings = bookings.map(b => b._id === id ? { ...b, bookingStatus, updatedAt: new Date().toISOString() } : b);
    return bookings.find(b => b._id === id)!;
  },

  updatePaymentStatus: async (id: string, paymentStatus: Booking['paymentStatus']): Promise<Booking> => {
    await delay(300);
    bookings = bookings.map(b => b._id === id ? { ...b, paymentStatus, updatedAt: new Date().toISOString() } : b);
    return bookings.find(b => b._id === id)!;
  },
};

export function useBookings(params?: BookingFilters) {
  return useQuery({ queryKey: ['bookings', params], queryFn: () => bookingService.getAll(params) });
}

export function useBooking(id: string) {
  return useQuery({ queryKey: ['bookings', id], queryFn: () => bookingService.getById(id), enabled: !!id });
}

export function useUpdateBookingStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, bookingStatus }: { id: string; bookingStatus: Booking['bookingStatus'] }) =>
      bookingService.updateStatus(id, bookingStatus),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['bookings'] }),
  });
}

export function useUpdateBookingPaymentStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, paymentStatus }: { id: string; paymentStatus: Booking['paymentStatus'] }) =>
      bookingService.updatePaymentStatus(id, paymentStatus),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['bookings'] }),
  });
}
