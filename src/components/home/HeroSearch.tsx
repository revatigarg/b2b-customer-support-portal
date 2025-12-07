import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import heroBg from '@/assets/hero-bg.jpg';

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
    <div 
      className="relative w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Content */}
      <div className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How can we help you today?
            </h1>
            <p className="text-lg text-white/80">
              Search across all knowledge sources, documentation, and training materials
            </p>
          </div>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for guides, troubleshooting, API docs, training videos..."
                className="pl-12 pr-28 h-14 text-lg border-0 bg-white shadow-lg"
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

          <div className="flex flex-wrap justify-center gap-3">
            <span className="text-sm text-white/70">Quick searches:</span>
            {quickSearches.map((term) => (
              <button
                key={term}
                onClick={() => navigate(`/search?q=${encodeURIComponent(term)}`)}
                className="px-4 py-1.5 text-sm font-medium text-white bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
