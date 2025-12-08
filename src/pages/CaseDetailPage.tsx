import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { UrgencyBadge } from '@/components/cases/UrgencyBadge';
import { StatusBadge } from '@/components/cases/StatusBadge';
import { SLACounter } from '@/components/cases/SLACounter';
import { ArticleCard } from '@/components/knowledge/ArticleCard';
import { mockCases, mockKnowledgeArticles } from '@/lib/mockData';
import { CATEGORY_OPTIONS, SUBCATEGORY_OPTIONS } from '@/lib/types';
import { format } from 'date-fns';
import { ArrowLeft, Paperclip, MessageSquare, Clock, Building2, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const CaseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [newComment, setNewComment] = useState('');
  
  const caseData = mockCases.find(c => c.id === id);
  
  if (!caseData) {
    return (
      <MainLayout title="Case Not Found">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">The requested case could not be found.</p>
          <Button onClick={() => navigate('/cases')}>Back to Cases</Button>
        </div>
      </MainLayout>
    );
  }

  const categoryLabel = CATEGORY_OPTIONS.find(c => c.value === caseData.category)?.label || caseData.category;
  const subCategoryLabel = SUBCATEGORY_OPTIONS[caseData.category]?.find(s => s.value === caseData.subCategory)?.label || caseData.subCategory;
  
  const isActive = caseData.status !== 'closed' && caseData.status !== 'resolved';

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    toast({
      title: "Comment Added",
      description: "Your comment has been posted to the case.",
    });
    setNewComment('');
  };

  return (
    <MainLayout title={caseData.caseNumber} showSearch={false}>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/cases')} className="-ml-2 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Cases
          </Button>
        </div>
      </div>

      <h1 className="text-2xl font-semibold text-foreground mb-6">{caseData.caseNumber}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Case Header */}
          <Card className="border-2 border-border bg-card">
            <CardContent className="p-6">
              <div className="flex flex-wrap items-start gap-3 mb-4">
                <StatusBadge status={caseData.status} />
                <UrgencyBadge urgency={caseData.urgency} />
                {isActive && (
                  <SLACounter deadline={caseData.slaDeadline} />
                )}
              </div>

              <h2 className="text-xl font-semibold text-foreground mb-4">
                {caseData.description}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Category</p>
                  <p className="font-medium">{categoryLabel}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Sub-Category</p>
                  <p className="font-medium">{subCategoryLabel}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Assigned Queue</p>
                  <p className="font-medium">{caseData.assignedQueue}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Created</p>
                  <p className="font-medium">{format(caseData.createdAt, 'MMM d, yyyy h:mm a')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments / Timeline */}
          <Card className="border-2 border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Case Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Original submission */}
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-primary-foreground font-semibold text-sm">
                    {caseData.contactName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{caseData.contactName}</span>
                      <span className="text-sm text-muted-foreground">
                        {format(caseData.createdAt, 'MMM d, yyyy h:mm a')}
                      </span>
                    </div>
                    <div className="p-4 bg-secondary border-2 border-border">
                      <p className="text-sm whitespace-pre-wrap">{caseData.description}</p>
                      {caseData.triedSolutions.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-border">
                          <p className="text-xs text-muted-foreground mb-1">Already tried:</p>
                          <p className="text-sm">{caseData.triedSolutions.join(', ')}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Comments */}
                {caseData.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent text-accent-foreground font-semibold text-sm">
                      {comment.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{comment.author}</span>
                        <span className="text-sm text-muted-foreground">
                          {format(comment.createdAt, 'MMM d, yyyy h:mm a')}
                        </span>
                        {comment.isInternal && (
                          <span className="text-xs bg-warning/10 text-warning px-2 py-0.5">
                            Internal
                          </span>
                        )}
                      </div>
                      <div className="p-4 bg-card border-2 border-border">
                        <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Comment Form */}
                {isActive && (
                  <form onSubmit={handleSubmitComment} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-primary-foreground font-semibold text-sm">
                      JS
                    </div>
                    <div className="flex-1 space-y-2">
                      <Textarea
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="border-2 min-h-24"
                      />
                      <Button type="submit" size="sm" disabled={!newComment.trim()} className="gap-2">
                        <Send className="h-4 w-4" />
                        Send
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Case Details */}
          <Card className="border-2 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">Case Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {caseData.eventName && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Event:</span>
                  <p className="font-medium mt-0.5">{caseData.eventName}</p>
                </div>
              )}
              <div className="text-sm">
                <span className="text-muted-foreground">Venue:</span>
                <p className="font-medium mt-0.5">{caseData.venuePartnerId?.replace('VEN-', '')}</p>
              </div>
              
              {caseData.attachments.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                    <Paperclip className="h-4 w-4" />
                    Attachments ({caseData.attachments.length})
                  </p>
                  <div className="space-y-1">
                    {caseData.attachments.map((att) => (
                      <a
                        key={att.id}
                        href={att.url}
                        className="block text-sm text-primary hover:underline"
                      >
                        {att.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="border-2 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="font-medium">{caseData.contactName}</p>
              <p className="text-muted-foreground">{caseData.contactEmail}</p>
              <p className="text-muted-foreground">{caseData.role}</p>
            </CardContent>
          </Card>

          {/* Related Articles */}
          <Card className="border-2 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">Related Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockKnowledgeArticles.slice(0, 3).map((article) => (
                <ArticleCard key={article.id} article={article} compact />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default CaseDetailPage;
