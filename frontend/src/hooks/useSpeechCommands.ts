import { useCallback, useEffect, useRef, useState } from "react";

export type SpeechCommand = {
  transcript: string;
  confidence?: number;
};

export type UseSpeechCommandsOptions = {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
  onFinal?: (command: SpeechCommand) => void;
  onInterim?: (transcript: string) => void;
  autoRestart?: boolean;
};

type SpeechRecognitionConstructor = new () => SpeechRecognition;

function getSpeechRecognitionConstructor(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function normalizeTranscript(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,!?;:()\[\]{}"']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function useSpeechCommands(options: UseSpeechCommandsOptions = {}) {
  const {
    lang = "en-US",
    continuous = true,
    interimResults = true,
    onFinal,
    onInterim,
    autoRestart = true,
  } = options;

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const shouldBeListeningRef = useRef(false);

  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState<string>("");
  const [lastFinalTranscript, setLastFinalTranscript] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const lastFinalRef = useRef<{ text: string; at: number }>({ text: "", at: 0 });

  useEffect(() => {
    const Ctor = getSpeechRecognitionConstructor();
    if (!Ctor) {
      setSupported(false);
      return;
    }

    setSupported(true);
    const recognition = new Ctor();
    recognition.lang = lang;
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;

    recognition.onstart = () => {
      setListening(true);
      setError(null);
    };

    recognition.onend = () => {
      setListening(false);
      if (autoRestart && shouldBeListeningRef.current) {
        // Small delay prevents rapid restart loops in some browsers.
        window.setTimeout(() => {
          try {
            recognition.start();
          } catch {
            // Ignore (start can throw if already started or not allowed).
          }
        }, 250);
      }
    };

    recognition.onerror = (e) => {
      // Some errors are expected (e.g. "no-speech").
      setError(e.error ?? "speech-error");
    };

    recognition.onresult = (event) => {
      let interim = "";
      let final = "";
      let confidence: number | undefined;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const alt = result?.[0];
        if (!alt) continue;

        if (result.isFinal) {
          final += alt.transcript;
          confidence = alt.confidence;
        } else {
          interim += alt.transcript;
        }
      }

      if (interim) {
        const text = interim.trim();
        setInterimTranscript(text);
        onInterim?.(text);
      }

      if (final) {
        const text = final.trim();

        // Debounce identical finals (common when continuous=true)
        const now = Date.now();
        if (text && !(text === lastFinalRef.current.text && now - lastFinalRef.current.at < 1200)) {
          lastFinalRef.current = { text, at: now };
          setLastFinalTranscript(text);
          setInterimTranscript("");
          onFinal?.({ transcript: text, confidence });
        }
      }
    };

    recognitionRef.current = recognition;
    return () => {
      shouldBeListeningRef.current = false;
      try {
        recognition.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    };
  }, [lang, continuous, interimResults, onFinal, onInterim, autoRestart]);

  const start = useCallback(() => {
    setError(null);
    const recognition = recognitionRef.current;
    if (!recognition) return;

    shouldBeListeningRef.current = true;
    try {
      recognition.start();
    } catch {
      // ignore
    }
  }, []);

  const stop = useCallback(() => {
    const recognition = recognitionRef.current;
    shouldBeListeningRef.current = false;
    if (!recognition) return;

    try {
      recognition.stop();
    } catch {
      // ignore
    }
  }, []);

  const toggle = useCallback(() => {
    if (shouldBeListeningRef.current) stop();
    else start();
  }, [start, stop]);

  return {
    supported,
    listening,
    interimTranscript,
    lastFinalTranscript,
    error,
    start,
    stop,
    toggle,
  };
}
