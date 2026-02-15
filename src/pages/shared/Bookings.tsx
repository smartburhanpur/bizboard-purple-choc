import { useState } from 'react';
import { useBookings, useUpdateBookingStatus } from '@/services/bookingService';
import { StatusBadge } from '@/components/StatusBadge';
import { DataTableHeader } from '@/components/DataTableHeader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TableSkeleton } from '@/components/TableSkeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { Booking, BookingFilters, Business } from '@/types';

export default function BookingsPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<BookingFilters>({ page: 1, limit: 20 });
  const { toast } = useToast();

  const { data, isLoading } = useBookings({ ...filters, search: search || undefined });
  const updateStatusMutation = useUpdateBookingStatus();

  const handleStatusChange = (id: string, bookingStatus: Booking['bookingStatus']) => {
    updateStatusMutation.mutate({ id, bookingStatus }, {
      onSuccess: () => toast({ title: 'Booking Updated' }),
      onError: (err: any) => toast({ title: 'Error', description: err?.response?.data?.message || 'Failed', variant: 'destructive' }),
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Bookings Management</h1>
        <p className="text-muted-foreground">Track and manage customer bookings</p>
      </div>

      <div className="rounded-xl border bg-card card-shadow">
        <div className="p-5 border-b border-border">
          <DataTableHeader
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search bookings..."
            filters={[
              { key: 'bookingStatus', label: 'Status', value: filters.bookingStatus || 'all', onChange: (v) => setFilters(p => ({ ...p, bookingStatus: v === 'all' ? undefined : v, page: 1 })), options: [{ value: 'pending', label: 'Pending' }, { value: 'confirmed', label: 'Confirmed' }, { value: 'cancelled', label: 'Cancelled' }, { value: 'completed', label: 'Completed' }] },
              { key: 'paymentStatus', label: 'Payment', value: filters.paymentStatus || 'all', onChange: (v) => setFilters(p => ({ ...p, paymentStatus: v === 'all' ? undefined : v, page: 1 })), options: [{ value: 'pending', label: 'Pending' }, { value: 'paid', label: 'Paid' }, { value: 'refunded', label: 'Refunded' }] },
            ]}
          />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Booking Status</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Booking Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? <TableSkeleton cols={7} /> : data?.data?.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell className="font-medium">{typeof booking.businessId === 'object' ? (booking.businessId as Business).businessName : booking.businessId}</TableCell>
                  <TableCell className="text-muted-foreground">{booking.customerName || '—'}</TableCell>
                  <TableCell className="text-muted-foreground">{booking.phone || '—'}</TableCell>
                  <TableCell><StatusBadge status={booking.bookingStatus} /></TableCell>
                  <TableCell><StatusBadge status={booking.paymentStatus} /></TableCell>
                  <TableCell className="text-muted-foreground">{new Date(booking.bookingDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <Select value={booking.bookingStatus} onValueChange={(v: Booking['bookingStatus']) => handleStatusChange(booking._id, v)}>
                        <SelectTrigger className="w-[130px] h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {!isLoading && (!data?.data || data.data.length === 0) && (
                <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No bookings found</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {data?.pagination && data.pagination.totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-border">
            <p className="text-sm text-muted-foreground">Page {data.pagination.page} of {data.pagination.totalPages}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={data.pagination.page <= 1} onClick={() => setFilters(p => ({ ...p, page: (p.page || 1) - 1 }))}>Previous</Button>
              <Button variant="outline" size="sm" disabled={data.pagination.page >= data.pagination.totalPages} onClick={() => setFilters(p => ({ ...p, page: (p.page || 1) + 1 }))}>Next</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
