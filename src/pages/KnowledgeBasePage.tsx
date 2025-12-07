import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArticleCard } from '@/components/knowledge/ArticleCard';
import { mockKnowledgeArticles } from '@/lib/mockData';
import { Search, BookOpen, Video, GraduationCap, FileText, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const categories = [
  { id: 'all', label: 'All', icon: BookOpen },
  { id: 'article', label: 'Articles', icon: FileText },
  { id: 'video', label: 'Videos', icon: Video },
  { id: 'training', label: 'Training', icon: GraduationCap },
  { id: 'external', label: 'External', icon: ExternalLink },
];

const featuredTopics = [
  { title: 'Getting Started Guide', count: 12 },
  { title: 'Event-Day Operations', count: 8 },
  { title: 'API Integration', count: 15 },
  { title: 'Settlement & Payments', count: 6 },
  { title: 'Scanner Troubleshooting', count: 9 },
  { title: 'Best Practices', count: 11 },
];

const KnowledgeBasePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredArticles = mockKnowledgeArticles.filter((article) => {
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || article.type === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout title="Knowledge Base" showSearch={false}>
      {/* Search */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search knowledge base..."
            className="pl-12 h-12 text-lg border-2 border-border bg-card"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <Button
              key={cat.id}
              variant={isActive ? 'default' : 'outline'}
              onClick={() => setActiveCategory(cat.id)}
              className="gap-2"
            >
              <Icon className="h-4 w-4" />
              {cat.label}
            </Button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-border bg-card">
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-2 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">Popular Topics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {featuredTopics.map((topic) => (
                <a
                  key={topic.title}
                  href="#"
                  className="flex items-center justify-between p-2 text-sm hover:bg-secondary transition-colors"
                >
                  <span>{topic.title}</span>
                  <span className="text-muted-foreground">{topic.count}</span>
                </a>
              ))}
            </CardContent>
          </Card>

          <Card className="border-2 border-primary bg-accent/30">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Can't find what you need?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our support team is here to help with any questions.
              </p>
              <Button asChild className="w-full">
                <a href="/cases/new">Submit a Request</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default KnowledgeBasePage;
