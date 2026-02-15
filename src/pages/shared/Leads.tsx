import { useState } from 'react';
import { useLeads, useUpdateLeadStatus } from '@/services/leadService';
import { StatusBadge } from '@/components/StatusBadge';
import { DataTableHeader } from '@/components/DataTableHeader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TableSkeleton } from '@/components/TableSkeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getUserName } from '@/data/mockData';
import type { Lead, LeadFilters } from '@/types';

export default function LeadsPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<LeadFilters>({ page: 1, limit: 20 });
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const { toast } = useToast();

  const { data, isLoading } = useLeads({ ...filters, search: search || undefined });
  const updateStatusMutation = useUpdateLeadStatus();

  const handleStatusChange = (id: string, status: Lead['status']) => {
    updateStatusMutation.mutate({ id, status }, {
      onSuccess: () => toast({ title: 'Lead Updated' }),
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Leads Management</h1>
        <p className="text-muted-foreground">Track and manage customer leads</p>
      </div>

      {/* Detail Modal */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Lead Details</DialogTitle></DialogHeader>
          {selectedLead && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><p className="text-muted-foreground">Customer Name</p><p className="font-medium">{selectedLead.customerName}</p></div>
                <div><p className="text-muted-foreground">Phone</p><p className="font-medium">{selectedLead.phone}</p></div>
                <div><p className="text-muted-foreground">Status</p><StatusBadge status={selectedLead.status} /></div>
                <div><p className="text-muted-foreground">Assigned To</p><p className="font-medium">{getUserName(selectedLead.assignedTo as string)}</p></div>
                <div className="col-span-2"><p className="text-muted-foreground">Message</p><p className="font-medium">{selectedLead.message}</p></div>
                <div><p className="text-muted-foreground">Created At</p><p className="font-medium">{new Date(selectedLead.createdAt).toLocaleString()}</p></div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
                  <TableCell className="text-muted-foreground">{getUserName(lead.assignedTo as string)}</TableCell>
                  <TableCell className="text-muted-foreground">{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex justify-end items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setSelectedLead(lead); setDetailOpen(true); }}>
                        <Info className="h-4 w-4" />
                      </Button>
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
