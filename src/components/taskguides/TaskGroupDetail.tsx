import { TaskGroup, getArticlesForTaskGroup } from '@/lib/taskGroups';
import { ArticleCard } from '@/components/knowledge/ArticleCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { 
  Ticket, Settings, Calendar, DollarSign, Mail, 
  Scan, ClipboardCheck, Wrench, CheckCircle, 
  ListChecks, Megaphone, Users 
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

interface TaskGroupDetailProps {
  group: TaskGroup;
  onBack: () => void;
}

export function TaskGroupDetail({ group, onBack }: TaskGroupDetailProps) {
  const articles = getArticlesForTaskGroup(group.id);
  const Icon = iconMap[group.icon] || Settings;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onBack}
          className="shrink-0 mt-1"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">{group.title}</h1>
          </div>
          <p className="text-muted-foreground">{group.description}</p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-border bg-card rounded-lg">
          <p className="text-muted-foreground">No articles available for this task group yet.</p>
        </div>
      )}
    </div>
  );
}
