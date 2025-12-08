import { cn } from '@/lib/utils';
import { CaseStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: CaseStatus;
  size?: 'sm' | 'md';
}

const statusConfig: Record<CaseStatus, { label: string; className: string }> = {
  'open': {
    label: 'Open',
    className: 'bg-amber-500/10 text-amber-600 border border-amber-500/20',
  },
  'in-progress': {
    label: 'In Progress',
    className: 'bg-sky-500/10 text-sky-600 border border-sky-500/20',
  },
  'pending': {
    label: 'Pending',
    className: 'bg-blue-600/10 text-blue-600 border border-blue-600/20',
  },
  'resolved': {
    label: 'Resolved',
    className: 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20',
  },
  'closed': {
    label: 'Closed',
    className: 'bg-gray-400/10 text-gray-500 border border-gray-400/20',
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
