import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Search, 
  FileText, 
  LayoutDashboard, 
  BookOpen, 
  Settings, 
  HelpCircle,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'My Cases', href: '/cases', icon: FileText },
  { name: 'Knowledge Base', href: '/knowledge', icon: BookOpen },
];

const secondaryNavigation = [
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help', href: '/help', icon: HelpCircle },
];

export function Sidebar() {
  const location = useLocation();

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
            <span className="text-xs text-sidebar-foreground/60">Support Center</span>
          </div>
        </div>

        {/* New Case Button */}
        <div className="px-4 py-4">
          <Button asChild className="w-full gap-2 bg-sidebar-primary hover:bg-sidebar-primary/90">
            <Link to="/cases/new">
              <Plus className="h-4 w-4" />
              New Support Request
            </Link>
          </Button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-1 px-4">
          <p className="px-2 py-2 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50">
            Main Menu
          </p>
          {navigation.map((item) => {
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
                <item.icon className={cn(
                  'h-5 w-5 shrink-0',
                  isActive ? 'text-sidebar-primary' : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground/70'
                )} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Secondary Navigation */}
        <nav className="border-t border-sidebar-border px-4 py-4 space-y-1">
          {secondaryNavigation.map((item) => {
            const isActive = location.pathname === item.href;
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
                <item.icon className="h-5 w-5 shrink-0 text-sidebar-foreground/50" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center bg-sidebar-accent text-sidebar-accent-foreground font-semibold text-sm">
              JS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Smith</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">Venue Ops Manager</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
