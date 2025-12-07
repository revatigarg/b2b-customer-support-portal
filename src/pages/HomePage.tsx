import { MainLayout } from '@/components/layout/MainLayout';
import { HeroSearch } from '@/components/home/HeroSearch';
import { TaskTile } from '@/components/home/TaskTile';
import { FeaturedContent } from '@/components/home/FeaturedContent';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { taskTiles, quickLinks, mockKnowledgeArticles, mockCases, currentUser } from '@/lib/mockData';
import { useLocale } from '@/contexts/LocaleContext';
import { Link } from 'react-router-dom';
import { FileText, Clock, AlertTriangle, ExternalLink, Ticket, Map, Shield, User } from 'lucide-react';

const HomePage = () => {
  const { locale, t } = useLocale();
  
  // Get user's open cases count
  const openCases = mockCases.filter(c => 
    c.status === 'open' || c.status === 'in-progress' || c.status === 'pending'
  );
  const criticalCases = openCases.filter(c => c.urgency === 'critical');

  return (
    <MainLayout title="Partner Portal" showSearch={false}>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Hero Search Section */}
        <div className="py-6">
          <HeroSearch />
        </div>

        {/* Main Content Grid - 2/3 + 1/3 layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Quick Actions + Featured Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions - 4 tiles in 2x2 grid */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                {taskTiles.map((tile) => (
                  <TaskTile
                    key={tile.id}
                    title={tile.title}
                    description={tile.description}
                    icon={tile.icon}
                    href={tile.href}
                    color={tile.color}
                  />
                ))}
              </div>
            </section>

            {/* Featured Content */}
            <FeaturedContent 
              articles={mockKnowledgeArticles.slice(0, 4)} 
              title={`Recommended for ${locale.label}`}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4">
            {/* Quick Links - External Products */}
            <Card className="border-2 border-border bg-card">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-3">Quick Links</h3>
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

            {/* Open Cases Summary */}
            <Card className="border-2 border-border bg-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">Your Cases</h3>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/cases">View All</Link>
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm">Open Cases</span>
                    </div>
                    <span className="font-semibold">{openCases.length}</span>
                  </div>
                  {criticalCases.length > 0 && (
                    <div className="flex items-center justify-between p-2.5 bg-destructive/10 border border-destructive/30">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        <span className="text-sm text-destructive font-medium">Critical Issues</span>
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
                <h3 className="font-semibold text-foreground mb-3">Recent Activity</h3>
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

            {/* Need More Help */}
            <Card className="border-2 border-primary/30 bg-primary/5">
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold text-foreground mb-2">Can't find what you need?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Our support team is here to help with any questions.
                </p>
                <Button asChild className="w-full">
                  <Link to="/cases/new">Submit a Support Request</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
