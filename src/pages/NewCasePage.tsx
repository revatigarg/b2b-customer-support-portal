import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArticleCard } from '@/components/knowledge/ArticleCard';
import { 
  CATEGORY_OPTIONS, 
  SUBCATEGORY_OPTIONS, 
  URGENCY_OPTIONS,
  RequestCategory,
  Urgency
} from '@/lib/types';
import { mockKnowledgeArticles, mockEvents, currentUser } from '@/lib/mockData';
import { useLocale } from '@/contexts/LocaleContext';
import { AlertTriangle, Upload, X, CheckCircle2, Calendar, ChevronRight, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const NewCasePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { locale } = useLocale();
  
  const [category, setCategory] = useState<RequestCategory | ''>('');
  const [subCategory, setSubCategory] = useState('');
  const [selectedEventId, setSelectedEventId] = useState('');
  const [urgency, setUrgency] = useState<Urgency | ''>('');
  const [description, setDescription] = useState('');
  const [reviewedArticles, setReviewedArticles] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  const subCategoryOptions = category ? SUBCATEGORY_OPTIONS[category] : [];
  
  // Group events by status
  const upcomingEvents = mockEvents.filter(e => e.status === 'upcoming');
  const pastEvents = mockEvents.filter(e => e.status === 'past');
  const selectedEvent = mockEvents.find(e => e.id === selectedEventId);

  const recommendedArticles = useMemo(() => {
    if (!category || !subCategory) return [];
    return mockKnowledgeArticles.slice(0, 3);
  }, [category, subCategory]);

  const isHighUrgency = urgency === 'critical' || urgency === 'high';

  // Step logic
  const showStep2 = !!category;
  const showArticleGate = !!category && !!subCategory && recommendedArticles.length > 0;
  const showStep3 = showArticleGate ? reviewedArticles : (!!category && !!subCategory);

  const canSubmit = category && subCategory && urgency && description.trim().length >= 20;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (attachments.length + files.length > 5) {
      toast({
        title: "Too many files",
        description: "Maximum 5 attachments allowed",
        variant: "destructive",
      });
      return;
    }
    setAttachments([...attachments, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Case Submitted",
      description: "Your support request has been created successfully. Case number: TM-2024-00006",
    });
    
    navigate('/cases');
  };

  const getCategoryLabel = () => {
    const cat = CATEGORY_OPTIONS.find(c => c.value === category);
    return cat?.label || '';
  };

  return (
    <MainLayout title="New Support Request" showSearch={false}>
      <form onSubmit={handleSubmit} className="max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Step 1: What can we help with? */}
            <Card className="border-2 border-border bg-card">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                    1
                  </div>
                  <div className="flex-1 space-y-3">
                    <h2 className="text-lg font-semibold">What can we help you with?</h2>
                    <Select value={category} onValueChange={(v) => {
                      setCategory(v as RequestCategory);
                      setSubCategory('');
                      setReviewedArticles(false);
                    }}>
                      <SelectTrigger className="border-2 w-full max-w-md">
                        <SelectValue placeholder="Select a topic..." />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {CATEGORY_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Narrow it down */}
            {showStep2 && (
              <Card className="border-2 border-border bg-card animate-in fade-in slide-in-from-top-2 duration-300">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                      2
                    </div>
                    <div className="flex-1 space-y-3">
                      <h2 className="text-lg font-semibold">What specifically do you need help with?</h2>
                      <Select value={subCategory} onValueChange={(v) => {
                        setSubCategory(v);
                        setReviewedArticles(false);
                      }}>
                        <SelectTrigger className="border-2 w-full max-w-md">
                          <SelectValue placeholder="Select an issue type..." />
                        </SelectTrigger>
                        <SelectContent className="bg-popover">
                          {subCategoryOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Article Gate - Before moving forward */}
            {showArticleGate && !reviewedArticles && (
              <Card className="border-2 border-primary bg-primary/5 animate-in fade-in slide-in-from-top-2 duration-300">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-4">
                      <div>
                        <h2 className="text-lg font-semibold">Before moving forward with your {getCategoryLabel().toLowerCase()} request</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                          Have you reviewed and/or completed the following?
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        {recommendedArticles.map((article) => (
                          <ArticleCard key={article.id} article={article} compact />
                        ))}
                      </div>

                      <label className="flex items-center gap-3 p-3 bg-background border-2 border-border cursor-pointer hover:border-primary transition-colors">
                        <Checkbox
                          checked={reviewedArticles}
                          onCheckedChange={(checked) => setReviewedArticles(!!checked)}
                        />
                        <span className="text-sm font-medium">
                          Yes, I've reviewed these resources and still need help
                        </span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reviewed confirmation */}
            {showArticleGate && reviewedArticles && (
              <div className="flex items-center gap-2 text-success text-sm px-2 animate-in fade-in duration-200">
                <CheckCircle2 className="h-4 w-4" />
                Resources reviewed — let's continue with your request.
              </div>
            )}

            {/* Step 3: Tell us more */}
            {showStep3 && (
              <Card className="border-2 border-border bg-card animate-in fade-in slide-in-from-top-2 duration-300">
                <CardContent className="pt-6 space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                      3
                    </div>
                    <div className="flex-1 space-y-5">
                      <h2 className="text-lg font-semibold">Tell us about your issue</h2>
                      
                      {/* Description */}
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Describe what's happening, what you expected, and any error messages you've seen..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                          className="border-2 min-h-28"
                        />
                        <p className="text-xs text-muted-foreground text-right">
                          {description.length}/500 characters {description.length < 20 && description.length > 0 && '(min 20)'}
                        </p>
                      </div>

                      {/* Event & Urgency in one row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm text-muted-foreground">Related event (optional)</Label>
                          <Select value={selectedEventId} onValueChange={setSelectedEventId}>
                            <SelectTrigger className="border-2">
                              <SelectValue placeholder="Select an event" />
                            </SelectTrigger>
                            <SelectContent className="bg-popover max-h-60">
                              {upcomingEvents.length > 0 && (
                                <>
                                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground bg-secondary">
                                    Upcoming
                                  </div>
                                  {upcomingEvents.map((event) => (
                                    <SelectItem key={event.id} value={event.id}>
                                      <div className="flex items-center gap-2">
                                        <Calendar className="h-3.5 w-3.5 text-primary" />
                                        <span className="truncate">{event.name}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </>
                              )}
                              {pastEvents.length > 0 && (
                                <>
                                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground bg-secondary">
                                    Past
                                  </div>
                                  {pastEvents.map((event) => (
                                    <SelectItem key={event.id} value={event.id}>
                                      <div className="flex items-center gap-2">
                                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                        <span className="truncate">{event.name}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </>
                              )}
                            </SelectContent>
                          </Select>
                          {selectedEvent && (
                            <p className="text-xs text-muted-foreground">
                              {format(selectedEvent.date, 'MMM d, yyyy')} • {selectedEvent.venue}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm text-muted-foreground">How urgent is this?</Label>
                          <Select value={urgency} onValueChange={(v) => setUrgency(v as Urgency)}>
                            <SelectTrigger className="border-2">
                              <SelectValue placeholder="Select urgency" />
                            </SelectTrigger>
                            <SelectContent className="bg-popover">
                              {URGENCY_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Urgency Alert */}
                      {isHighUrgency && (
                        <div className="flex items-start gap-3 p-3 bg-warning/10 border-2 border-warning">
                          <AlertTriangle className="h-5 w-5 text-warning shrink-0" />
                          <div>
                            <p className="font-semibold text-sm">High-Priority Case</p>
                            <p className="text-xs text-muted-foreground">
                              This will be escalated to Event-Day Support with expedited SLA.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Attachments */}
                      <div className="space-y-2">
                        <Label className="text-sm text-muted-foreground">Attachments (optional)</Label>
                        <div className="border-2 border-dashed border-border p-4 text-center">
                          <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-upload"
                            accept=".pdf,.png,.jpg,.jpeg,.log,.txt,.zip"
                          />
                          <Button type="button" variant="outline" size="sm" asChild>
                            <label htmlFor="file-upload" className="cursor-pointer flex items-center gap-2">
                              <Upload className="h-4 w-4" />
                              Add files
                            </label>
                          </Button>
                          <p className="text-xs text-muted-foreground mt-1">Max 5 files</p>
                        </div>
                        
                        {attachments.length > 0 && (
                          <div className="space-y-1">
                            {attachments.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-secondary text-sm">
                                <span className="truncate">{file.name}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeAttachment(index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Submit section */}
            {showStep3 && (
              <div className="flex items-center gap-4 pt-2 animate-in fade-in duration-300">
                <Button type="submit" size="lg" disabled={!canSubmit} className="gap-2">
                  Submit Request
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" onClick={() => navigate('/cases')}>
                  Cancel
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Contact Info - always visible */}
            <Card className="border-2 border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Your Contact Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Name:</span>{' '}
                  <span className="font-medium">{currentUser.name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Email:</span>{' '}
                  <span className="font-medium">{currentUser.email}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Company:</span>{' '}
                  <span className="font-medium">{currentUser.company}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Market:</span>{' '}
                  <span className="font-medium">{locale.flag} {locale.label}</span>
                </div>
              </CardContent>
            </Card>

            {/* Helpful hint when no category selected */}
            {!category && (
              <Card className="border-2 border-border bg-secondary/50">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Start by selecting a topic and we'll guide you through the rest.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Show recommended articles in sidebar after gate is passed */}
            {showStep3 && recommendedArticles.length > 0 && (
              <Card className="border-2 border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Related Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {recommendedArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} compact />
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </form>
    </MainLayout>
  );
};

export default NewCasePage;
