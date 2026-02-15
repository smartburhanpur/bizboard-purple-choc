import { mockAdmins } from '@/data/mockData';
import { StatusBadge } from '@/components/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { UserPlus, Ban, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminManagement() {
  const { toast } = useToast();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Admin Management</h1>
          <p className="text-muted-foreground">Manage administrators and their access</p>
        </div>
        <Button className="gradient-primary text-primary-foreground gap-2">
          <UserPlus className="h-4 w-4" /> Create Admin
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
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAdmins.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-medium">{a.name}</TableCell>
                <TableCell className="text-muted-foreground">{a.email}</TableCell>
                <TableCell className="text-muted-foreground">{a.phone}</TableCell>
                <TableCell><StatusBadge status={a.status} /></TableCell>
                <TableCell className="text-muted-foreground">{a.createdAt}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="sm" className={a.status === 'active' ? 'text-destructive' : 'text-success'}
                      onClick={() => toast({ title: a.status === 'active' ? 'Blocked' : 'Unblocked', description: `${a.name}` })}>
                      {a.status === 'active' ? <Ban className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                    </Button>
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
