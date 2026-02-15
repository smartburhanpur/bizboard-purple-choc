import { useState } from 'react';
import { useLeads, useUpdateLeadStatus } from '@/services/leadService';
import { StatusBadge } from '@/components/StatusBadge';
import { DataTableHeader } from '@/components/DataTableHeader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TableSkeleton } from '@/components/TableSkeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { Lead, LeadFilters, User } from '@/types';

export default function LeadsPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<LeadFilters>({ page: 1, limit: 20 });
  const { toast } = useToast();

  const { data, isLoading } = useLeads({ ...filters, search: search || undefined });
  const updateStatusMutation = useUpdateLeadStatus();

  const handleStatusChange = (id: string, status: Lead['status']) => {
    updateStatusMutation.mutate({ id, status }, {
      onSuccess: () => toast({ title: 'Lead Updated' }),
      onError: (err: any) => toast({ title: 'Error', description: err?.response?.data?.message || 'Failed', variant: 'destructive' }),
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Leads Management</h1>
        <p className="text-muted-foreground">Track and manage customer leads</p>
      </div>

      <div className="rounded-xl border bg-card card-shadow">
        <div className="p-5 border-b border-border">
          <DataTableHeader
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search leads..."
            filters={[
              { key: 'status', label: 'Status', value: filters.status || 'all', onChange: (v) => setFilters(p => ({ ...p, status: v === 'all' ? undefined : v, page: 1 })), options: [{ value: 'new', label: 'New' }, { value: 'contacted', label: 'Contacted' }, { value: 'converted', label: 'Converted' }] },
            ]}
          />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? <TableSkeleton cols={7} /> : data?.data?.map((lead) => (
                <TableRow key={lead._id}>
                  <TableCell className="font-medium">{lead.customerName}</TableCell>
                  <TableCell className="text-muted-foreground">{lead.phone}</TableCell>
                  <TableCell className="text-muted-foreground max-w-[200px] truncate">{lead.message}</TableCell>
                  <TableCell><StatusBadge status={lead.status} /></TableCell>
                  <TableCell className="text-muted-foreground">{typeof lead.assignedTo === 'object' ? (lead.assignedTo as User).name : lead.assignedTo}</TableCell>
                  <TableCell className="text-muted-foreground">{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <Select value={lead.status} onValueChange={(v: Lead['status']) => handleStatusChange(lead._id, v)}>
                        <SelectTrigger className="w-[130px] h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="converted">Converted</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {!isLoading && (!data?.data || data.data.length === 0) && (
                <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No leads found</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {data?.pagination && data.pagination.totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-border">
            <p className="text-sm text-muted-foreground">Page {data.pagination.page} of {data.pagination.totalPages}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={data.pagination.page <= 1} onClick={() => setFilters(p => ({ ...p, page: (p.page || 1) - 1 }))}>Previous</Button>
              <Button variant="outline" size="sm" disabled={data.pagination.page >= data.pagination.totalPages} onClick={() => setFilters(p => ({ ...p, page: (p.page || 1) + 1 }))}>Next</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
