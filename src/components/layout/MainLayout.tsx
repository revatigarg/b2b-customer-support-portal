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
        {children}
      </main>
    </div>
  );
}
