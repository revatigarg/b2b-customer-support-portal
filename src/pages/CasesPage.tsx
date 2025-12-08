import { useState, useMemo } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { CaseCard } from '@/components/cases/CaseCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { mockCases } from '@/lib/mockData';
import { CaseStatus, Urgency, CATEGORY_OPTIONS, CaseSource } from '@/lib/types';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, X, Mail, Phone, Globe } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';
const STATUS_OPTIONS: {
  value: CaseStatus | 'all';
  label: string;
}[] = [{
  value: 'all',
  label: 'All Statuses'
}, {
  value: 'open',
  label: 'Open'
}, {
  value: 'in-progress',
  label: 'In Progress'
}, {
  value: 'pending',
  label: 'Pending'
}, {
  value: 'resolved',
  label: 'Resolved'
}, {
  value: 'closed',
  label: 'Closed'
}];
const URGENCY_FILTER_OPTIONS: {
  value: Urgency | 'all';
  label: string;
}[] = [{
  value: 'all',
  label: 'All Urgencies'
}, {
  value: 'critical',
  label: 'Critical'
}, {
  value: 'high',
  label: 'High'
}, {
  value: 'normal',
  label: 'Normal'
}, {
  value: 'low',
  label: 'Low'
}];
const SOURCE_FILTER_OPTIONS: {
  value: CaseSource | 'all';
  label: string;
  icon: React.ReactNode;
}[] = [{
  value: 'all',
  label: 'All Sources',
  icon: null
}, {
  value: 'portal',
  label: 'Portal',
  icon: <Globe className="h-3.5 w-3.5" />
}, {
  value: 'email',
  label: 'Email',
  icon: <Mail className="h-3.5 w-3.5" />
}, {
  value: 'phone',
  label: 'Phone',
  icon: <Phone className="h-3.5 w-3.5" />
}];
const CasesPage = () => {
  const {
    t,
    isAccountManager
  } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<CaseStatus | 'all'>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<Urgency | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<CaseSource | 'all'>('all');
  const filteredCases = useMemo(() => {
    return mockCases.filter(caseData => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = caseData.caseNumber.toLowerCase().includes(query) || caseData.description.toLowerCase().includes(query) || caseData.company.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = caseData.caseNumber.toLowerCase().includes(query) || caseData.description.toLowerCase().includes(query) || caseData.company.toLowerCase().includes(query);
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

      // Source filter
      if (sourceFilter !== 'all' && caseData.source !== sourceFilter) {
        return false;
      }
      return true;
    }).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }, [searchQuery, statusFilter, urgencyFilter, categoryFilter, sourceFilter]);
  const hasActiveFilters = statusFilter !== 'all' || urgencyFilter !== 'all' || categoryFilter !== 'all' || sourceFilter !== 'all' || searchQuery;
  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setUrgencyFilter('all');
    setCategoryFilter('all');
    setSourceFilter('all');
  };

  // Status counts - always show true totals across all cases
  const statusCounts = useMemo(() => {
    return {
      all: mockCases.length,
      open: mockCases.filter(c => c.status === 'open').length,
      'in-progress': mockCases.filter(c => c.status === 'in-progress').length,
      pending: mockCases.filter(c => c.status === 'pending').length,
      resolved: mockCases.filter(c => c.status === 'resolved').length,
      closed: mockCases.filter(c => c.status === 'closed').length
    };
  }, []);
  const statusTabs = [{
    value: 'all',
    label: 'All',
    color: 'bg-foreground'
  }, {
    value: 'open',
    label: 'Open',
    color: 'bg-amber-500'
  }, {
    value: 'in-progress',
    label: 'In Progress',
    color: 'bg-sky-500'
  }, {
    value: 'pending',
    label: 'Pending',
    color: 'bg-blue-600'
  }, {
    value: 'resolved',
    label: 'Resolved',
    color: 'bg-emerald-500'
  }, {
    value: 'closed',
    label: 'Closed',
    color: 'bg-gray-400'
  }];
  return <MainLayout title={t('myCases')} showSearch={false}>
      {/* Page Title and CTA */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-foreground">My Cases</h1>
        <Button asChild className="bg-foreground text-background hover:bg-foreground/90">
          <Link to="/cases/new">+ New Case</Link>
        </Button>
      </div>

      {/* Status Filter Tabs with Dots */}
      <div className="flex flex-wrap items-center gap-1 mb-6 border-b border-border pb-4">
        {statusTabs.map(tab => {
        const count = statusCounts[tab.value as keyof typeof statusCounts] || 0;
        const isActive = statusFilter === tab.value;
        return <button key={tab.value} onClick={() => setStatusFilter(tab.value as CaseStatus | 'all')} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors ${isActive ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
              {tab.value !== 'all' && <span className={`w-2 h-2 rounded-full ${tab.color}`} />}
              <span>{tab.label}</span>
              <span className="text-muted-foreground">({count})</span>
            </button>;
      })}
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input type="search" placeholder="Search cases by number, description, or company..." className="pl-10 bg-card border-2 border-border" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Filter className="h-4 w-4 text-muted-foreground" />

        <Select value={urgencyFilter} onValueChange={v => setUrgencyFilter(v as Urgency | 'all')}>
          <SelectTrigger className="w-40 border-2 bg-card">
            <SelectValue placeholder="Urgency" />
          </SelectTrigger>
          <SelectContent>
            {URGENCY_FILTER_OPTIONS.map(option => <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>)}
          </SelectContent>
        </Select>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-52 border-2 bg-card">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORY_OPTIONS.map(option => <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>)}
          </SelectContent>
        </Select>

        <Select value={sourceFilter} onValueChange={v => setSourceFilter(v as CaseSource | 'all')}>
          <SelectTrigger className="w-36 border-2 bg-card">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            {SOURCE_FILTER_OPTIONS.map(option => <SelectItem key={option.value} value={option.value}>
                <span className="flex items-center gap-2">
                  {option.icon}
                  {option.label}
                </span>
              </SelectItem>)}
          </SelectContent>
        </Select>

        {hasActiveFilters && <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
            <X className="h-4 w-4" />
            Clear Filters
          </Button>}
      </div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground mb-4">
        Showing {filteredCases.length} case{filteredCases.length !== 1 ? 's' : ''}
      </p>

      {/* Cases List */}
      <div className="bg-card border border-border rounded-lg overflow-hidden divide-y divide-border">
        {filteredCases.length > 0 ? filteredCases.map(caseData => <CaseCard key={caseData.id} caseData={caseData} />) : <div className="text-center py-12 border-2 border-dashed border-border bg-card">
            <p className="text-muted-foreground mb-4">
              No cases matching your criteria.
            </p>
            <Button asChild className="bg-foreground text-background hover:bg-foreground/90">
              <Link to="/cases/new">+ New Case</Link>
            </Button>
          </div>}
      </div>
    </MainLayout>;
};
export default CasesPage;