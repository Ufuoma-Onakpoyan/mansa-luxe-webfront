import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/properties" element={<Layout><Properties /></Layout>} />
          <Route path="/properties/:id" element={<Layout><PropertyDetail /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/testimonials" element={<Layout><Testimonials /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          
          {/* Admin Routes - TODO: Implement admin panel */}
          <Route path="/admin/*" element={<div className="min-h-screen flex items-center justify-center bg-background"><div className="text-center"><h1 className="text-4xl font-bold mb-4 text-primary">Admin Panel</h1><p className="text-muted-foreground">Coming Soon - Admin functionality will be implemented here</p></div></div>} />
          
          {/* 404 Route */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
