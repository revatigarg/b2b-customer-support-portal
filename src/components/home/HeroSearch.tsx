import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function HeroSearch() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const quickSearches = [
    'Scanner troubleshooting',
    'Presale setup',
    'Settlement reports',
    'API documentation',
  ];

  return (
    <div className="text-center space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          How can we help you today?
        </h1>
        <p className="text-muted-foreground">
          Search across all knowledge sources, documentation, and training materials
        </p>
      </div>

      <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for guides, troubleshooting, API docs, training videos..."
            className="pl-12 pr-24 h-14 text-lg border-2 border-primary/30 focus:border-primary bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            type="submit" 
            className="absolute right-2 top-1/2 -translate-y-1/2"
            disabled={!searchQuery.trim()}
          >
            Search
          </Button>
        </div>
      </form>

      <div className="flex flex-wrap justify-center gap-2">
        <span className="text-sm text-muted-foreground">Quick searches:</span>
        {quickSearches.map((term) => (
          <button
            key={term}
            onClick={() => navigate(`/search?q=${encodeURIComponent(term)}`)}
            className="text-sm text-primary hover:text-primary/80 underline-offset-2 hover:underline"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
