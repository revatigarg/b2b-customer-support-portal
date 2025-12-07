import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  showSearch?: boolean;
}

export function MainLayout({ children, title, showSearch = true }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64">
        <Header title={title} showSearch={showSearch} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
