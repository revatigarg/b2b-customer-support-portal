import { useState, useMemo } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { CaseCard } from '@/components/cases/CaseCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockCases } from '@/lib/mockData';
import { CaseStatus, Urgency, CATEGORY_OPTIONS } from '@/lib/types';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, X } from 'lucide-react';

const STATUS_OPTIONS: { value: CaseStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'open', label: 'Open' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'pending', label: 'Pending' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
];

const URGENCY_FILTER_OPTIONS: { value: Urgency | 'all'; label: string }[] = [
  { value: 'all', label: 'All Urgencies' },
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'normal', label: 'Normal' },
  { value: 'low', label: 'Low' },
];

const CasesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<CaseStatus | 'all'>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<Urgency | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredCases = useMemo(() => {
    return mockCases.filter((caseData) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          caseData.caseNumber.toLowerCase().includes(query) ||
          caseData.description.toLowerCase().includes(query) ||
          caseData.company.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Status filter
      if (statusFilter !== 'all' && caseData.status !== statusFilter) {
        return false;
      }

      // Urgency filter
      if (urgencyFilter !== 'all' && caseData.urgency !== urgencyFilter) {
        return false;
      }

      // Category filter
      if (categoryFilter !== 'all' && caseData.category !== categoryFilter) {
        return false;
      }

      return true;
    }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [searchQuery, statusFilter, urgencyFilter, categoryFilter]);

  const hasActiveFilters = statusFilter !== 'all' || urgencyFilter !== 'all' || categoryFilter !== 'all' || searchQuery;

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setUrgencyFilter('all');
    setCategoryFilter('all');
  };

  return (
    <MainLayout title="My Cases" showSearch={false}>
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search cases by number, description, or company..."
            className="pl-10 bg-card border-2 border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button asChild className="gap-2">
          <Link to="/cases/new">
            <Plus className="h-4 w-4" />
            New Support Request
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Filter className="h-4 w-4 text-muted-foreground" />
        
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as CaseStatus | 'all')}>
          <SelectTrigger className="w-40 border-2 bg-card">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={urgencyFilter} onValueChange={(v) => setUrgencyFilter(v as Urgency | 'all')}>
          <SelectTrigger className="w-40 border-2 bg-card">
            <SelectValue placeholder="Urgency" />
          </SelectTrigger>
          <SelectContent>
            {URGENCY_FILTER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-52 border-2 bg-card">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORY_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
            <X className="h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground mb-4">
        Showing {filteredCases.length} case{filteredCases.length !== 1 ? 's' : ''}
      </p>

      {/* Cases List */}
      <div className="space-y-3">
        {filteredCases.length > 0 ? (
          filteredCases.map((caseData) => (
            <CaseCard key={caseData.id} caseData={caseData} />
          ))
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-border bg-card">
            <p className="text-muted-foreground mb-4">No cases found matching your criteria.</p>
            <Button asChild>
              <Link to="/cases/new">Create New Case</Link>
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CasesPage;
