import { Building2, CheckCircle, Clock, Crown, CreditCard } from 'lucide-react';
import { StatsCard } from '@/components/StatsCard';
import { mockBusinesses, mockPayments } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { StatusBadge, ListingTypeBadge } from '@/components/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function SalesmanDashboard() {
  const { user } = useAuth();
  const myBusinesses = mockBusinesses.filter(b => b.createdBy === user?.id);
  const myPayments = mockPayments.filter(p => p.salesmanId === user?.id);

  const stats = {
    total: myBusinesses.length,
    approved: myBusinesses.filter(b => b.status === 'approved').length,
    pending: myBusinesses.filter(b => b.status === 'pending').length,
    premiumSold: myBusinesses.filter(b => b.listingType === 'premium' && b.status === 'approved').length,
    collected: myPayments.filter(p => p.status === 'verified').reduce((s, p) => s + p.amount, 0),
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground">Your field operations overview</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatsCard title="Total Added" value={stats.total} icon={Building2} variant="primary" />
        <StatsCard title="Approved" value={stats.approved} icon={CheckCircle} variant="success" />
        <StatsCard title="Pending" value={stats.pending} icon={Clock} variant="warning" />
        <StatsCard title="Premium Sold" value={stats.premiumSold} icon={Crown} variant="premium" />
        <StatsCard title="Collected" value={`₹${stats.collected.toLocaleString()}`} icon={CreditCard} variant="info" />
      </div>

      <div className="rounded-xl border bg-card card-shadow">
        <div className="p-5 border-b border-border">
          <h3 className="font-display font-semibold text-foreground">My Recent Businesses</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myBusinesses.slice(0, 5).map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-medium">{b.name}</TableCell>
                <TableCell className="text-muted-foreground">{b.category}</TableCell>
                <TableCell><ListingTypeBadge type={b.listingType} /></TableCell>
                <TableCell><StatusBadge status={b.status} /></TableCell>
                <TableCell className="text-muted-foreground">{b.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
