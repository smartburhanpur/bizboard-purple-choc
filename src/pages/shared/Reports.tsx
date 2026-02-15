import { BarChart3 } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground">Platform performance insights</p>
      </div>
      <div className="rounded-xl border bg-card card-shadow p-12 flex flex-col items-center justify-center text-center">
        <div className="rounded-xl bg-primary/10 p-4 mb-4">
          <BarChart3 className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-display font-semibold text-foreground text-lg">Coming Soon</h3>
        <p className="text-muted-foreground mt-1 max-w-md">
          Detailed analytics and reports will be available here. Charts, trends, and exportable data for business insights.
        </p>
      </div>
    </div>
  );
}
