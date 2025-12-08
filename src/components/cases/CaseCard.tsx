import { Link } from 'react-router-dom';
import { Case, CATEGORY_OPTIONS } from '@/lib/types';
import { UrgencyBadge } from './UrgencyBadge';
import { StatusBadge } from './StatusBadge';
import { ChevronRight, Mail, Phone, Globe } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';
import { Button } from '@/components/ui/button';

interface CaseCardProps {
  caseData: Case;
}

// Get source icon and label
function getSourceInfo(source: Case['source']): { icon: React.ReactNode; label: string } {
  switch (source) {
    case 'email':
      return { icon: <Mail className="h-3 w-3" />, label: 'Email' };
    case 'phone':
      return { icon: <Phone className="h-3 w-3" />, label: 'Phone' };
    default:
      return { icon: <Globe className="h-3 w-3" />, label: 'Portal' };
  }
}

export function CaseCard({ caseData }: CaseCardProps) {
  const { formatDate } = useLocale();
  const categoryLabel = CATEGORY_OPTIONS.find(c => c.value === caseData.category)?.label || caseData.category;
  const sourceInfo = getSourceInfo(caseData.source);
  
  // Parse date for display
  const date = new Date(caseData.createdAt);
  const monthShort = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const dayNum = date.getDate();

  return (
    <Link to={`/cases/${caseData.id}`} className="block">
      <div className="flex items-center gap-6 px-4 py-5 border-b border-border hover:bg-muted/30 transition-colors group">
        {/* Date column - Ticketmaster style */}
        <div className="flex-shrink-0 w-14 text-center">
          <div className="text-xs font-medium text-muted-foreground tracking-wide">
            {monthShort}
          </div>
          <div className="text-2xl font-semibold text-foreground">
            {dayNum}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span className="font-mono">{caseData.caseNumber}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              {sourceInfo.icon}
              {sourceInfo.label}
            </span>
          </div>
          <h3 className="font-medium text-foreground line-clamp-1 mb-1">
            {caseData.description}
          </h3>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{categoryLabel}</span>
            <span>•</span>
            <StatusBadge status={caseData.status} size="sm" />
            <UrgencyBadge urgency={caseData.urgency} size="sm" />
          </div>
        </div>

        {/* Action button */}
        <div className="flex-shrink-0">
          <Button variant="default" size="sm" className="gap-1">
            View Case
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
