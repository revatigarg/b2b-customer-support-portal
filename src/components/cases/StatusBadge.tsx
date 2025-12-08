import { cn } from '@/lib/utils';
import { CaseStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: CaseStatus;
  size?: 'sm' | 'md';
}

const statusConfig: Record<CaseStatus, { label: string; className: string }> = {
  'open': {
    label: 'Open',
    className: 'bg-secondary text-foreground border border-border',
  },
  'in-progress': {
    label: 'In Progress',
    className: 'bg-primary/10 text-primary border border-primary/20',
  },
  'pending': {
    label: 'Pending',
    className: 'bg-secondary text-muted-foreground border border-border',
  },
  'resolved': {
    label: 'Resolved',
    className: 'bg-secondary text-muted-foreground border border-border',
  },
  'closed': {
    label: 'Closed',
    className: 'bg-muted text-muted-foreground border border-border',
  },
};

const sizeConfig = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span className={cn(
      'inline-flex items-center font-medium',
      config.className,
      sizeConfig[size]
    )}>
      {config.label}
    </span>
  );
}
