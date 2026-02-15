import { ClipboardCheck, Building2, Crown, CreditCard } from 'lucide-react';
import { StatsCard } from '@/components/StatsCard';
import { useDashboardStats } from '@/services/dashboardService';
import { useBusinesses, useApproveBusiness, useRejectBusiness } from '@/services/businessService';
import { StatusBadge, ListingTypeBadge } from '@/components/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatsSkeleton, TableSkeleton } from '@/components/TableSkeleton';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@/types';

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats('admin');
  const { data: pendingData, isLoading: pendingLoading } = useBusinesses({ approvalStatus: 'pending', limit: 10 });
  const { toast } = useToast();
  const approveMutation = useApproveBusiness();
  const rejectMutation = useRejectBusiness();

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Operations overview and pending approvals</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsLoading ? <StatsSkeleton count={4} /> : stats && (
          <>
            <StatsCard title="Pending Approvals" value={stats.pendingApprovals} icon={ClipboardCheck} variant="warning" />
            <StatsCard title="New Today" value={stats.newToday} icon={Building2} variant="info" />
            <StatsCard title="Premium Requests" value={stats.premiumRequests} icon={Crown} variant="premium" />
            <StatsCard title="Verified Payments" value={stats.verifiedPayments} icon={CreditCard} variant="success" />
          </>
        )}
      </div>

      <div className="rounded-xl border bg-card card-shadow">
        <div className="p-5 border-b border-border">
          <h3 className="font-display font-semibold text-foreground">Pending Approvals</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingLoading ? <TableSkeleton cols={6} /> : pendingData?.data?.map((b) => (
              <TableRow key={b._id}>
                <TableCell className="font-medium">{b.businessName}</TableCell>
                <TableCell className="text-muted-foreground">{b.categoryId}</TableCell>
                <TableCell className="text-muted-foreground">{typeof b.createdBy === 'object' ? (b.createdBy as User).name : b.createdBy}</TableCell>
                <TableCell><ListingTypeBadge type={b.listingType} /></TableCell>
                <TableCell>₹{b.paymentDetails.amount.toLocaleString()} ({b.paymentDetails.paymentMode.toUpperCase()})</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90 gap-1"
                      onClick={() => approveMutation.mutate(b._id, { onSuccess: () => toast({ title: 'Approved', description: `${b.businessName} approved` }) })}
                      disabled={approveMutation.isPending}>
                      <Check className="h-3.5 w-3.5" /> Approve
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10 gap-1"
                      onClick={() => rejectMutation.mutate({ id: b._id, rejectionReason: 'Rejected by admin' }, { onSuccess: () => toast({ title: 'Rejected', description: `${b.businessName} rejected` }) })}
                      disabled={rejectMutation.isPending}>
                      <X className="h-3.5 w-3.5" /> Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {!pendingLoading && (!pendingData?.data || pendingData.data.length === 0) && (
              <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No pending approvals</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
