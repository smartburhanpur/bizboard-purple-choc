import { useAuth } from '@/contexts/AuthContext';
import { mockBusinesses, mockPayments } from '@/data/mockData';
import { StatsCard } from '@/components/StatsCard';
import { Building2, Crown, CreditCard, TrendingUp } from 'lucide-react';

export default function SalesmanPerformance() {
  const { user } = useAuth();
  const myBusinesses = mockBusinesses.filter(b => b.createdBy === user?.id);
  const myPayments = mockPayments.filter(p => p.salesmanId === user?.id);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">My Performance</h1>
        <p className="text-muted-foreground">Track your field operations metrics</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Businesses" value={myBusinesses.length} icon={Building2} variant="primary" />
        <StatsCard title="Approved" value={myBusinesses.filter(b => b.status === 'approved').length} icon={TrendingUp} variant="success" />
        <StatsCard title="Premium Sold" value={myBusinesses.filter(b => b.listingType === 'premium' && b.status === 'approved').length} icon={Crown} variant="premium" />
        <StatsCard title="Revenue Collected" value={`₹${myPayments.filter(p => p.status === 'verified').reduce((s, p) => s + p.amount, 0).toLocaleString()}`} icon={CreditCard} variant="info" />
      </div>

      <div className="rounded-xl border bg-card card-shadow p-8 text-center">
        <p className="text-muted-foreground">Detailed performance charts and trends coming soon.</p>
      </div>
    </div>
  );
}
