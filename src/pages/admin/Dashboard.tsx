import { ClipboardCheck, Building2, Crown, CreditCard } from 'lucide-react';
import { StatsCard } from '@/components/StatsCard';
import { getSuperAdminStats, mockBusinesses } from '@/data/mockData';
import { StatusBadge, ListingTypeBadge } from '@/components/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminDashboard() {
  const stats = getSuperAdminStats();
  const { toast } = useToast();
  const pending = mockBusinesses.filter(b => b.status === 'pending');

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Operations overview and pending approvals</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Pending Approvals" value={stats.pendingApprovals} icon={ClipboardCheck} variant="warning" />
        <StatsCard title="New Today" value={stats.newToday} icon={Building2} variant="info" />
        <StatsCard title="Premium Requests" value={stats.premiumRequests} icon={Crown} variant="premium" />
        <StatsCard title="Verified Payments" value={stats.verifiedPayments} icon={CreditCard} variant="success" />
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
              <TableHead>Salesman</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pending.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-medium">{b.name}</TableCell>
                <TableCell className="text-muted-foreground">{b.category}</TableCell>
                <TableCell className="text-muted-foreground">{b.createdByName}</TableCell>
                <TableCell><ListingTypeBadge type={b.listingType} /></TableCell>
                <TableCell>₹{b.paymentAmount.toLocaleString()} ({b.paymentMode.toUpperCase()})</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90 gap-1" onClick={() => toast({ title: 'Approved', description: `${b.name} approved` })}>
                      <Check className="h-3.5 w-3.5" /> Approve
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10 gap-1" onClick={() => toast({ title: 'Rejected', description: `${b.name} rejected` })}>
                      <X className="h-3.5 w-3.5" /> Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {pending.length === 0 && (
              <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No pending approvals</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
