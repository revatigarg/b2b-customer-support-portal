import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArticleCard } from '@/components/knowledge/ArticleCard';
import { 
  CATEGORY_OPTIONS, 
  SUBCATEGORY_OPTIONS, 
  URGENCY_OPTIONS, 
  MARKET_OPTIONS,
  TRIED_SOLUTIONS_OPTIONS,
  RequestCategory,
  Urgency
} from '@/lib/types';
import { mockKnowledgeArticles, currentUser } from '@/lib/mockData';
import { AlertTriangle, Upload, X, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NewCasePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [category, setCategory] = useState<RequestCategory | ''>('');
  const [subCategory, setSubCategory] = useState('');
  const [eventId, setEventId] = useState('');
  const [venuePartnerId, setVenuePartnerId] = useState('VEN-001');
  const [market, setMarket] = useState(currentUser.market);
  const [urgency, setUrgency] = useState<Urgency | ''>('');
  const [description, setDescription] = useState('');
  const [triedSolutions, setTriedSolutions] = useState<string[]>([]);
  const [otherSolution, setOtherSolution] = useState('');
  const [reviewedArticles, setReviewedArticles] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  const subCategoryOptions = category ? SUBCATEGORY_OPTIONS[category] : [];
  
  const recommendedArticles = useMemo(() => {
    if (!category) return [];
    // In a real app, this would be an API call based on category/subCategory
    return mockKnowledgeArticles.slice(0, 3);
  }, [category, subCategory]);

  const isHighUrgency = urgency === 'critical' || urgency === 'high';

  const canSubmit = category && subCategory && urgency && description.trim().length >= 20 && 
    (recommendedArticles.length === 0 || reviewedArticles);

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
    
    // In a real app, this would submit to an API
    toast({
      title: "Case Submitted",
      description: "Your support request has been created successfully. Case number: TM-2024-00006",
    });
    
    navigate('/cases');
  };

  return (
    <MainLayout title="New Support Request" showSearch={false}>
      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2 border-border bg-card">
              <CardHeader>
                <CardTitle>Request Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Request Category *</Label>
                    <Select value={category} onValueChange={(v) => {
                      setCategory(v as RequestCategory);
                      setSubCategory('');
                    }}>
                      <SelectTrigger id="category" className="border-2">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORY_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subCategory">Sub-Category *</Label>
                    <Select value={subCategory} onValueChange={setSubCategory} disabled={!category}>
                      <SelectTrigger id="subCategory" className="border-2">
                        <SelectValue placeholder="Select sub-category" />
                      </SelectTrigger>
                      <SelectContent>
                        {subCategoryOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Event & Venue */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventId">Event ID (optional)</Label>
                    <Input
                      id="eventId"
                      placeholder="EVT-123456"
                      value={eventId}
                      onChange={(e) => setEventId(e.target.value)}
                      className="border-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="venuePartnerId">Venue / Partner ID</Label>
                    <Input
                      id="venuePartnerId"
                      value={venuePartnerId}
                      onChange={(e) => setVenuePartnerId(e.target.value)}
                      className="border-2"
                    />
                  </div>
                </div>

                {/* Market & Urgency */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="market">Market / Country</Label>
                    <Select value={market} onValueChange={setMarket}>
                      <SelectTrigger id="market" className="border-2">
                        <SelectValue placeholder="Select market" />
                      </SelectTrigger>
                      <SelectContent>
                        {MARKET_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgency / Impact *</Label>
                    <Select value={urgency} onValueChange={(v) => setUrgency(v as Urgency)}>
                      <SelectTrigger id="urgency" className="border-2">
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
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
                  <div className="flex items-start gap-3 p-4 bg-warning/10 border-2 border-warning">
                    <AlertTriangle className="h-5 w-5 text-warning shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">High-Priority Case</p>
                      <p className="text-sm text-muted-foreground">
                        Because this is high-urgency, your request will be escalated to the Event-Day Support queue with expedited SLA.
                      </p>
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description * (min. 20 characters)</Label>
                  <Textarea
                    id="description"
                    placeholder="Please describe your issue in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                    className="border-2 min-h-32"
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {description.length}/500 characters
                  </p>
                </div>

                {/* What have you tried */}
                <div className="space-y-3">
                  <Label>What have you tried so far?</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TRIED_SOLUTIONS_OPTIONS.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 p-3 border-2 border-border bg-background cursor-pointer hover:border-primary transition-colors"
                      >
                        <Checkbox
                          checked={triedSolutions.includes(option.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setTriedSolutions([...triedSolutions, option.value]);
                            } else {
                              setTriedSolutions(triedSolutions.filter(s => s !== option.value));
                            }
                          }}
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {triedSolutions.includes('other') && (
                    <Input
                      placeholder="Please describe what else you tried..."
                      value={otherSolution}
                      onChange={(e) => setOtherSolution(e.target.value)}
                      className="border-2"
                    />
                  )}
                </div>

                {/* Attachments */}
                <div className="space-y-3">
                  <Label>Attachments (optional, max 5 files)</Label>
                  <div className="border-2 border-dashed border-border p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drop files here or click to upload
                    </p>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.png,.jpg,.jpeg,.log,.txt,.zip"
                    />
                    <Button type="button" variant="outline" size="sm" asChild>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        Choose Files
                      </label>
                    </Button>
                  </div>
                  
                  {attachments.length > 0 && (
                    <div className="space-y-2">
                      {attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-secondary">
                          <span className="text-sm truncate">{file.name}</span>
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
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="border-2 border-border bg-card">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Name</Label>
                    <p className="font-medium">{currentUser.name}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="font-medium">{currentUser.email}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Partner ID</Label>
                    <p className="font-medium">{currentUser.partnerId}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Role</Label>
                    <p className="font-medium">{currentUser.role}</p>
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <Label className="text-muted-foreground">Company</Label>
                    <p className="font-medium">{currentUser.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex gap-4">
              <Button type="submit" size="lg" disabled={!canSubmit}>
                Submit Request
              </Button>
              <Button type="button" variant="outline" size="lg" onClick={() => navigate('/cases')}>
                Cancel
              </Button>
            </div>
          </div>

          {/* Sidebar - Recommended Articles */}
          <div className="space-y-4">
            {category && recommendedArticles.length > 0 && (
              <Card className="border-2 border-primary bg-accent/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <span className="text-primary">💡</span>
                    Suggested Resources
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Review these articles before submitting your request.
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recommendedArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} compact />
                  ))}
                  
                  <label className="flex items-start gap-3 p-3 bg-background border-2 border-border cursor-pointer hover:border-primary transition-colors">
                    <Checkbox
                      checked={reviewedArticles}
                      onCheckedChange={(checked) => setReviewedArticles(!!checked)}
                      className="mt-0.5"
                    />
                    <span className="text-sm">
                      I reviewed these resources and my issue persists
                    </span>
                  </label>

                  {reviewedArticles && (
                    <div className="flex items-center gap-2 text-success text-sm">
                      <CheckCircle2 className="h-4 w-4" />
                      Great! You can now submit your request.
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {!category && (
              <Card className="border-2 border-border bg-card">
                <CardContent className="p-6 text-center text-muted-foreground">
                  <p className="text-sm">
                    Select a category to see relevant knowledge base articles that might help resolve your issue.
                  </p>
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
