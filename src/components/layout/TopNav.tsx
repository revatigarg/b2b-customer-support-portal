import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLocale } from '@/contexts/LocaleContext';
import { ChevronDown, ChevronUp, Check, MessageSquare, ArrowLeft, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { MARKET_CONFIGS, MarketCode, LanguageCode } from '@/lib/locale';
import { currentUser } from '@/lib/mockData';

const quickLinks = [
  { name: 'TM1', href: 'https://tm1.ticketmaster.com', external: true },
  { name: 'Account Manager', href: 'https://am.ticketmaster.com', external: true },
  { name: 'SafeTix', href: 'https://safetix.ticketmaster.com', external: true },
];

export function TopNav() {
  const location = useLocation();
  const { market, setMarket, language, setLanguage, locale, t } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [countriesExpanded, setCountriesExpanded] = useState(true);
  const [languageExpanded, setLanguageExpanded] = useState(true);

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('myCases'), href: '/cases' },
    { name: t('taskGuides') || 'Task Guides', href: '/knowledge' },
  ];

  const marketOptions = Object.values(MARKET_CONFIGS);
  const hasMultipleLanguages = locale.languages.length > 1;

  const handleMarketSelect = (newMarket: MarketCode) => {
    setMarket(newMarket);
    if (MARKET_CONFIGS[newMarket].languages.length === 1) {
      setIsOpen(false);
    }
  };

  const handleLanguageSelect = (newLanguage: LanguageCode) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top Utility Bar - Black */}
      <div className="bg-black text-white">
        <div className="flex h-10 items-center justify-between px-6">
          {/* Left: Country/Flag */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center gap-1.5 text-sm hover:opacity-80 transition-opacity">
                <img 
                  src={`https://flagcdn.com/w40/${market.toLowerCase()}.png`}
                  alt={locale.nativeLabel}
                  className="h-4 w-6 object-cover rounded-sm"
                />
                <span className="font-medium">{market}</span>
              </button>
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

                {/* Language Section */}
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

          {/* Right: Quick Links + Get Support */}
          <div className="flex items-center gap-6">
            {/* Quick Links */}
            <nav className="hidden md:flex items-center gap-5">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:opacity-80 transition-opacity"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Separator */}
            <div className="hidden md:block h-4 w-px bg-white/30" />

            {/* Contact Support */}
            <Link 
              to="/cases/new" 
              className="flex items-center h-10 px-4 text-sm font-medium text-white hover:text-white/80 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Blue */}
      <div className="bg-primary">
        <div className="flex h-14 items-center justify-between px-6">
          {/* Left: Portal Title + Navigation */}
          <div className="flex items-center gap-10">
            {/* Portal Title - Ticketmaster Style */}
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold italic text-primary-foreground tracking-tight">
                Partner Portal
              </span>
            </Link>

            {/* Main Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navigation.map(item => {
                const isActive = location.pathname === item.href || 
                  (item.href !== '/' && location.pathname.startsWith(item.href));
                return (
                  <Link 
                    key={item.name} 
                    to={item.href} 
                    className={cn(
                      'text-sm font-medium transition-opacity text-primary-foreground',
                      isActive 
                        ? 'opacity-100' 
                        : 'opacity-80 hover:opacity-100'
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: Search + User Login */}
          <div className="flex items-center gap-4">
            {/* Search Icon */}
            <button className="flex items-center gap-2 text-primary-foreground hover:opacity-80 transition-opacity">
              <Search className="h-5 w-5" />
            </button>

            {/* User Login */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{currentUser.name}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex items-center gap-4 px-4 py-3 bg-primary/90 overflow-x-auto">
        {navigation.map(item => {
          const isActive = location.pathname === item.href || 
            (item.href !== '/' && location.pathname.startsWith(item.href));
          return (
            <Link 
              key={item.name} 
              to={item.href} 
              className={cn(
                'text-sm font-medium transition-opacity whitespace-nowrap text-primary-foreground',
                isActive 
                  ? 'opacity-100' 
                  : 'opacity-70 hover:opacity-100'
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
