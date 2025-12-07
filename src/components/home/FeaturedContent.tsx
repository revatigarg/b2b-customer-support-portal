import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArticleCard } from '@/components/knowledge/ArticleCard';
import { KnowledgeArticle } from '@/lib/types';

interface FeaturedContentProps {
  articles: KnowledgeArticle[];
  title?: string;
}

export function FeaturedContent({ articles, title = "Recommended for You" }: FeaturedContentProps) {
  return (
    <Card className="border-2 border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} compact />
        ))}
      </CardContent>
    </Card>
  );
}
