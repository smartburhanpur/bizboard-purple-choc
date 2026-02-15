import { mockSalesmen, mockBusinesses, mockPayments } from '@/data/mockData';
import { StatusBadge } from '@/components/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { UserPlus, Ban, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SalesmenManagement() {
  const { toast } = useToast();

  const getPerformance = (id: string) => {
    const businesses = mockBusinesses.filter(b => b.createdBy === id);
    const payments = mockPayments.filter(p => p.salesmanId === id);
    return {
      total: businesses.length,
      approved: businesses.filter(b => b.status === 'approved').length,
      premiumSold: businesses.filter(b => b.listingType === 'premium' && b.status === 'approved').length,
      collected: payments.filter(p => p.status === 'verified').reduce((s, p) => s + p.amount, 0),
    };
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Salesman Management</h1>
          <p className="text-muted-foreground">Manage field sales agents and track performance</p>
        </div>
        <Button className="gradient-primary text-primary-foreground gap-2">
          <UserPlus className="h-4 w-4" /> Add Salesman
        </Button>
      </div>

      <div className="rounded-xl border bg-card card-shadow overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Businesses</TableHead>
              <TableHead>Premium Sold</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockSalesmen.map((s) => {
              const perf = getPerformance(s.id);
              return (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className="text-muted-foreground">{s.email}</TableCell>
                  <TableCell className="text-muted-foreground">{s.phone}</TableCell>
                  <TableCell><StatusBadge status={s.status} /></TableCell>
                  <TableCell>{perf.total} ({perf.approved} approved)</TableCell>
                  <TableCell>{perf.premiumSold}</TableCell>
                  <TableCell className="font-medium">₹{perf.collected.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost" size="sm"
                        className={s.status === 'active' ? 'text-destructive' : 'text-success'}
                        onClick={() => toast({ title: s.status === 'active' ? 'Blocked' : 'Unblocked', description: `${s.name} has been ${s.status === 'active' ? 'blocked' : 'unblocked'}` })}
                      >
                        {s.status === 'active' ? <Ban className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
