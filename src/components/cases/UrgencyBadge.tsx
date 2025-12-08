import { cn } from '@/lib/utils';
import { Urgency } from '@/lib/types';
import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';

interface UrgencyBadgeProps {
  urgency: Urgency;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const urgencyConfig = {
  critical: {
    label: 'Critical',
    icon: AlertTriangle,
    className: 'bg-destructive/10 text-destructive border border-destructive/20',
  },
  high: {
    label: 'High',
    icon: AlertCircle,
    className: 'bg-secondary text-foreground border border-border',
  },
  normal: {
    label: 'Normal',
    icon: Info,
    className: 'bg-secondary text-muted-foreground border border-border',
  },
  low: {
    label: 'Low',
    icon: CheckCircle,
    className: 'bg-secondary text-muted-foreground border border-border',
  },
};

const sizeConfig = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5',
};

export function UrgencyBadge({ urgency, showLabel = true, size = 'md' }: UrgencyBadgeProps) {
  const config = urgencyConfig[urgency];
  const Icon = config.icon;

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 font-medium',
      config.className,
      sizeConfig[size]
    )}>
      <Icon className={cn(
        size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5'
      )} />
      {showLabel && config.label}
    </span>
  );
}
