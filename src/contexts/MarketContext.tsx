import { createContext, useContext, useState, ReactNode } from 'react';
import { MARKET_OPTIONS } from '@/lib/types';
import { currentUser } from '@/lib/mockData';

interface MarketContextType {
  market: string;
  setMarket: (market: string) => void;
  marketLabel: string;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export function MarketProvider({ children }: { children: ReactNode }) {
  // Initialize from user's account market (simulating detection on login)
  const [market, setMarket] = useState(currentUser.market);

  const marketLabel = MARKET_OPTIONS.find(m => m.value === market)?.label || market;

  return (
    <MarketContext.Provider value={{ market, setMarket, marketLabel }}>
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  const context = useContext(MarketContext);
  if (context === undefined) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
}
