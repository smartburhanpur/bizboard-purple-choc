import { Badge } from '@/components/ui/badge';

type StatusType = 'pending' | 'approved' | 'rejected' | 'verified' | 'active' | 'blocked';

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'bg-warning/15 text-warning border-warning/30 hover:bg-warning/20' },
  approved: { label: 'Approved', className: 'bg-success/15 text-success border-success/30 hover:bg-success/20' },
  rejected: { label: 'Rejected', className: 'bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/20' },
  verified: { label: 'Verified', className: 'bg-success/15 text-success border-success/30 hover:bg-success/20' },
  active: { label: 'Active', className: 'bg-success/15 text-success border-success/30 hover:bg-success/20' },
  blocked: { label: 'Blocked', className: 'bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/20' },
};

export function StatusBadge({ status }: { status: StatusType }) {
  const config = statusConfig[status];
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}

export function PremiumBadge() {
  return (
    <Badge className="gradient-premium text-premium-foreground border-0 font-semibold">
      ★ Premium
    </Badge>
  );
}

export function ListingTypeBadge({ type }: { type: 'normal' | 'premium' }) {
  if (type === 'premium') return <PremiumBadge />;
  return <Badge variant="secondary">Normal</Badge>;
}
