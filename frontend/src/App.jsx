import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, createRoutesFromElements } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TestApi from "./pages/TestApi";
import Debug from "./pages/Debug";

const queryClient = new QueryClient();

// Create router with future flags enabled
const routerOptions = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={routerOptions.future}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/test-api" element={<TestApi />} />
          <Route path="/debug" element={<Debug />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
