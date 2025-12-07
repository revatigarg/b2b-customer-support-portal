import { Link } from 'react-router-dom';
import { taskGroups, TaskGroup } from '@/lib/taskGroups';
import { useLocale } from '@/contexts/LocaleContext';
import { 
  Ticket, Settings, Calendar, DollarSign, Mail, 
  Scan, ClipboardCheck, Wrench, CheckCircle, 
  ListChecks, Megaphone, Users, ChevronRight
} from 'lucide-react';

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

interface FeaturedTasksProps {
  persona?: TaskGroup['persona'];
  userName?: string;
}

export function FeaturedTasks({ persona = 'event-organizer', userName = 'Rachel' }: FeaturedTasksProps) {
  const { t } = useLocale();
  
  // Filter tasks by persona
  const personaTasks = taskGroups.filter(group => group.persona === persona);

  return (
    <div className="w-full bg-secondary/30 border-y border-border">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Featured Tasks for {userName}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Quick access to common workflows for Event Organizers
            </p>
          </div>
          <Link 
            to="/task-guides" 
            className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1"
          >
            View all tasks
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {personaTasks.map((task) => {
            const Icon = iconMap[task.icon] || Settings;
            return (
              <Link
                key={task.id}
                to={`/task-guides?group=${task.id}`}
                className="group flex flex-col items-center p-4 bg-card border-2 border-border hover:border-primary/50 hover:shadow-md transition-all text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-sm text-foreground leading-tight">
                  {task.title}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
