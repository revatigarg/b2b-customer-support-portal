import { TaskGroup } from '@/lib/taskGroups';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Ticket, Settings, Calendar, DollarSign, Mail, 
  Scan, ClipboardCheck, Wrench, CheckCircle, 
  ListChecks, Megaphone, Users 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ticket: Ticket,
  settings: Settings,
  calendar: Calendar,
  dollar: DollarSign,
  mail: Mail,
  scan: Scan,
  'clipboard-check': ClipboardCheck,
  wrench: Wrench,
  'check-circle': CheckCircle,
  'list-checks': ListChecks,
  megaphone: Megaphone,
  users: Users,
};

interface TaskGroupCardProps {
  group: TaskGroup;
  onClick: () => void;
}

export function TaskGroupCard({ group, onClick }: TaskGroupCardProps) {
  const Icon = iconMap[group.icon] || Settings;

  return (
    <Card 
      onClick={onClick}
      className={cn(
        "cursor-pointer border-2 border-border bg-card hover:border-primary/50 hover:shadow-md transition-all",
        "group"
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {group.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {group.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
