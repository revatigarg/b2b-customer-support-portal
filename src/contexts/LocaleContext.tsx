import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { MARKET_CONFIGS, TRANSLATIONS, LocaleConfig, MarketCode, LanguageCode } from '@/lib/locale';
import { currentUser } from '@/lib/mockData';

export type UserRole = 'partner' | 'account-manager';

interface LocaleContextType {
  market: MarketCode;
  setMarket: (market: MarketCode) => void;
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  locale: LocaleConfig;
  t: (key: string) => string;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isAccountManager: boolean;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [market, setMarketState] = useState<MarketCode>((currentUser.market as MarketCode) || 'us');
  const [language, setLanguageState] = useState<LanguageCode>(
    MARKET_CONFIGS[market]?.defaultLanguage || 'en'
  );
  const [userRole, setUserRole] = useState<UserRole>('partner');

  const locale = MARKET_CONFIGS[market];

  const setMarket = useCallback((newMarket: MarketCode) => {
    setMarketState(newMarket);
    // Set language to the market's default language
    const marketConfig = MARKET_CONFIGS[newMarket];
    if (marketConfig) {
      setLanguageState(marketConfig.defaultLanguage);
    }
  }, []);

  const setLanguage = useCallback((newLanguage: LanguageCode) => {
    // Only set if the language is available for the current market
    const availableLanguages = locale.languages.map(l => l.code);
    if (availableLanguages.includes(newLanguage)) {
      setLanguageState(newLanguage);
    }
  }, [locale]);

  const t = useCallback((key: string): string => {
    const translations = TRANSLATIONS[language] || TRANSLATIONS.en;
    return translations[key] || TRANSLATIONS.en[key] || key;
  }, [language]);

  const formatCurrency = useCallback((amount: number): string => {
    const formatted = amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    
    return locale.currency.position === 'before'
      ? `${locale.currency.symbol}${formatted}`
      : `${formatted} ${locale.currency.symbol}`;
  }, [locale]);

  const formatDate = useCallback((date: Date): string => {
    return date.toLocaleDateString('en-US');
  }, []);

  return (
    <LocaleContext.Provider value={{ 
      market, 
      setMarket, 
      language,
      setLanguage,
      locale, 
      t, 
      formatCurrency, 
      formatDate,
      userRole,
      setUserRole,
      isAccountManager: userRole === 'account-manager',
    }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
