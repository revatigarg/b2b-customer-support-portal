import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLocale } from '@/contexts/LocaleContext';
import { Home, BookOpen, FileText, Music, Globe, Headphones, Bell, ChevronDown, ChevronUp, Check, MessageSquare, ArrowLeft, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { MARKET_CONFIGS, MarketCode, LanguageCode } from '@/lib/locale';
import { currentUser, currentAccount } from '@/lib/mockData';

export function TopNav() {
  const location = useLocation();
  const { market, setMarket, language, setLanguage, locale, t, userRole, setUserRole, isAccountManager } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [countriesExpanded, setCountriesExpanded] = useState(true);
  const [languageExpanded, setLanguageExpanded] = useState(true);

  const navigation = [
    { name: t('home'), href: '/', icon: Home },
    { name: t('myCases'), href: '/cases', icon: FileText },
    { name: t('taskGuides') || 'Task Guides', href: '/knowledge', icon: BookOpen },
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
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left: Logo/Account + Main Nav */}
        <div className="flex items-center gap-8">
          {/* Account Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center bg-primary rounded">
              <Music className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:flex flex-col min-w-0">
              <span className="text-sm font-semibold truncate">{currentAccount.artist}</span>
              <span className="text-xs text-muted-foreground truncate">{currentAccount.tourName}</span>
            </div>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map(item => {
              const isActive = location.pathname === item.href || 
                (item.href !== '/' && location.pathname.startsWith(item.href));
              return (
                <Link 
                  key={item.name} 
                  to={item.href} 
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive 
                      ? 'bg-secondary text-foreground' 
                      : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Country picker, Support, Profile */}
        <div className="flex items-center gap-3">
          {/* Region/Language Selector */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
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

          {/* Get Support */}
          <Button variant="ghost" size="sm" asChild className="gap-2 text-muted-foreground hover:text-foreground">
            <Link to="/cases/new">
              <Headphones className="h-4 w-4" />
              <span className="hidden md:inline">{t('getSupport')}</span>
            </Link>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center bg-destructive text-destructive-foreground text-xs font-medium rounded-full">
              3
            </span>
          </Button>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-border">
            <div className="flex h-8 w-8 items-center justify-center bg-secondary text-secondary-foreground font-semibold text-xs rounded-full">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="hidden lg:flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">{currentUser.name}</span>
                {isAccountManager && (
                  <Badge variant="secondary" className="text-[10px] px-1 py-0">
                    <Users className="h-2.5 w-2.5 mr-0.5" />
                    AM
                  </Badge>
                )}
              </div>
              <span className="text-xs text-muted-foreground">{currentUser.role}</span>
            </div>
          </div>

          {/* Role Toggle (for demo) - Hidden on smaller screens */}
          <div className="hidden xl:flex items-center gap-1 pl-2 border-l border-border">
            <button
              onClick={() => setUserRole('partner')}
              className={cn(
                'px-2 py-1 text-xs font-medium rounded transition-colors',
                userRole === 'partner'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              )}
            >
              Partner
            </button>
            <button
              onClick={() => setUserRole('account-manager')}
              className={cn(
                'px-2 py-1 text-xs font-medium rounded transition-colors',
                userRole === 'account-manager'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              )}
            >
              AM
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex items-center gap-1 px-4 pb-3 overflow-x-auto">
        {navigation.map(item => {
          const isActive = location.pathname === item.href || 
            (item.href !== '/' && location.pathname.startsWith(item.href));
          return (
            <Link 
              key={item.name} 
              to={item.href} 
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap',
                isActive 
                  ? 'bg-secondary text-foreground' 
                  : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
