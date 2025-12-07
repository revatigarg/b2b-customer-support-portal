import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchResultCard } from '@/components/search/SearchResultCard';
import { mockSearchResults } from '@/lib/mockData';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [searchedQuery, setSearchedQuery] = useState(initialQuery);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedQuery(query);
    setSearchParams(query ? {
      q: query
    } : {});
  };

  // Filter results based on query (simple mock search)
  const results = searchedQuery ? mockSearchResults.filter(r => r.title.toLowerCase().includes(searchedQuery.toLowerCase()) || r.snippet.toLowerCase().includes(searchedQuery.toLowerCase())) : mockSearchResults;
  const knowledgeResults = results.filter(r => r.type === 'knowledge');
  const trainingResults = results.filter(r => r.type === 'training');
  const videoResults = results.filter(r => r.type === 'video');
  return <MainLayout title="Search" showSearch={false}>
      {/* Search Header */}
      <div className="max-w-3xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Find Answers Across All Resources
        </h2>
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search knowledge base, training videos, documentation..." className="pl-12 pr-24 h-14 text-lg border-2 border-border focus:border-primary bg-card" value={query} onChange={e => setQuery(e.target.value)} />
          <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
            Search
          </Button>
        </form>
        <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
          <span>Searching across:</span>
          <span className="bg-secondary px-2 py-1">Knowledge Base</span>
          <span className="bg-secondary px-2 py-1">TM1 Docs</span>
          <span className="bg-secondary px-2 py-1">Training Videos</span>
          <span className="bg-secondary px-2 py-1">External Resources</span>
        </div>
      </div>

      {/* Results */}
      {searchedQuery && <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <p className="text-muted-foreground">
              {results.length} result{results.length !== 1 ? 's' : ''} for "{searchedQuery}"
            </p>
            <Button variant="outline" size="sm" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All ({results.length})</TabsTrigger>
              <TabsTrigger value="knowledge">Articles ({knowledgeResults.length})</TabsTrigger>
              <TabsTrigger value="training">Training ({trainingResults.length})</TabsTrigger>
              <TabsTrigger value="video">Videos ({videoResults.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3">
              {results.map(result => <SearchResultCard key={result.id} result={result} />)}
            </TabsContent>

            <TabsContent value="knowledge" className="space-y-3">
              {knowledgeResults.map(result => <SearchResultCard key={result.id} result={result} />)}
            </TabsContent>

            <TabsContent value="training" className="space-y-3">
              {trainingResults.map(result => <SearchResultCard key={result.id} result={result} />)}
            </TabsContent>

            <TabsContent value="video" className="space-y-3">
              {videoResults.map(result => <SearchResultCard key={result.id} result={result} />)}
            </TabsContent>
          </Tabs>
        </div>}

      {/* Empty State */}
      {!searchedQuery && <div className="max-w-2xl mx-auto text-center py-12">
          <div className="inline-flex h-16 w-16 items-center justify-center bg-accent mb-4">
            <Search className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Federated Search</h3>
          <p className="text-muted-foreground mb-6">Search across all knowledge sources in one place. 
Find articles, training materials, documentation.</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button variant="outline" size="sm" onClick={() => {
          setQuery('scanner troubleshooting');
        }}>mobile ticketing</Button>
            <Button variant="outline" size="sm" onClick={() => {
          setQuery('settlement reports');
        }}>settlement reports</Button>
            <Button variant="outline" size="sm" onClick={() => {
          setQuery('API rate limits');
        }}>pre-sale configuration</Button>
            <Button variant="outline" size="sm" onClick={() => {
          setQuery('event day checklist');
        }}>event day alert</Button>
          </div>
        </div>}
    </MainLayout>;
};
export default SearchPage;