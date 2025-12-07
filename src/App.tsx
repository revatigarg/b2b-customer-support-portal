import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MarketProvider } from "@/contexts/MarketContext";
import HomePage from "./pages/HomePage";
import CasesPage from "./pages/CasesPage";
import CaseDetailPage from "./pages/CaseDetailPage";
import NewCasePage from "./pages/NewCasePage";
import SearchPage from "./pages/SearchPage";
import KnowledgeBasePage from "./pages/KnowledgeBasePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MarketProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cases" element={<CasesPage />} />
            <Route path="/cases/new" element={<NewCasePage />} />
            <Route path="/cases/:id" element={<CaseDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/knowledge" element={<KnowledgeBasePage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MarketProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
