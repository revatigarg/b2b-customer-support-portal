import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Ticket, Calendar, DollarSign, ScanLine, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskTileProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: 'primary' | 'secondary' | 'accent' | 'warning' | 'success';
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ticket: Ticket,
  calendar: Calendar,
  dollar: DollarSign,
  scan: ScanLine,
  book: BookOpen,
};

const colorMap: Record<string, string> = {
  primary: 'border-primary/50 hover:border-primary bg-primary/5 hover:bg-primary/10',
  secondary: 'border-secondary/50 hover:border-secondary bg-secondary/20 hover:bg-secondary/30',
  accent: 'border-accent/50 hover:border-accent bg-accent/5 hover:bg-accent/10',
  warning: 'border-warning/50 hover:border-warning bg-warning/5 hover:bg-warning/10',
  success: 'border-success/50 hover:border-success bg-success/5 hover:bg-success/10',
};

const iconColorMap: Record<string, string> = {
  primary: 'text-primary',
  secondary: 'text-foreground',
  accent: 'text-accent',
  warning: 'text-warning',
  success: 'text-success',
};

export function TaskTile({ title, description, icon, href, color }: TaskTileProps) {
  const IconComponent = iconMap[icon] || BookOpen;

  return (
    <Link to={href}>
      <Card className={cn(
        'border-2 transition-all duration-200 cursor-pointer h-full',
        colorMap[color]
      )}>
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className={cn('shrink-0', iconColorMap[color])}>
              <IconComponent className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
