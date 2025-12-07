import { SearchResult } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Video, GraduationCap, ExternalLink, BookOpen } from 'lucide-react';
import { format } from 'date-fns';

interface SearchResultCardProps {
  result: SearchResult;
}

const typeConfig = {
  knowledge: { icon: FileText, label: 'Knowledge Article', color: 'text-primary' },
  case: { icon: BookOpen, label: 'Support Case', color: 'text-muted-foreground' },
  training: { icon: GraduationCap, label: 'Training', color: 'text-success' },
  video: { icon: Video, label: 'Video', color: 'text-chart-4' },
  external: { icon: ExternalLink, label: 'External', color: 'text-muted-foreground' },
};

export function SearchResultCard({ result }: SearchResultCardProps) {
  const config = typeConfig[result.type];
  const Icon = config.icon;

  return (
    <Card className="border-2 border-border hover:border-primary transition-colors cursor-pointer bg-card">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent">
            <Icon className={`h-5 w-5 ${config.color}`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-medium uppercase tracking-wide ${config.color}`}>
                {config.label}
              </span>
              <span className="text-xs text-muted-foreground">
                {result.source}
              </span>
            </div>
            
            <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
              {result.title}
            </h3>
            
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {result.snippet}
            </p>

            {result.date && (
              <span className="text-xs text-muted-foreground">
                Updated {format(result.date, 'MMM d, yyyy')}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
