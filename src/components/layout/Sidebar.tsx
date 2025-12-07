import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, BookOpen, FileText, Users } from 'lucide-react';
import { currentUser } from '@/lib/mockData';
import { useLocale } from '@/contexts/LocaleContext';
import { Badge } from '@/components/ui/badge';

export function Sidebar() {
  const location = useLocation();
  const { t, userRole, setUserRole, isAccountManager } = useLocale();

  const navigation = [
    {
      name: t('home'),
      href: '/',
      icon: Home,
    },
    {
      name: t('knowledgeBase'),
      href: '/knowledge',
      icon: BookOpen,
    },
    {
      name: t('myCases'),
      href: '/cases',
      icon: FileText,
    },
  ];
  
  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 px-6 border-b border-sidebar-border">
          <div className="flex h-9 w-9 items-center justify-center bg-sidebar-primary">
            <span className="text-lg font-bold text-sidebar-primary-foreground">TM</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Partner Portal</span>
            <span className="text-xs text-sidebar-foreground/60">Experience Cloud</span>
          </div>
        </div>

        {/* Role Toggle (for demo) */}
        <div className="px-4 py-3 border-b border-sidebar-border">
          <p className="text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50 mb-2">
            View As
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setUserRole('partner')}
              className={cn(
                'flex-1 px-3 py-1.5 text-xs font-medium rounded transition-colors',
                userRole === 'partner'
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'bg-sidebar-accent/50 text-sidebar-foreground/70 hover:bg-sidebar-accent'
              )}
            >
              Partner
            </button>
            <button
              onClick={() => setUserRole('account-manager')}
              className={cn(
                'flex-1 px-3 py-1.5 text-xs font-medium rounded transition-colors',
                userRole === 'account-manager'
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'bg-sidebar-accent/50 text-sidebar-foreground/70 hover:bg-sidebar-accent'
              )}
            >
              Account Mgr
            </button>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-1 px-4 py-4">
          {navigation.map(item => {
            const isActive = location.pathname === item.href || 
              (item.href !== '/' && location.pathname.startsWith(item.href));
            return (
              <Link 
                key={item.name} 
                to={item.href} 
                className={cn(
                  'group flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                )}
              >
                <item.icon 
                  className={cn(
                    'h-5 w-5 shrink-0',
                    isActive 
                      ? 'text-sidebar-primary' 
                      : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground/70'
                  )} 
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center bg-sidebar-accent text-sidebar-accent-foreground font-semibold text-sm">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{currentUser.name}</p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-sidebar-foreground/60 truncate">{currentUser.role}</p>
                {isAccountManager && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    <Users className="h-2.5 w-2.5 mr-0.5" />
                    AM
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
