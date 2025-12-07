import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SLACounterProps {
  deadline: Date;
  showIcon?: boolean;
  className?: string;
}

function calculateTimeRemaining(deadline: Date): { hours: number; minutes: number; isOverdue: boolean; isCritical: boolean } {
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();
  
  const isOverdue = diff < 0;
  const absDiff = Math.abs(diff);
  
  const hours = Math.floor(absDiff / (1000 * 60 * 60));
  const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
  
  // Critical if less than 1 hour remaining
  const isCritical = !isOverdue && diff < 1000 * 60 * 60;
  
  return { hours, minutes, isOverdue, isCritical };
}

export function SLACounter({ deadline, showIcon = true, className }: SLACounterProps) {
  const [timeRemaining, setTimeRemaining] = useState(() => calculateTimeRemaining(deadline));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(deadline));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [deadline]);

  const { hours, minutes, isOverdue, isCritical } = timeRemaining;

  return (
    <div className={cn(
      'inline-flex items-center gap-1.5 text-sm font-medium',
      isOverdue ? 'text-destructive' : isCritical ? 'text-warning' : 'text-muted-foreground',
      className
    )}>
      {showIcon && <Clock className="h-4 w-4" />}
      {isOverdue ? (
        <span>Overdue by {hours}h {minutes}m</span>
      ) : (
        <span>{hours}h {minutes}m remaining</span>
      )}
    </div>
  );
}
