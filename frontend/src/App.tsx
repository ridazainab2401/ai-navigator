import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner, toast } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navigation } from "./components/Navigation";
import { GestureOverlay } from "./components/GestureOverlay";
import { SpeechOverlay } from "./components/SpeechOverlay";
import { useGestureDetection, GestureType } from "./hooks/useGestureDetection";
import {
  normalizeTranscript,
  SpeechCommand,
  useSpeechCommands,
} from "./hooks/useSpeechCommands";
import { HomePage } from "./pages/HomePage";
import { ResearchPage } from "./pages/ResearchPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const pages = ["/", "/research", "/projects", "/about", "/contact"];

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectProgress, setSelectProgress] = useState(0);

  const resolveSpeechTarget = useCallback(
    (raw: string):
      | { kind: "route"; route: string }
      | { kind: "next" }
      | { kind: "prev" }
      | { kind: "stop" }
      | null => {
      const text = normalizeTranscript(raw);
      if (!text) return null;

      // Voice control commands
      if (
        /\b(stop|disable|turn off|mute)\b/.test(text) &&
        /\b(listening|voice|mic|microphone)\b/.test(text)
      ) {
        return { kind: "stop" };
      }

      // Page cycling (matches existing gesture/keyboard behavior)
      if (/\b(next)\b/.test(text) && /\b(page)\b/.test(text)) {
        return { kind: "next" };
      }
      if (/\b(previous|prev|back)\b/.test(text) && /\b(page)\b/.test(text)) {
        return { kind: "prev" };
      }

      const navIntent =
        /\b(go to|goto|open|navigate|take me to|show|visit)\b/.test(text) ||
        text.startsWith("/") ||
        /\/(research|projects|about|contact)\b/.test(text);

      const keywordOnly = /\b(home|research|projects?|about|contact)\b/.test(text);
      if (!navIntent && !keywordOnly) return null;

      // Explicit path mention wins
      if (/\/(research)\b/.test(text)) return { kind: "route", route: "/research" };
      if (/\/(projects)\b/.test(text)) return { kind: "route", route: "/projects" };
      if (/\/(about)\b/.test(text)) return { kind: "route", route: "/about" };
      if (/\/(contact)\b/.test(text)) return { kind: "route", route: "/contact" };

      // Keyword navigation
      if (/\b(home|start|main)\b/.test(text)) return { kind: "route", route: "/" };
      if (/\b(research)\b/.test(text)) return { kind: "route", route: "/research" };
      if (/\b(projects?|project)\b/.test(text)) return { kind: "route", route: "/projects" };
      if (/\b(about)\b/.test(text)) return { kind: "route", route: "/about" };
      if (/\b(contact|email|mail)\b/.test(text)) return { kind: "route", route: "/contact" };

      return null;
    },
    [],
  );

  const stopSpeechRef = useRef<() => void>(() => {});
  const handleSpeechFinal = useCallback(
    ({ transcript }: SpeechCommand) => {
      const target = resolveSpeechTarget(transcript);
      if (!target) return;

      if (target.kind === "stop") {
        stopSpeechRef.current();
        toast.message("Voice control stopped");
        return;
      }

      if (target.kind === "next" || target.kind === "prev") {
        const currentIndex = pages.indexOf(pathnameRef.current);
        if (currentIndex === -1) return;

        if (target.kind === "next") {
          const nextIndex = currentIndex < pages.length - 1 ? currentIndex + 1 : 0;
          navigate(pages[nextIndex]);
          toast.message("Next page");
        } else {
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : pages.length - 1;
          navigate(pages[prevIndex]);
          toast.message("Previous page");
        }

        return;
      }

      if (target.kind === "route") {
        navigate(target.route);
        toast.message(`Navigating to ${target.route}`);
      }
    },
    [navigate, resolveSpeechTarget],
  );

  const speech = useSpeechCommands({
    lang: "en-US",
    continuous: true,
    interimResults: true,
    autoRestart: true,
    onFinal: handleSpeechFinal,
  });

  useEffect(() => {
    stopSpeechRef.current = speech.stop;
  }, [speech.stop]);

  const takeScreenshot = useCallback(async () => {
    try {
      toast.message("Taking screenshot…");

      // Hide gesture UI overlays so they don't appear in the screenshot.
      const overlays = Array.from(
        document.querySelectorAll<HTMLElement>("[data-gesture-ui]"),
      );
      const previousVisibility = overlays.map((el) => el.style.visibility);
      overlays.forEach((el) => {
        el.style.visibility = "hidden";
      });

      // Let the browser paint the hidden state.
      await new Promise((r) => requestAnimationFrame(() => r(null)));

      const { default: html2canvas } = await import("html2canvas");
      // Capture ONLY the visible viewport (window), not the full page.
      const canvas = await html2canvas(document.documentElement, {
        useCORS: true,
        foreignObjectRendering: true,
        backgroundColor: null,
        scale: Math.min(2, window.devicePixelRatio || 1),
        x: window.scrollX,
        y: window.scrollY,
        width: window.innerWidth,
        height: window.innerHeight,
        onclone: (clonedDoc) => {
          // html2canvas can render heavy glow/shadow styles as solid rectangles.
          // Disable glow effects only for the screenshot clone.
          const style = clonedDoc.createElement("style");
          style.textContent = `
            .glow-text, .text-glow { text-shadow: none !important; }
            .glow-border { box-shadow: none !important; }
          `;
          clonedDoc.head.appendChild(style);
        },
      });

      // Restore overlays
      overlays.forEach((el, i) => {
        el.style.visibility = previousVisibility[i] ?? "";
      });

      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `ai-navigator-${new Date().toISOString().replace(/[:.]/g, "-")}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      toast.success("Screenshot saved");
    } catch (err) {
      console.error("Screenshot failed", err);
      toast.error("Screenshot failed");
    }
  }, []);

  const pathnameRef = useRef(location.pathname);
  useEffect(() => {
    pathnameRef.current = location.pathname;
  }, [location.pathname]);

  const cameraControlsRef = useRef<{
    start: () => void;
    stop: () => void;
    enabled: boolean;
  }>({
    start: () => {},
    stop: () => {},
    enabled: false,
  });

  const handleGesture = useCallback(
    (gesture: GestureType) => {
      const currentIndex = pages.indexOf(pathnameRef.current);

      switch (gesture) {
        case "thumbs_up":
          // Next page
          if (currentIndex < pages.length - 1) {
            navigate(pages[currentIndex + 1]);
          } else {
            navigate(pages[0]); // Loop back to first page
          }
          break;
        case "peace":
          // Previous page
          if (currentIndex > 0) {
            navigate(pages[currentIndex - 1]);
          } else {
            navigate(pages[pages.length - 1]); // Loop to last page
          }
          break;
        case "pointing":
          // Pointing is used for cursor movement + scrolling
          break;
        case "open_palm":
          // Navigate to home
          navigate("/");
          break;
        case "three_finger":
          // Take screenshot
          void takeScreenshot();
          break;
      }
    },
    [navigate, takeScreenshot],
  );

  const {
    videoRef,
    canvasRef,
    gesture,
    isDetecting,
    cameraEnabled,
    pointer,
    startCamera,
    stopCamera,
    error,
  } = useGestureDetection({
    onGestureDetected: handleGesture,
    cooldownMs: 1500, // Prevent rapid navigation
  });

  // Dwell-to-click while pointing (finger up). This provides click support even
  // with jittery tracking by requiring a short stable hover.
  const clickStateRef = useRef<{
    element: HTMLElement | null;
    startedAt: number;
    startX: number;
    startY: number;
    lastClickAt: number;
  }>({
    element: null,
    startedAt: 0,
    startX: 0,
    startY: 0,
    lastClickAt: 0,
  });

  const findClickableAtPoint = useCallback((x: number, y: number) => {
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    if (!el) return null;

    const clickable = el.closest(
      'a,button,[role="button"],input[type="button"],input[type="submit"],[data-gesture-click]',
    ) as HTMLElement | null;

    if (!clickable) return null;

    if (
      clickable.getAttribute("aria-disabled") === "true" ||
      (clickable instanceof HTMLButtonElement && clickable.disabled) ||
      (clickable instanceof HTMLInputElement && clickable.disabled)
    ) {
      return null;
    }

    return clickable;
  }, []);

  const dispatchClickAt = useCallback(
    (target: HTMLElement, x: number, y: number) => {
      target.focus?.();

      const eventInit: MouseEventInit = {
        bubbles: true,
        cancelable: true,
        clientX: x,
        clientY: y,
        button: 0,
      };

      // Mimic a basic click sequence for better compatibility with UI libs.
      target.dispatchEvent(new MouseEvent("pointerdown", eventInit));
      target.dispatchEvent(new MouseEvent("mousedown", eventInit));
      target.dispatchEvent(new MouseEvent("pointerup", eventInit));
      target.dispatchEvent(new MouseEvent("mouseup", eventInit));
      target.dispatchEvent(new MouseEvent("click", eventInit));
    },
    [],
  );

  useEffect(() => {
    if (!cameraEnabled || !pointer || gesture !== "pointing") {
      clickStateRef.current.element = null;
      clickStateRef.current.startedAt = 0;
      setSelectProgress(0);
      return;
    }

    const DWELL_MS = 700;
    const MOVE_TOLERANCE_PX = 22;
    const CLICK_COOLDOWN_MS = 900;

    let raf: number | null = null;
    const tick = () => {
      const now = Date.now();
      const clickable = findClickableAtPoint(pointer.x, pointer.y);

      if (!clickable) {
        clickStateRef.current.element = null;
        clickStateRef.current.startedAt = 0;
        setSelectProgress(0);
        raf = requestAnimationFrame(tick);
        return;
      }

      const st = clickStateRef.current;
      const isSame = st.element === clickable;

      if (!isSame) {
        st.element = clickable;
        st.startedAt = now;
        st.startX = pointer.x;
        st.startY = pointer.y;
        setSelectProgress(0);
        raf = requestAnimationFrame(tick);
        return;
      }

      const moved = Math.hypot(pointer.x - st.startX, pointer.y - st.startY);
      if (moved > MOVE_TOLERANCE_PX) {
        st.startedAt = now;
        st.startX = pointer.x;
        st.startY = pointer.y;
        setSelectProgress(0);
        raf = requestAnimationFrame(tick);
        return;
      }

      const elapsed = now - st.startedAt;
      const progress = Math.max(0, Math.min(1, elapsed / DWELL_MS));
      setSelectProgress(progress);

      if (progress >= 1 && now - st.lastClickAt > CLICK_COOLDOWN_MS) {
        st.lastClickAt = now;
        dispatchClickAt(clickable, pointer.x, pointer.y);
        // Reset dwell so it won't immediately click again.
        st.startedAt = now;
        st.startX = pointer.x;
        st.startY = pointer.y;
        setSelectProgress(0);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [cameraEnabled, pointer, gesture, findClickableAtPoint, dispatchClickAt]);

  useEffect(() => {
    cameraControlsRef.current.start = startCamera;
    cameraControlsRef.current.stop = stopCamera;
    cameraControlsRef.current.enabled = cameraEnabled;
  }, [startCamera, stopCamera, cameraEnabled]);

  // Keyboard navigation fallback
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = pages.indexOf(location.pathname);

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        if (currentIndex < pages.length - 1) {
          navigate(pages[currentIndex + 1]);
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        if (currentIndex > 0) {
          navigate(pages[currentIndex - 1]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
        window.scrollBy({ top: -SPEED_PX, left: 0, behavior: "auto" });
      } else if (pointer.y > h - EDGE_PX) {
        window.scrollBy({ top: SPEED_PX, left: 0, behavior: "auto" });
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

      <SpeechOverlay
        supported={speech.supported}
        listening={speech.listening}
        interimTranscript={speech.interimTranscript}
        lastFinalTranscript={speech.lastFinalTranscript}
        error={speech.error}
        onToggle={speech.toggle}
      />

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-16">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>
            © 2024 AI Center of Excellence. Navigate with gestures or keyboard
            arrows.
          </p>
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
