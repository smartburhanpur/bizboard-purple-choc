import { useState, useMemo } from 'react';
import { mockBusinesses } from '@/data/mockData';
import { StatusBadge, ListingTypeBadge } from '@/components/StatusBadge';
import { DataTableHeader } from '@/components/DataTableHeader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PendingApprovals() {
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  const pending = useMemo(() => {
    return mockBusinesses
      .filter(b => b.status === 'pending')
      .filter(b => b.name.toLowerCase().includes(search.toLowerCase()) || b.createdByName.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

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
                <TableHead>Salesman</TableHead>
                <TableHead>Type Requested</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Mode</TableHead>
                <TableHead>Payment Status</TableHead>
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
                  <TableCell className="font-semibold">₹{b.paymentAmount.toLocaleString()}</TableCell>
                  <TableCell className="uppercase text-xs font-medium text-muted-foreground">{b.paymentMode}</TableCell>
                  <TableCell><StatusBadge status={b.paymentStatus} /></TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90 gap-1" onClick={() => toast({ title: 'Approved' })}>
                        <Check className="h-3.5 w-3.5" /> Approve
                      </Button>
                      <Button size="sm" variant="outline" className="text-destructive border-destructive/30 gap-1" onClick={() => toast({ title: 'Rejected' })}>
                        <X className="h-3.5 w-3.5" /> Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {pending.length === 0 && (
                <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No pending approvals</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
