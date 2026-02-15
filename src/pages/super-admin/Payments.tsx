import { mockPayments } from '@/data/mockData';
import { StatusBadge } from '@/components/StatusBadge';
import { StatsCard } from '@/components/StatsCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CreditCard, TrendingUp, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export default function PaymentsPage() {
  const { toast } = useToast();
  const totalRevenue = mockPayments.filter(p => p.status === 'verified').reduce((s, p) => s + p.amount, 0);
  const pendingAmount = mockPayments.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Payments & Revenue</h1>
        <p className="text-muted-foreground">Track manual payments and revenue across the platform</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={CreditCard} variant="success" />
        <StatsCard title="Pending Payments" value={`₹${pendingAmount.toLocaleString()}`} icon={TrendingUp} variant="warning" />
        <StatsCard title="Verified Payments" value={mockPayments.filter(p => p.status === 'verified').length} icon={CheckCircle} variant="info" />
      </div>

      <div className="rounded-xl border bg-card card-shadow overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business</TableHead>
              <TableHead>Salesman</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPayments.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.businessName}</TableCell>
                <TableCell className="text-muted-foreground">{p.salesmanName}</TableCell>
                <TableCell className="font-semibold">₹{p.amount.toLocaleString()}</TableCell>
                <TableCell><Badge variant="secondary" className="uppercase text-xs">{p.paymentMode}</Badge></TableCell>
                <TableCell><StatusBadge status={p.status} /></TableCell>
                <TableCell className="text-muted-foreground">{p.date}</TableCell>
                <TableCell>
                  <div className="flex justify-end">
                    {p.status === 'pending' && (
                      <Button variant="ghost" size="sm" className="text-success gap-1" onClick={() => toast({ title: 'Verified', description: `Payment for ${p.businessName} verified` })}>
                        <CheckCircle className="h-4 w-4" /> Verify
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
