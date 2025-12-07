import { Bell, Search, Globe, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { LOCALE_CONFIGS, MarketCode } from '@/lib/locale';

interface HeaderProps {
  title: string;
  showSearch?: boolean;
}

export function Header({ title, showSearch = true }: HeaderProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { market, setMarket, locale, t } = useLocale();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const marketOptions = Object.values(LOCALE_CONFIGS);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background px-6">
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>

      <div className="flex items-center gap-3">
        {showSearch && (
          <form onSubmit={handleSearch} className="relative w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder={`${t('search')}...`}
              className="pl-10 bg-secondary border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        )}

        {/* Region/Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{locale.flag} {locale.label}</span>
              <span className="sm:hidden">{locale.flag}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-popover">
            <DropdownMenuLabel>{t('selectMarket')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {marketOptions.map((option) => (
              <DropdownMenuItem
                key={option.market}
                onClick={() => setMarket(option.market as MarketCode)}
                className={market === option.market ? 'bg-accent' : ''}
              >
                <span className="mr-2">{option.flag}</span>
                <span className="flex-1">{option.label}</span>
                <span className="text-xs text-muted-foreground">{option.currency.code}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Submit Ticket - Secondary placement */}
        <Button variant="ghost" size="sm" asChild className="gap-2 text-muted-foreground hover:text-foreground">
          <Link to="/cases/new">
            <Headphones className="h-4 w-4" />
            <span className="hidden md:inline">{t('getSupport')}</span>
          </Link>
        </Button>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center bg-destructive text-destructive-foreground text-xs font-medium rounded-full">
            3
          </span>
        </Button>
      </div>
    </header>
  );
}
