import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { LOCALE_CONFIGS, LocaleConfig, MarketCode } from '@/lib/locale';
import { currentUser } from '@/lib/mockData';

export type UserRole = 'partner' | 'account-manager';

interface LocaleContextType {
  market: MarketCode;
  setMarket: (market: MarketCode) => void;
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
  const [market, setMarket] = useState<MarketCode>(currentUser.market as MarketCode);
  const [userRole, setUserRole] = useState<UserRole>('partner');

  const locale = LOCALE_CONFIGS[market];

  const t = useCallback((key: string): string => {
    return locale.translations[key] || key;
  }, [locale]);

  const formatCurrency = useCallback((amount: number): string => {
    const formatted = amount.toLocaleString(locale.code, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    
    return locale.currency.position === 'before'
      ? `${locale.currency.symbol}${formatted}`
      : `${formatted} ${locale.currency.symbol}`;
  }, [locale]);

  const formatDate = useCallback((date: Date): string => {
    return date.toLocaleDateString(locale.code);
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ 
      market, 
      setMarket, 
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
