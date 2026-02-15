import { useState } from 'react';
import { useBusinesses, useApproveBusiness, useRejectBusiness, useVerifyPayment } from '@/services/businessService';
import { StatusBadge, ListingTypeBadge } from '@/components/StatusBadge';
import { DataTableHeader } from '@/components/DataTableHeader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TableSkeleton } from '@/components/TableSkeleton';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@/types';

export default function PendingApprovals() {
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  const { data, isLoading } = useBusinesses({ approvalStatus: 'pending', search: search || undefined });
  const approveMutation = useApproveBusiness();
  const rejectMutation = useRejectBusiness();
  const verifyPaymentMutation = useVerifyPayment();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Pending Approvals</h1>
        <p className="text-muted-foreground">Review and approve business listing requests</p>
      </div>

      <div className="rounded-xl border bg-card card-shadow">
        <div className="p-5 border-b border-border">
          <DataTableHeader searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search pending businesses..." />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Type Requested</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Mode</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Verification</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? <TableSkeleton cols={9} /> : data?.data?.map((b) => (
                <TableRow key={b._id}>
                  <TableCell className="font-medium">{b.businessName}</TableCell>
                  <TableCell className="text-muted-foreground">{b.categoryId}</TableCell>
                  <TableCell className="text-muted-foreground">{typeof b.createdBy === 'object' ? (b.createdBy as User).name : b.createdBy}</TableCell>
                  <TableCell><ListingTypeBadge type={b.listingType} /></TableCell>
                  <TableCell className="font-semibold">₹{b.paymentDetails.amount.toLocaleString()}</TableCell>
                  <TableCell className="uppercase text-xs font-medium text-muted-foreground">{b.paymentDetails.paymentMode}</TableCell>
                  <TableCell><StatusBadge status={b.paymentDetails.paymentStatus} /></TableCell>
                  <TableCell><StatusBadge status={b.verification.status} /></TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90 gap-1"
                        onClick={() => approveMutation.mutate(b._id, { onSuccess: () => toast({ title: 'Approved' }) })}
                        disabled={approveMutation.isPending}>
                        <Check className="h-3.5 w-3.5" /> Approve
                      </Button>
                      <Button size="sm" variant="outline" className="text-destructive border-destructive/30 gap-1"
                        onClick={() => rejectMutation.mutate({ id: b._id, rejectionReason: 'Rejected' }, { onSuccess: () => toast({ title: 'Rejected' }) })}
                        disabled={rejectMutation.isPending}>
                        <X className="h-3.5 w-3.5" /> Reject
                      </Button>
                      {b.paymentDetails.paymentStatus === 'pending' && (
                        <Button size="sm" variant="outline" className="text-info gap-1"
                          onClick={() => verifyPaymentMutation.mutate(b._id, { onSuccess: () => toast({ title: 'Payment Verified' }) })}
                          disabled={verifyPaymentMutation.isPending}>
                          Verify Payment
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {!isLoading && (!data?.data || data.data.length === 0) && (
                <TableRow><TableCell colSpan={9} className="text-center py-8 text-muted-foreground">No pending approvals</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
