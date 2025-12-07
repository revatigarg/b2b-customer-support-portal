import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  Search, 
  BookOpen, 
  Video, 
  FileText, 
  Phone 
} from 'lucide-react';

const actions = [
  {
    title: 'New Support Request',
    description: 'Submit a new case',
    icon: Plus,
    href: '/cases/new',
    primary: true,
  },
  {
    title: 'Search Knowledge',
    description: 'Find answers fast',
    icon: Search,
    href: '/search',
  },
  {
    title: 'Training Videos',
    description: 'Watch tutorials',
    icon: Video,
    href: '/knowledge?type=video',
  },
  {
    title: 'Documentation',
    description: 'Browse TM1 docs',
    icon: BookOpen,
    href: '/knowledge?type=docs',
  },
  {
    title: 'Event-Day Checklist',
    description: 'Pre-event prep',
    icon: FileText,
    href: '/knowledge/event-day-checklist',
  },
  {
    title: 'Emergency Hotline',
    description: 'For critical issues',
    icon: Phone,
    href: 'tel:+1-800-555-0123',
  },
];

export function QuickActions() {
  return (
    <Card className="border-2 border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.title}
              to={action.href}
              className={`flex items-start gap-3 p-3 border-2 transition-all hover:-translate-y-0.5 ${
                action.primary 
                  ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90' 
                  : 'bg-card border-border hover:border-primary'
              }`}
            >
              <Icon className={`h-5 w-5 shrink-0 ${action.primary ? '' : 'text-primary'}`} />
              <div>
                <p className={`text-sm font-medium ${action.primary ? '' : 'text-foreground'}`}>
                  {action.title}
                </p>
                <p className={`text-xs ${action.primary ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {action.description}
                </p>
              </div>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
