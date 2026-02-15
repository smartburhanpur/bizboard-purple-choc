import { useState, useMemo } from 'react';
import { mockBusinesses, mockCategories, mockCities } from '@/data/mockData';
import { StatusBadge, ListingTypeBadge } from '@/components/StatusBadge';
import { DataTableHeader } from '@/components/DataTableHeader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Check, X, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AllBusinessesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const { toast } = useToast();

  const filtered = useMemo(() => {
    return mockBusinesses.filter((b) => {
      const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.category.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || b.status === statusFilter;
      const matchType = typeFilter === 'all' || b.listingType === typeFilter;
      const matchCity = cityFilter === 'all' || b.city === cityFilter;
      return matchSearch && matchStatus && matchType && matchCity;
    });
  }, [search, statusFilter, typeFilter, cityFilter]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">All Businesses</h1>
        <p className="text-muted-foreground">Manage all business listings across the platform</p>
      </div>

      <div className="rounded-xl border bg-card card-shadow">
        <div className="p-5 border-b border-border">
          <DataTableHeader
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search businesses..."
            filters={[
              { key: 'status', label: 'Status', value: statusFilter, onChange: setStatusFilter, options: [{ value: 'pending', label: 'Pending' }, { value: 'approved', label: 'Approved' }, { value: 'rejected', label: 'Rejected' }] },
              { key: 'type', label: 'Type', value: typeFilter, onChange: setTypeFilter, options: [{ value: 'normal', label: 'Normal' }, { value: 'premium', label: 'Premium' }] },
              { key: 'city', label: 'City', value: cityFilter, onChange: setCityFilter, options: mockCities.map(c => ({ value: c, label: c })) },
            ]}
          />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Salesman</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.name}</TableCell>
                  <TableCell className="text-muted-foreground">{b.category}</TableCell>
                  <TableCell className="text-muted-foreground">{b.city}</TableCell>
                  <TableCell><ListingTypeBadge type={b.listingType} /></TableCell>
                  <TableCell><StatusBadge status={b.status} /></TableCell>
                  <TableCell><StatusBadge status={b.paymentStatus} /></TableCell>
                  <TableCell className="text-muted-foreground">{b.createdByName}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                      {b.status === 'pending' && (
                        <>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-success hover:text-success" onClick={() => toast({ title: 'Approved', description: `${b.name} has been approved` })}><Check className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => toast({ title: 'Rejected', description: `${b.name} has been rejected` })}><X className="h-4 w-4" /></Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No businesses found</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
