import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navigation } from "./components/Navigation";
import { GestureOverlay } from "./components/GestureOverlay";
import { useGestureDetection, GestureType } from "./hooks/useGestureDetection";
import { HomePage } from "./pages/HomePage";
import { ResearchPage } from "./pages/ResearchPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { AboutPage } from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const pages = ['/', '/research', '/projects', '/about'];

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleGesture = useCallback((gesture: GestureType) => {
    const currentIndex = pages.indexOf(location.pathname);
    
    switch (gesture) {
      case 'open_palm':
        // Next page
        if (currentIndex < pages.length - 1) {
          navigate(pages[currentIndex + 1]);
        } else {
          navigate(pages[0]); // Loop back to first page
        }
        break;
      case 'closed_fist':
        // Previous page
        if (currentIndex > 0) {
          navigate(pages[currentIndex - 1]);
        } else {
          navigate(pages[pages.length - 1]); // Loop to last page
        }
        break;
      case 'pointing':
        // Could be used for click actions in the future
        console.log('Pointing gesture detected - select action');
        break;
      case 'peace':
        // Could toggle a menu or special action
        console.log('Peace gesture detected - menu action');
        break;
    }
  }, [location.pathname, navigate]);

  const {
    videoRef,
    canvasRef,
    gesture,
    isDetecting,
    cameraEnabled,
    startCamera,
    stopCamera,
    error,
  } = useGestureDetection({
    onGestureDetected: handleGesture,
    cooldownMs: 1500, // Prevent rapid navigation
  });

  // Keyboard navigation fallback
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = pages.indexOf(location.pathname);
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentIndex < pages.length - 1) {
          navigate(pages[currentIndex + 1]);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentIndex > 0) {
          navigate(pages[currentIndex - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [location.pathname, navigate]);

  const handleToggleCamera = () => {
    if (cameraEnabled) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      
      <GestureOverlay
        gesture={gesture}
        isDetecting={isDetecting}
        cameraEnabled={cameraEnabled}
        onToggleCamera={handleToggleCamera}
        videoRef={videoRef}
        canvasRef={canvasRef}
        error={error}
      />
      
      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-16">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2024 AI Center of Excellence. Navigate with gestures or keyboard arrows.</p>
        </div>
      </footer>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
