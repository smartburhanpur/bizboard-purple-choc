import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  variant?: 'default' | 'primary' | 'premium' | 'success' | 'warning' | 'info';
}

const variantStyles = {
  default: 'bg-card card-shadow',
  primary: 'gradient-primary text-primary-foreground',
  premium: 'gradient-premium text-premium-foreground',
  success: 'bg-success/10 border-success/20',
  warning: 'bg-warning/10 border-warning/20',
  info: 'bg-info/10 border-info/20',
};

const iconVariants = {
  default: 'bg-primary/10 text-primary',
  primary: 'bg-primary-foreground/20 text-primary-foreground',
  premium: 'bg-premium-foreground/10 text-premium-foreground',
  success: 'bg-success/20 text-success',
  warning: 'bg-warning/20 text-warning',
  info: 'bg-info/20 text-info',
};

export function StatsCard({ title, value, icon: Icon, trend, variant = 'default' }: StatsCardProps) {
  return (
    <div className={`rounded-xl border p-5 transition-all hover:card-shadow-hover animate-fade-in ${variantStyles[variant]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm font-medium ${variant === 'primary' || variant === 'premium' ? 'opacity-80' : 'text-muted-foreground'}`}>
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold font-display">{value}</p>
          {trend && (
            <p className={`mt-1 text-xs font-medium ${variant === 'primary' || variant === 'premium' ? 'opacity-70' : 'text-success'}`}>
              {trend}
            </p>
          )}
        </div>
        <div className={`rounded-xl p-3 ${iconVariants[variant]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
