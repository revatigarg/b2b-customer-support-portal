import { Link } from 'react-router-dom';
import { Case, CATEGORY_OPTIONS } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { UrgencyBadge } from './UrgencyBadge';
import { StatusBadge } from './StatusBadge';
import { SLACounter } from './SLACounter';
import { ArrowRight, Calendar, Building2 } from 'lucide-react';
import { format } from 'date-fns';

interface CaseCardProps {
  caseData: Case;
}

export function CaseCard({ caseData }: CaseCardProps) {
  const categoryLabel = CATEGORY_OPTIONS.find(c => c.value === caseData.category)?.label || caseData.category;

  return (
    <Link to={`/cases/${caseData.id}`}>
      <Card className="group border-2 border-border hover:border-primary transition-colors bg-card">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-sm text-primary font-semibold">
                  {caseData.caseNumber}
                </span>
                <StatusBadge status={caseData.status} size="sm" />
                <UrgencyBadge urgency={caseData.urgency} size="sm" />
              </div>
              
              <p className="text-foreground font-medium line-clamp-2 mb-3">
                {caseData.description}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {format(caseData.createdAt, 'MMM d, yyyy')}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5" />
                  {categoryLabel}
                </span>
                <span className="text-muted-foreground/70">
                  Queue: {caseData.assignedQueue}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              {caseData.status !== 'closed' && caseData.status !== 'resolved' && (
                <SLACounter deadline={caseData.slaDeadline} />
              )}
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
