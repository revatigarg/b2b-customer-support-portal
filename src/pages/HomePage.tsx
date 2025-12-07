import { MainLayout } from '@/components/layout/MainLayout';
import { HeroSearch } from '@/components/home/HeroSearch';
import { FeaturedTasks } from '@/components/home/FeaturedTasks';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { quickLinks, mockCases } from '@/lib/mockData';
import { useLocale } from '@/contexts/LocaleContext';
import { Link } from 'react-router-dom';
import { FileText, Clock, AlertTriangle, ExternalLink, Ticket, Map, Shield, User } from 'lucide-react';

const HomePage = () => {
  const { t } = useLocale();
  
  // Get user's open cases count
  const openCases = mockCases.filter(c => 
    c.status === 'open' || c.status === 'in-progress' || c.status === 'pending'
  );
  const criticalCases = openCases.filter(c => c.urgency === 'critical');

  return (
    <MainLayout showSearch={false}>
      {/* Full-width Hero Search Section */}
      <div className="-m-6 mb-6">
        <HeroSearch />
      </div>

      {/* Full-width Featured Tasks Section */}
      <div className="-mx-6 mb-6">
        <FeaturedTasks persona="event-organizer" />
      </div>

      <div className="max-w-6xl mx-auto space-y-6">

        {/* Widgets Row - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Your Cases */}
          <Card className="border-2 border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">{t('yourCases')}</h3>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/cases">{t('viewAll')}</Link>
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-sm">{t('openCases')}</span>
                  </div>
                  <span className="font-semibold">{openCases.length}</span>
                </div>
                {criticalCases.length > 0 && (
                  <div className="flex items-center justify-between p-2.5 bg-destructive/10 border border-destructive/30">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <span className="text-sm text-destructive font-medium">{t('criticalIssues')}</span>
                    </div>
                    <span className="font-semibold text-destructive">{criticalCases.length}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-2 border-border bg-card">
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-3">{t('recentActivity')}</h3>
              <div className="space-y-2">
                {mockCases.slice(0, 3).map((caseData) => (
                  <Link 
                    key={caseData.id} 
                    to={`/cases/${caseData.id}`}
                    className="block p-2.5 bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{caseData.caseNumber}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {caseData.description.slice(0, 50)}...
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="border-2 border-border bg-card">
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-3">{t('quickLinks')}</h3>
              <div className="space-y-1">
                {quickLinks.map((link) => {
                  const iconMap: Record<string, React.ReactNode> = {
                    ticket: <Ticket className="h-4 w-4" />,
                    map: <Map className="h-4 w-4" />,
                    shield: <Shield className="h-4 w-4" />,
                    user: <User className="h-4 w-4" />,
                  };
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 hover:bg-secondary/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-primary">{iconMap[link.icon]}</span>
                        <div>
                          <p className="text-sm font-medium text-foreground">{link.title}</p>
                          <p className="text-xs text-muted-foreground">{link.description}</p>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Full-width Need Help Section */}
      <div className="-mx-6 mt-6 py-16 bg-secondary/30 border-t border-border">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            {t('cantFindWhatYouNeed')}
          </h2>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8">
            <Link to="/cases/new">Contact Support</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
