import { KnowledgeArticle } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Video, GraduationCap, ExternalLink } from 'lucide-react';

interface ArticleCardProps {
  article: KnowledgeArticle;
  compact?: boolean;
}

const typeConfig = {
  article: { icon: FileText, label: 'Article', color: 'text-primary bg-primary/10' },
  video: { icon: Video, label: 'Video', color: 'text-chart-4 bg-chart-4/10' },
  training: { icon: GraduationCap, label: 'Training', color: 'text-success bg-success/10' },
  external: { icon: ExternalLink, label: 'External', color: 'text-muted-foreground bg-muted' },
};

export function ArticleCard({ article, compact = false }: ArticleCardProps) {
  const config = typeConfig[article.type];
  const Icon = config.icon;

  if (compact) {
    return (
      <a 
        href={article.url}
        className="flex items-center gap-3 p-3 border-2 border-border hover:border-primary transition-colors bg-card"
      >
        <div className={`flex h-8 w-8 items-center justify-center ${config.color.split(' ')[1]}`}>
          <Icon className={`h-4 w-4 ${config.color.split(' ')[0]}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{article.title}</p>
          <p className="text-xs text-muted-foreground">{article.source}</p>
        </div>
      </a>
    );
  }

  return (
    <Card className="border-2 border-border hover:border-primary transition-colors bg-card">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center ${config.color.split(' ')[1]}`}>
            <Icon className={`h-6 w-6 ${config.color.split(' ')[0]}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-medium uppercase tracking-wide ${config.color.split(' ')[0]}`}>
                {config.label}
              </span>
            </div>
            <h3 className="font-semibold text-foreground mb-1">{article.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{article.description}</p>
            <p className="text-xs text-muted-foreground mt-2">{article.source}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
