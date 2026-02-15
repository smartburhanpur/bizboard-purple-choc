import { Building2, Users, CreditCard, TrendingUp, ClipboardCheck, Crown } from 'lucide-react';
import { StatsCard } from '@/components/StatsCard';
import { getSuperAdminStats, mockBusinesses } from '@/data/mockData';
import { StatusBadge, ListingTypeBadge } from '@/components/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function SuperAdminDashboard() {
  const stats = getSuperAdminStats();
  const recent = mockBusinesses.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Super Admin Dashboard</h1>
        <p className="text-muted-foreground">Complete overview of nearmeb2b.city platform</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatsCard title="Total Businesses" value={stats.totalBusinesses} icon={Building2} variant="primary" trend="+12% this month" />
        <StatsCard title="Premium Listings" value={stats.premiumListings} icon={Crown} variant="premium" />
        <StatsCard title="Total Salesmen" value={stats.totalSalesmen} icon={Users} variant="info" />
        <StatsCard title="Total Revenue" value={`₹${stats.totalRevenue.toLocaleString()}`} icon={CreditCard} variant="success" trend="+8% this month" />
        <StatsCard title="Pending Approvals" value={stats.pendingApprovals} icon={ClipboardCheck} variant="warning" />
        <StatsCard title="Verified Payments" value={stats.verifiedPayments} icon={TrendingUp} variant="default" />
      </div>

      <div className="rounded-xl border bg-card card-shadow">
        <div className="p-5 border-b border-border">
          <h3 className="font-display font-semibold text-foreground">Recent Businesses</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business Name</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Salesman</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recent.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-medium">{b.name}</TableCell>
                <TableCell>{b.city}</TableCell>
                <TableCell><ListingTypeBadge type={b.listingType} /></TableCell>
                <TableCell><StatusBadge status={b.status} /></TableCell>
                <TableCell className="text-muted-foreground">{b.createdByName}</TableCell>
                <TableCell className="text-muted-foreground">{b.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
