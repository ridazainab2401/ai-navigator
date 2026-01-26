import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navigation } from "./components/Navigation";
import { GestureOverlay } from "./components/GestureOverlay";
import { useGestureDetection, GestureType } from "./hooks/useGestureDetection";
import { HomePage } from "./pages/HomePage";
import { ResearchPage } from "./pages/ResearchPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const pages = ['/', '/research', '/projects', '/about', '/contact'];

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathnameRef = useRef(location.pathname);
  useEffect(() => {
    pathnameRef.current = location.pathname;
  }, [location.pathname]);

  const cameraControlsRef = useRef<{ start: () => void; stop: () => void; enabled: boolean }>({
    start: () => {},
    stop: () => {},
    enabled: false,
  });

  const performSelectAction = useCallback(() => {
    const active = document.activeElement as HTMLElement | null;

    const isClickable = (el: HTMLElement | null) => {
      if (!el) return false;
      const tag = el.tagName.toLowerCase();
      if (tag === 'button' || tag === 'a') return true;
      const role = el.getAttribute('role');
      if (role === 'button' || role === 'link') return true;
      if (tag === 'input') {
        const type = (el as HTMLInputElement).type;
        return type === 'button' || type === 'submit';
      }
      return false;
    };

    // 1) Prefer clicking the currently focused element
    if (active && active !== document.body && active !== document.documentElement && isClickable(active)) {
      active.click();
      return;
    }

    // 2) Otherwise click the first visible action in the main content
    const scope = document.getElementById('app-main') ?? document;
    const candidates = Array.from(
      scope.querySelectorAll<HTMLElement>('a[href],button,[role="button"],[role="link"],input[type="submit"],input[type="button"]'),
    );

    const firstVisible = candidates.find((el) => {
      const style = window.getComputedStyle(el);
      const hidden = style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0';
      const disabled = (el as HTMLButtonElement).disabled || el.getAttribute('aria-disabled') === 'true';
      const inLayout = !!el.offsetParent;
      return !hidden && !disabled && inLayout;
    });

    if (firstVisible) {
      firstVisible.focus();
      firstVisible.click();
    }
  }, []);

  const clickAtPoint = useCallback((x: number, y: number) => {
    const main = document.getElementById('app-main');
    const stack = document.elementsFromPoint(x, y) as unknown as HTMLElement[];
    const target = (main ? stack.find((el) => main.contains(el)) : stack[0]) ?? null;

    if (!target) {
      performSelectAction();
      return;
    }

    const isClickable = (el: HTMLElement | null) => {
      if (!el) return false;
      const tag = el.tagName.toLowerCase();
      if (tag === 'button' || tag === 'a') return true;
      const role = el.getAttribute('role');
      if (role === 'button' || role === 'link') return true;
      if (tag === 'input') {
        const type = (el as HTMLInputElement).type;
        return type === 'button' || type === 'submit';
      }
      return false;
    };

    let el: HTMLElement | null = target;
    while (el && el !== document.body && !isClickable(el)) {
      el = el.parentElement;
    }

    if (el && isClickable(el)) {
      // If it's a client-side route link, navigate directly (more reliable than synthetic clicks).
      if (el instanceof HTMLAnchorElement) {
        const href = el.getAttribute('href');
        if (href && href.startsWith('/')) {
          navigate(href);
          return;
        }
      }

      el.focus();
      // Some components behave better with actual pointer/mouse events.
      el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, clientX: x, clientY: y }));
      el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, clientX: x, clientY: y }));
      el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, clientX: x, clientY: y }));
      el.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true, clientX: x, clientY: y }));
      el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, clientX: x, clientY: y }));
    } else {
      performSelectAction();
    }
  }, [navigate, performSelectAction]);
  
  const handleGesture = useCallback((gesture: GestureType) => {
    const currentIndex = pages.indexOf(pathnameRef.current);
    
    switch (gesture) {
      case 'thumbs_up':
        // Next page
        if (currentIndex < pages.length - 1) {
          navigate(pages[currentIndex + 1]);
        } else {
          navigate(pages[0]); // Loop back to first page
        }
        break;
      case 'peace':
        // Previous page
        if (currentIndex > 0) {
          navigate(pages[currentIndex - 1]);
        } else {
          navigate(pages[pages.length - 1]); // Loop to last page
        }
        break;
      case 'pointing':
        // Pointing is used for cursor movement + dwell-to-click (handled by onSelect)
        break;
      case 'open_palm':
        // Navigate to home
        navigate('/');
        break;
    }
  }, [navigate]);

  const {
    videoRef,
    canvasRef,
    gesture,
    isDetecting,
    cameraEnabled,
    pointer,
    selectProgress,
    startCamera,
    stopCamera,
    error,
  } = useGestureDetection({
    onGestureDetected: handleGesture,
    onSelect: (pos) => clickAtPoint(pos.x, pos.y),
    cooldownMs: 1500, // Prevent rapid navigation
  });

  useEffect(() => {
    cameraControlsRef.current.start = startCamera;
    cameraControlsRef.current.stop = stopCamera;
    cameraControlsRef.current.enabled = cameraEnabled;
  }, [startCamera, stopCamera, cameraEnabled]);

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

  // Auto-scroll while pointing near edges
  useEffect(() => {
    if (!cameraEnabled || !pointer) return;

    let raf: number | null = null;
    const EDGE_PX = 220;
    const SPEED_PX = 22;

    const tick = () => {
      const h = window.innerHeight;
      if (pointer.y < EDGE_PX) {
        window.scrollBy({ top: -SPEED_PX, left: 0, behavior: 'auto' });
      } else if (pointer.y > h - EDGE_PX) {
        window.scrollBy({ top: SPEED_PX, left: 0, behavior: 'auto' });
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [cameraEnabled, pointer]);

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
          <main id="app-main">
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/research" element={<ResearchPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
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
        pointer={pointer}
        selectProgress={selectProgress}
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
