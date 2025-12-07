import { TopNav } from './TopNav';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  showSearch?: boolean;
}

export function MainLayout({ children, title, showSearch = true }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="p-6">
        {title && (
          <h1 className="text-2xl font-semibold text-foreground mb-6">{title}</h1>
        )}
        {children}
      </main>
    </div>
  );
}
