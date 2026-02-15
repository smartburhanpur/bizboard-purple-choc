import { useAuth } from '@/contexts/AuthContext';
import { useDashboardStats } from '@/services/dashboardService';
import { StatsCard } from '@/components/StatsCard';
import { StatsSkeleton } from '@/components/TableSkeleton';
import { Building2, Crown, CreditCard, TrendingUp } from 'lucide-react';

export default function SalesmanPerformance() {
  const { user } = useAuth();
  const { data: stats, isLoading } = useDashboardStats('salesman');

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">My Performance</h1>
        <p className="text-muted-foreground">Track your field operations metrics</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? <StatsSkeleton count={4} /> : stats && (
          <>
            <StatsCard title="Total Businesses" value={stats.totalBusinesses} icon={Building2} variant="primary" />
            <StatsCard title="Approved" value={stats.premiumListings} icon={TrendingUp} variant="success" />
            <StatsCard title="Premium Sold" value={stats.premiumRequests} icon={Crown} variant="premium" />
            <StatsCard title="Revenue Collected" value={`₹${(stats.totalRevenue || 0).toLocaleString()}`} icon={CreditCard} variant="info" />
          </>
        )}
      </div>

      <div className="rounded-xl border bg-card card-shadow p-8 text-center">
        <p className="text-muted-foreground">Detailed performance charts will be rendered from API data.</p>
      </div>
    </div>
  );
}
