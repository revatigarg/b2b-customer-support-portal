import { MainLayout } from '@/components/layout/MainLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { CaseCard } from '@/components/cases/CaseCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockCases, mockKnowledgeArticles } from '@/lib/mockData';
import { ArticleCard } from '@/components/knowledge/ArticleCard';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  const openCases = mockCases.filter(c => c.status === 'open' || c.status === 'in-progress' || c.status === 'pending');
  const criticalCases = mockCases.filter(c => c.urgency === 'critical' && c.status !== 'closed' && c.status !== 'resolved');
  const recentCases = [...mockCases].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 3);

  return (
    <MainLayout title="Dashboard">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Open Cases"
          value={openCases.length}
          subtitle="Across all queues"
          icon={FileText}
        />
        <StatsCard
          title="Avg. Response Time"
          value="2.4h"
          subtitle="Last 7 days"
          icon={Clock}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Resolved This Week"
          value={8}
          subtitle="Cases closed"
          icon={CheckCircle2}
        />
        <StatsCard
          title="Critical Issues"
          value={criticalCases.length}
          subtitle="Requiring attention"
          icon={AlertTriangle}
          className={criticalCases.length > 0 ? 'border-destructive' : ''}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Cases */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Recent Cases</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/cases" className="gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentCases.map((caseData) => (
              <CaseCard key={caseData.id} caseData={caseData} />
            ))}
          </div>

          {/* Recommended Resources */}
          <Card className="border-2 border-border bg-card mt-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Recommended Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockKnowledgeArticles.slice(0, 3).map((article) => (
                <ArticleCard key={article.id} article={article} compact />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <QuickActions />

          {/* SLA Alert Banner */}
          {criticalCases.length > 0 && (
            <Card className="border-2 border-destructive bg-destructive/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-destructive mb-1">
                      Critical Issue Alert
                    </p>
                    <p className="text-sm text-foreground">
                      You have {criticalCases.length} critical case{criticalCases.length > 1 ? 's' : ''} requiring immediate attention.
                    </p>
                    <Button variant="destructive" size="sm" className="mt-3" asChild>
                      <Link to="/cases?urgency=critical">View Critical Cases</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
