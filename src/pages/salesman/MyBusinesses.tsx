import { useState } from 'react';
import { useBusinesses } from '@/services/businessService';
import { useAuth } from '@/contexts/AuthContext';
import { StatusBadge, ListingTypeBadge } from '@/components/StatusBadge';
import { DataTableHeader } from '@/components/DataTableHeader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TableSkeleton } from '@/components/TableSkeleton';
import { Button } from '@/components/ui/button';
import { Eye, Pencil } from 'lucide-react';
import type { BusinessFilters } from '@/types';

export default function MyBusinesses() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<BusinessFilters>({ page: 1, limit: 20 });

  const { data, isLoading } = useBusinesses({
    ...filters,
    createdBy: user?._id,
    search: search || undefined,
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">My Businesses</h1>
        <p className="text-muted-foreground">View and manage businesses you've submitted</p>
      </div>

      <div className="rounded-xl border bg-card card-shadow">
        <div className="p-5 border-b border-border">
          <DataTableHeader
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search your businesses..."
            filters={[
              { key: 'approvalStatus', label: 'Status', value: filters.approvalStatus || 'all', onChange: (v) => setFilters(p => ({ ...p, approvalStatus: v === 'all' ? undefined : v, page: 1 })), options: [{ value: 'pending', label: 'Pending' }, { value: 'approved', label: 'Approved' }, { value: 'rejected', label: 'Rejected' }] },
              { key: 'listingType', label: 'Type', value: filters.listingType || 'all', onChange: (v) => setFilters(p => ({ ...p, listingType: v === 'all' ? undefined : v, page: 1 })), options: [{ value: 'normal', label: 'Normal' }, { value: 'premium', label: 'Premium' }] },
            ]}
          />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Approval Status</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Premium</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? <TableSkeleton cols={8} /> : data?.data?.map((b) => (
                <TableRow key={b._id}>
                  <TableCell className="font-medium">{b.businessName}</TableCell>
                  <TableCell className="text-muted-foreground">{b.categoryId}</TableCell>
                  <TableCell><ListingTypeBadge type={b.listingType} /></TableCell>
                  <TableCell><StatusBadge status={b.approvalStatus} /></TableCell>
                  <TableCell><StatusBadge status={b.paymentDetails.paymentStatus} /></TableCell>
                  <TableCell>{b.isPremium ? '★ Yes' : 'No'}</TableCell>
                  <TableCell className="text-muted-foreground">{new Date(b.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                      {b.approvalStatus === 'pending' && (
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="h-4 w-4" /></Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {!isLoading && (!data?.data || data.data.length === 0) && (
                <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No businesses found</TableCell></TableRow>
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
