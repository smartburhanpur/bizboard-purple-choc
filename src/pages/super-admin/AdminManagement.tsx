import { useState } from 'react';
import { useUsers, useToggleBlockUser, useCreateUser } from '@/services/userService';
import { StatusBadge } from '@/components/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TableSkeleton } from '@/components/TableSkeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UserPlus, Ban, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DataTableHeader } from '@/components/DataTableHeader';
import type { UserFilters } from '@/types';

export default function AdminManagement() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<UserFilters>({ page: 1, limit: 20, role: 'admin' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', mobile: '', email: '', role: 'admin' as const });
  const { toast } = useToast();

  const { data, isLoading } = useUsers({ ...filters, search: search || undefined });
  const toggleBlockMutation = useToggleBlockUser();
  const createMutation = useCreateUser();

  const handleToggleBlock = (id: string, name: string) => {
    toggleBlockMutation.mutate(id, {
      onSuccess: () => toast({ title: 'Updated', description: `${name} status updated` }),
      onError: (err: any) => toast({ title: 'Error', description: err?.response?.data?.message || 'Failed', variant: 'destructive' }),
    });
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData, {
      onSuccess: () => {
        toast({ title: 'Admin Created', description: `${formData.name} has been created` });
        setDialogOpen(false);
        setFormData({ name: '', mobile: '', email: '', role: 'admin' });
      },
      onError: (err: any) => toast({ title: 'Error', description: err?.response?.data?.message || 'Failed', variant: 'destructive' }),
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Admin Management</h1>
          <p className="text-muted-foreground">Manage administrators and their access</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground gap-2">
              <UserPlus className="h-4 w-4" /> Create Admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Admin</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <Label>Mobile</Label>
                <Input value={formData.mobile} onChange={e => setFormData(p => ({ ...p, mobile: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} required />
              </div>
              <Button type="submit" className="w-full gradient-primary text-primary-foreground" disabled={createMutation.isPending}>
                {createMutation.isPending ? 'Creating...' : 'Create Admin'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-xl border bg-card card-shadow">
        <div className="p-5 border-b border-border">
          <DataTableHeader searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search admins..." />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? <TableSkeleton cols={6} /> : data?.data?.map((a) => (
                <TableRow key={a._id}>
                  <TableCell className="font-medium">{a.name}</TableCell>
                  <TableCell className="text-muted-foreground">{a.email}</TableCell>
                  <TableCell className="text-muted-foreground">{a.mobile}</TableCell>
                  <TableCell><StatusBadge status={a.status} /></TableCell>
                  <TableCell className="text-muted-foreground">{new Date(a.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm" className={a.status === 'active' ? 'text-destructive' : 'text-success'}
                        onClick={() => handleToggleBlock(a._id, a.name)} disabled={toggleBlockMutation.isPending}>
                        {a.status === 'active' ? <Ban className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {!isLoading && (!data?.data || data.data.length === 0) && (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No admins found</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
