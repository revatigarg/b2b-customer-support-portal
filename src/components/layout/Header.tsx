import { Bell, Search, Globe, Headphones, ChevronDown, ChevronUp, Check, MessageSquare, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { MARKET_CONFIGS, MarketCode, LanguageCode } from '@/lib/locale';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface HeaderProps {
  title: string;
  showSearch?: boolean;
}

export function Header({ title, showSearch = true }: HeaderProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { market, setMarket, language, setLanguage, locale, t } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [countriesExpanded, setCountriesExpanded] = useState(true);
  const [languageExpanded, setLanguageExpanded] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const marketOptions = Object.values(MARKET_CONFIGS);
  const hasMultipleLanguages = locale.languages.length > 1;

  const handleMarketSelect = (newMarket: MarketCode) => {
    setMarket(newMarket);
    // If the new market has only one language, close the dialog
    if (MARKET_CONFIGS[newMarket].languages.length === 1) {
      setIsOpen(false);
    }
  };

  const handleLanguageSelect = (newLanguage: LanguageCode) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

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
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{locale.flag} {locale.nativeLabel}</span>
              <span className="sm:hidden">{locale.flag}</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-background">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4 cursor-pointer" onClick={() => setIsOpen(false)} />
                {t('location')}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              {/* Countries Section */}
              <div>
                <button
                  onClick={() => setCountriesExpanded(!countriesExpanded)}
                  className="flex items-center justify-between w-full p-3 bg-secondary/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{locale.flag}</span>
                    <div className="text-left">
                      <p className="text-sm text-muted-foreground">{t('countries')}</p>
                      <p className="font-medium">{locale.nativeLabel}</p>
                    </div>
                  </div>
                  {countriesExpanded ? (
                    <ChevronUp className="h-5 w-5 text-primary" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                
                {countriesExpanded && (
                  <div className="mt-2 max-h-64 overflow-y-auto space-y-1">
                    {marketOptions.map((option) => (
                      <button
                        key={option.market}
                        onClick={() => handleMarketSelect(option.market)}
                        className={cn(
                          "flex items-center gap-3 w-full p-3 rounded-lg transition-colors text-left",
                          market === option.market 
                            ? "bg-secondary" 
                            : "hover:bg-secondary/50"
                        )}
                      >
                        <span className="text-xl">{option.flag}</span>
                        <span className="flex-1">{option.nativeLabel}</span>
                        {market === option.market && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Language Section - Only show if multiple languages available */}
              {hasMultipleLanguages && (
                <>
                  <Separator />
                  <div>
                    <button
                      onClick={() => setLanguageExpanded(!languageExpanded)}
                      className="flex items-center justify-between w-full p-3 bg-secondary/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                        <div className="text-left">
                          <p className="text-sm text-muted-foreground">{t('language')}</p>
                          <p className="font-medium">
                            {locale.languages.find(l => l.code === language)?.nativeLabel || 'English'}
                          </p>
                        </div>
                      </div>
                      {languageExpanded ? (
                        <ChevronUp className="h-5 w-5 text-primary" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                    
                    {languageExpanded && (
                      <div className="mt-2 space-y-1">
                        {locale.languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => handleLanguageSelect(lang.code)}
                            className={cn(
                              "flex items-center justify-between w-full p-3 rounded-lg transition-colors text-left",
                              language === lang.code 
                                ? "text-primary" 
                                : "hover:bg-secondary/50"
                            )}
                          >
                            <span>{lang.nativeLabel}</span>
                            {language === lang.code && (
                              <Check className="h-5 w-5 text-primary" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>

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
