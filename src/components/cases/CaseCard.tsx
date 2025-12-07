import { Link } from 'react-router-dom';
import { Case, CATEGORY_OPTIONS } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { UrgencyBadge } from './UrgencyBadge';
import { StatusBadge } from './StatusBadge';
import { ArrowRight, Calendar, Building2, Mail, Phone, Globe, CheckCircle2, Clock, MessageSquare } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';
import { Badge } from '@/components/ui/badge';

interface CaseCardProps {
  caseData: Case;
}

// Get a positive status message based on case status
function getStatusMessage(status: Case['status'], t: (key: string) => string): { icon: React.ReactNode; message: string; color: string } {
  switch (status) {
    case 'resolved':
    case 'closed':
      return {
        icon: <CheckCircle2 className="h-4 w-4" />,
        message: t('resolved'),
        color: 'text-green-600 dark:text-green-400',
      };
    case 'in-progress':
      return {
        icon: <Clock className="h-4 w-4" />,
        message: t('inProgress'),
        color: 'text-blue-600 dark:text-blue-400',
      };
    case 'pending':
      return {
        icon: <MessageSquare className="h-4 w-4" />,
        message: t('awaitingResponse'),
        color: 'text-amber-600 dark:text-amber-400',
      };
    default:
      return {
        icon: <Clock className="h-4 w-4" />,
        message: t('submitted'),
        color: 'text-muted-foreground',
      };
  }
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
  const { t, formatDate } = useLocale();
  const categoryLabel = CATEGORY_OPTIONS.find(c => c.value === caseData.category)?.label || caseData.category;
  const statusMessage = getStatusMessage(caseData.status, t);
  const sourceInfo = getSourceInfo(caseData.source);

  return (
    <Link to={`/cases/${caseData.id}`}>
      <Card className="group border-2 border-border hover:border-primary transition-colors bg-card">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="font-mono text-sm text-primary font-semibold">
                  {caseData.caseNumber}
                </span>
                <StatusBadge status={caseData.status} size="sm" />
                <UrgencyBadge urgency={caseData.urgency} size="sm" />
                <Badge variant="outline" className="gap-1 text-xs">
                  {sourceInfo.icon}
                  {sourceInfo.label}
                </Badge>
              </div>
              
              <p className="text-foreground font-medium line-clamp-2 mb-3">
                {caseData.description}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(caseData.createdAt)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5" />
                  {categoryLabel}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              {/* Positive status message instead of SLA countdown */}
              <div className={`flex items-center gap-1.5 text-sm font-medium ${statusMessage.color}`}>
                {statusMessage.icon}
                <span>{statusMessage.message}</span>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
