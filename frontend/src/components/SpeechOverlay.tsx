import { motion } from "framer-motion";
import { Mic, MicOff, Volume2 } from "lucide-react";

type SpeechOverlayProps = {
  supported: boolean;
  listening: boolean;
  interimTranscript: string;
  lastFinalTranscript: string;
  error: string | null;
  onToggle: () => void;
};

export function SpeechOverlay({
  supported,
  listening,
  interimTranscript,
  lastFinalTranscript,
  error,
  onToggle,
}: SpeechOverlayProps) {
  const statusText = !supported
    ? "Speech not supported"
    : listening
      ? "Listening…"
      : "Mic off";

  const transcript = interimTranscript || lastFinalTranscript;

  return (
    <div data-gesture-ui className="fixed top-20 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-3 rounded-2xl w-[280px]"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                listening ? "bg-destructive animate-pulse" : "bg-muted-foreground/40"
              }`}
            />
            <div className="text-xs text-muted-foreground">{statusText}</div>
          </div>

          <button
            type="button"
            onClick={onToggle}
            disabled={!supported}
            className={`h-9 w-9 rounded-lg grid place-items-center transition-all ${
              !supported
                ? "bg-secondary/40 text-muted-foreground cursor-not-allowed"
                : listening
                  ? "bg-destructive/20 text-destructive hover:bg-destructive/30"
                  : "bg-primary/20 text-primary hover:bg-primary/30"
            }`}
            aria-label={listening ? "Stop voice" : "Start voice"}
          >
            {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        </div>

        <div className="mt-3 rounded-lg bg-secondary/30 p-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Volume2 className="w-3.5 h-3.5" />
            <span>Say:</span>
          </div>
          <div className="text-xs text-foreground/90 leading-relaxed">
            “Go to research”, “Open projects”, “Navigate to /contact”, “Go home”
          </div>
        </div>

        {transcript && (
          <div className="mt-2 text-[11px] text-muted-foreground break-words">
            Heard: <span className="text-foreground/80">{transcript}</span>
          </div>
        )}

        {error && (
          <div className="mt-2 text-[11px] text-destructive break-words">
            {error}
          </div>
        )}

        {!supported && (
          <div className="mt-2 text-[11px] text-muted-foreground/90">
            Tip: Works best in Chrome/Edge over HTTPS or localhost.
          </div>
        )}
      </motion.div>
    </div>
  );
}
