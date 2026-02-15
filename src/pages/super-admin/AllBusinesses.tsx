import { useState } from 'react';
import { useBusinesses, useApproveBusiness, useRejectBusiness, useVerifyPayment, useToggleVisibility, useActivatePremium, useDeleteBusiness } from '@/services/businessService';
import { useCategories } from '@/services/categoryService';
import { StatusBadge, ListingTypeBadge } from '@/components/StatusBadge';
import { DataTableHeader } from '@/components/DataTableHeader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TableSkeleton } from '@/components/TableSkeleton';
import { Button } from '@/components/ui/button';
import { Eye, Check, X, Trash2, Crown, EyeOff, Eye as EyeIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { BusinessFilters, User } from '@/types';

export default function AllBusinessesPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<BusinessFilters>({ page: 1, limit: 20 });
  const { toast } = useToast();

  const queryParams: BusinessFilters = {
    ...filters,
    search: search || undefined,
  };

  const { data, isLoading } = useBusinesses(queryParams);
  const { data: categoriesData } = useCategories();
  const approveMutation = useApproveBusiness();
  const rejectMutation = useRejectBusiness();
  const verifyPaymentMutation = useVerifyPayment();
  const toggleVisibilityMutation = useToggleVisibility();
  const activatePremiumMutation = useActivatePremium();
  const deleteMutation = useDeleteBusiness();

  const handleApprove = (id: string, name: string) => {
    approveMutation.mutate(id, {
      onSuccess: () => toast({ title: 'Approved', description: `${name} has been approved` }),
      onError: (err: any) => toast({ title: 'Error', description: err?.response?.data?.message || 'Failed to approve', variant: 'destructive' }),
    });
  };

  const handleReject = (id: string, name: string) => {
    rejectMutation.mutate({ id, rejectionReason: 'Rejected by admin' }, {
      onSuccess: () => toast({ title: 'Rejected', description: `${name} has been rejected` }),
      onError: (err: any) => toast({ title: 'Error', description: err?.response?.data?.message || 'Failed to reject', variant: 'destructive' }),
    });
  };

  const handleVerifyPayment = (id: string) => {
    verifyPaymentMutation.mutate(id, {
      onSuccess: () => toast({ title: 'Payment Verified' }),
    });
  };

  const handleToggleVisibility = (id: string) => {
    toggleVisibilityMutation.mutate(id, {
      onSuccess: () => toast({ title: 'Visibility Updated' }),
    });
  };

  const handleActivatePremium = (id: string) => {
    activatePremiumMutation.mutate(id, {
      onSuccess: () => toast({ title: 'Premium Activated' }),
    });
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => toast({ title: 'Business Deleted' }),
    });
  };

  const categoryOptions = categoriesData?.data?.map(c => ({ value: c._id, label: c.name })) || [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">All Businesses</h1>
        <p className="text-muted-foreground">Manage all business listings across the platform</p>
      </div>

      <div className="rounded-xl border bg-card card-shadow">
        <div className="p-5 border-b border-border">
          <DataTableHeader
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search businesses..."
            filters={[
              { key: 'approvalStatus', label: 'Status', value: filters.approvalStatus || 'all', onChange: (v) => setFilters(p => ({ ...p, approvalStatus: v === 'all' ? undefined : v, page: 1 })), options: [{ value: 'pending', label: 'Pending' }, { value: 'approved', label: 'Approved' }, { value: 'rejected', label: 'Rejected' }] },
              { key: 'listingType', label: 'Type', value: filters.listingType || 'all', onChange: (v) => setFilters(p => ({ ...p, listingType: v === 'all' ? undefined : v, page: 1 })), options: [{ value: 'normal', label: 'Normal' }, { value: 'premium', label: 'Premium' }] },
              { key: 'categoryId', label: 'Category', value: filters.categoryId || 'all', onChange: (v) => setFilters(p => ({ ...p, categoryId: v === 'all' ? undefined : v, page: 1 })), options: categoryOptions },
            ]}
          />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? <TableSkeleton cols={8} /> : data?.data?.map((b) => (
                <TableRow key={b._id}>
                  <TableCell className="font-medium">
                    {b.businessName}
                    {b.isPremium && <span className="ml-2 text-xs text-premium">★</span>}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{b.categoryId}</TableCell>
                  <TableCell className="text-muted-foreground">{b.city}</TableCell>
                  <TableCell><ListingTypeBadge type={b.listingType} /></TableCell>
                  <TableCell><StatusBadge status={b.approvalStatus} /></TableCell>
                  <TableCell><StatusBadge status={b.paymentDetails.paymentStatus} /></TableCell>
                  <TableCell className="text-muted-foreground">{typeof b.createdBy === 'object' ? (b.createdBy as User).name : b.createdBy}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleToggleVisibility(b._id)} disabled={toggleVisibilityMutation.isPending}>
                        {b.isVisible ? <EyeIcon className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                      {b.approvalStatus === 'pending' && (
                        <>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-success hover:text-success" onClick={() => handleApprove(b._id, b.businessName)} disabled={approveMutation.isPending}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleReject(b._id, b.businessName)} disabled={rejectMutation.isPending}>
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {b.paymentDetails.paymentStatus === 'pending' && (
                        <Button variant="ghost" size="sm" className="text-info" onClick={() => handleVerifyPayment(b._id)} disabled={verifyPaymentMutation.isPending}>
                          Verify
                        </Button>
                      )}
                      {!b.isPremium && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-premium" onClick={() => handleActivatePremium(b._id)} disabled={activatePremiumMutation.isPending}>
                          <Crown className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(b._id)} disabled={deleteMutation.isPending}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
        {/* Pagination */}
        {data?.pagination && data.pagination.totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Page {data.pagination.page} of {data.pagination.totalPages} ({data.pagination.total} total)
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={data.pagination.page <= 1} onClick={() => setFilters(p => ({ ...p, page: (p.page || 1) - 1 }))}>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled={data.pagination.page >= data.pagination.totalPages} onClick={() => setFilters(p => ({ ...p, page: (p.page || 1) + 1 }))}>
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
