import { MainLayout } from '@/components/layout/MainLayout';
import { Input } from '@/components/ui/input';
import { TaskGroupCard } from '@/components/taskguides/TaskGroupCard';
import { TaskGroupDetail } from '@/components/taskguides/TaskGroupDetail';
import { taskGroups, getTaskGroupById, getAllArticles } from '@/lib/taskGroups';
import { ArticleCard } from '@/components/knowledge/ArticleCard';
import { Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useLocale } from '@/contexts/LocaleContext';

const TaskGuidesPage = () => {
  const { t } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  const selectedGroup = selectedGroupId ? getTaskGroupById(selectedGroupId) : null;

  // Get task groups by persona
  const eventOrganizerGroups = taskGroups.filter(g => g.persona === 'event-organizer');
  const venueOpsGroups = taskGroups.filter(g => g.persona === 'venue-ops');
  const promoterGroups = taskGroups.filter(g => g.persona === 'promoter');

  // Search across all articles when query exists
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return getAllArticles().filter(
      article => 
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  const handleBack = () => {
    setSelectedGroupId(null);
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-foreground">Task Guides</h1>

        {/* Search - Always visible */}
        <div className="max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t('searchKnowledgeBase') || 'Search task guides...'}
              className="pl-12 h-12 text-lg border-2 border-border bg-card"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                // Clear selected group when searching
                if (e.target.value.trim()) {
                  setSelectedGroupId(null);
                }
              }}
            />
          </div>
        </div>

        {/* Search Results */}
        {isSearching && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              Search Results ({searchResults.length})
            </h2>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-border bg-card rounded-lg">
                <p className="text-muted-foreground">
                  {t('noArticlesFound') || 'No articles found matching your search.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Task Group Detail View */}
        {!isSearching && selectedGroup && (
          <TaskGroupDetail group={selectedGroup} onBack={handleBack} />
        )}

        {/* Task Groups Grid View */}
        {!isSearching && !selectedGroup && (
          <div className="space-y-10">
            {/* For Event Organizers */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                For Event Organizers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {eventOrganizerGroups.map((group) => (
                  <TaskGroupCard 
                    key={group.id} 
                    group={group} 
                    onClick={() => setSelectedGroupId(group.id)}
                  />
                ))}
              </div>
            </section>

            {/* For Venue Operations */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                For Venue Operations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {venueOpsGroups.map((group) => (
                  <TaskGroupCard 
                    key={group.id} 
                    group={group} 
                    onClick={() => setSelectedGroupId(group.id)}
                  />
                ))}
              </div>
            </section>

            {/* For Promoters / Agents */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                For Promoters / Agents
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {promoterGroups.map((group) => (
                  <TaskGroupCard 
                    key={group.id} 
                    group={group} 
                    onClick={() => setSelectedGroupId(group.id)}
                  />
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default TaskGuidesPage;
