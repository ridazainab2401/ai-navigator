import { useEffect, useRef, useState, useCallback } from "react";
import { Hands, Results, HAND_CONNECTIONS } from "@mediapipe/hands";

export type GestureType =
  | "thumbs_up"
  | "peace"
  | "three_finger"
  | "open_palm"
  | "pointing"
  | "closed_fist"
  | "none";

export type PointerPosition = {
  x: number; // clientX in pixels
  y: number; // clientY in pixels
};

type HandednessLabel = "Left" | "Right" | "Unknown";

type Landmark = {
  x: number;
  y: number;
  z?: number;
  visibility?: number;
};

type HandLandmarks = Landmark[];

interface GestureState {
  gesture: GestureType;
  confidence: number;
  isDetecting: boolean;
  error: string | null;
  pointer: PointerPosition | null;
}

interface UseGestureDetectionOptions {
  onGestureDetected?: (gesture: GestureType) => void;
  cooldownMs?: number;
}

// MediaPipe-based gesture detection
export function useGestureDetection(options: UseGestureDetectionOptions = {}) {
  const { onGestureDetected, cooldownMs = 1000 } = options;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const handsRef = useRef<Hands | null>(null);
  const lastGestureTime = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Debounce / stability tuning
  const STABLE_FRAMES = 6; // require gesture to be stable for ~6 frames
  const RELEASE_FRAMES = 6; // require 'none' to be stable before re-arming
  const lastRawGestureRef = useRef<GestureType>("none");
  const stableGestureRef = useRef<GestureType>("none");
  const sameGestureFramesRef = useRef<number>(0);
  const noneFramesRef = useRef<number>(0);
  const triggeredSinceReleaseRef = useRef<boolean>(false);

  // Cursor
  const POINTER_SMOOTHING = 0.25; // 0..1 (higher = less smoothing)
  const POINTER_HIDE_GRACE_MS = 600;
  const lastPointerRef = useRef<PointerPosition | null>(null);
  const smoothedPointerRef = useRef<PointerPosition | null>(null);
  const prevPointerMotionRef = useRef<PointerPosition | null>(null);
  const lastMotionDeltaRef = useRef<number>(0);
  const lastHandSeenAtRef = useRef<number>(0);

  const [state, setState] = useState<GestureState>({
    gesture: "none",
    confidence: 0,
    isDetecting: false,
    error: null,
    pointer: null,
  });

  const [cameraEnabled, setCameraEnabled] = useState(false);

  // Detect gesture from hand landmarks
  const detectGestureFromLandmarks = useCallback(
    (hands: HandLandmarks[], handedness: HandednessLabel): GestureType => {
      if (!hands || hands.length === 0) return "none";
      const hand = hands[0];

      // Get key landmark positions
      const thumb_tip = hand[4];
      const thumb_ip = hand[3];
      const index_tip = hand[8];
      const index_pip = hand[6];
      const middle_tip = hand[12];
      const middle_pip = hand[10];
      const ring_tip = hand[16];
      const ring_pip = hand[14];
      const pinky_tip = hand[20];
      const pinky_pip = hand[18];
      const wrist = hand[0];

      // Helper function to check if finger is extended
      const isFingerExtended = (
        tip: Landmark,
        pip: Landmark,
        wristPoint: Landmark,
      ) => {
        return tip.y < pip.y && tip.y < wrist.y;
      };

      // Count extended fingers
      const indexExtended = isFingerExtended(index_tip, index_pip, wrist);
      const middleExtended = isFingerExtended(middle_tip, middle_pip, wrist);
      const ringExtended = isFingerExtended(ring_tip, ring_pip, wrist);
      const pinkyExtended = isFingerExtended(pinky_tip, pinky_pip, wrist);
      // Thumb logic depends on handedness
      const thumbExtended =
        handedness === "Left"
          ? thumb_tip.x > thumb_ip.x
          : thumb_tip.x < thumb_ip.x;

      // Thumbs up: thumb extended, others closed
      if (
        thumbExtended &&
        !indexExtended &&
        !middleExtended &&
        !ringExtended &&
        !pinkyExtended
      ) {
        return "thumbs_up";
      }
      const POINTER_SMOOTHING = 0.2; // 0..1 (higher = less smoothing)
      // Peace sign: index and middle extended, others closed
      if (indexExtended && middleExtended && !ringExtended && !pinkyExtended) {
        return "peace";
      }

      // Three-finger hold: index, middle, ring extended; pinky closed.
      // Thumb varies a lot by handedness/orientation, so we ignore it.
      if (indexExtended && middleExtended && ringExtended && !pinkyExtended) {
        return "three_finger";
      }

      // Open palm: all fingers extended
      if (indexExtended && middleExtended && ringExtended && pinkyExtended) {
        return "open_palm";
      }

      // Pointing: only index extended
      if (indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
        return "pointing";
      }

      // Closed fist: no fingers extended
      if (
        !indexExtended &&
        !middleExtended &&
        !ringExtended &&
        !pinkyExtended
      ) {
        return "closed_fist";
      }

      return "none";
    },
    [],
  );

  // Handle MediaPipe results
  const onResults = useCallback(
    (results: Results) => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw video frame
      if (results.image) {
        canvas.width = results.image.width;
        canvas.height = results.image.height;
        ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
      }

      // Draw hand landmarks if detected
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        lastHandSeenAtRef.current = Date.now();
        for (const landmarks of results.multiHandLandmarks) {
          // Draw connections
          ctx.strokeStyle = "#00ff00";
          ctx.lineWidth = 2;
          for (const connection of HAND_CONNECTIONS) {
            const [start, end] = connection;
            const startLandmark = landmarks[start];
            const endLandmark = landmarks[end];
            ctx.beginPath();
            ctx.moveTo(
              startLandmark.x * canvas.width,
              startLandmark.y * canvas.height,
            );
            ctx.lineTo(
              endLandmark.x * canvas.width,
              endLandmark.y * canvas.height,
            );
            ctx.stroke();
          }

          // Draw landmarks
          ctx.fillStyle = "#ff0000";
          for (const landmark of landmarks) {
            ctx.beginPath();
            ctx.arc(
              landmark.x * canvas.width,
              landmark.y * canvas.height,
              5,
              0,
              2 * Math.PI,
            );
            ctx.fill();
          }
        }

        // Detect raw gesture for this frame
        const handednessLabel: HandednessLabel =
          results.multiHandedness?.[0]?.label === "Left" ||
          results.multiHandedness?.[0]?.label === "Right"
            ? (results.multiHandedness?.[0]?.label as HandednessLabel)
            : "Unknown";

        const rawGesture = detectGestureFromLandmarks(
          results.multiHandLandmarks as HandLandmarks[],
          handednessLabel,
        );

        // Cursor tracking: show pointer whenever the index finger looks extended.
        // This avoids the cursor disappearing due to minor gesture classification noise.
        const hand0 = (results.multiHandLandmarks as HandLandmarks[])[0];
        const indexTip = hand0?.[8];
        const indexPip = hand0?.[6];
        const wrist = hand0?.[0];
        const indexLikelyExtended = !!(
          indexTip &&
          indexPip &&
          wrist &&
          indexTip.y < indexPip.y &&
          indexTip.y < wrist.y
        );

        if (indexLikelyExtended && indexTip) {
          const width =
            document.documentElement.clientWidth || window.innerWidth;
          const height =
            document.documentElement.clientHeight || window.innerHeight;
          const x = Math.max(0, Math.min(width, (1 - indexTip.x) * width));
          const y = Math.max(0, Math.min(height, indexTip.y * height));
          const rawPos: PointerPosition = { x, y };

          const prevSmooth = smoothedPointerRef.current;
          const smooth: PointerPosition = prevSmooth
            ? {
                x: prevSmooth.x + (rawPos.x - prevSmooth.x) * POINTER_SMOOTHING,
                y: prevSmooth.y + (rawPos.y - prevSmooth.y) * POINTER_SMOOTHING,
              }
            : rawPos;
          smoothedPointerRef.current = smooth;
          lastPointerRef.current = smooth;

          const prevMotion = prevPointerMotionRef.current;
          lastMotionDeltaRef.current = prevMotion
            ? Math.hypot(smooth.x - prevMotion.x, smooth.y - prevMotion.y)
            : 0;
          prevPointerMotionRef.current = smooth;

          setState((prev) => ({ ...prev, pointer: smooth }));
        }

        // Update stability counters
        if (rawGesture === lastRawGestureRef.current) {
          sameGestureFramesRef.current += 1;
        } else {
          lastRawGestureRef.current = rawGesture;
          sameGestureFramesRef.current = 1;
        }

        // Stable gesture decision
        if (
          sameGestureFramesRef.current >= STABLE_FRAMES &&
          rawGesture !== stableGestureRef.current
        ) {
          stableGestureRef.current = rawGesture;
          setState((prev) => ({
            ...prev,
            gesture: rawGesture,
            confidence: Math.min(
              1,
              sameGestureFramesRef.current / STABLE_FRAMES,
            ),
          }));
        }

        // Release tracking
        if (stableGestureRef.current === "none") {
          noneFramesRef.current += 1;
          if (noneFramesRef.current >= RELEASE_FRAMES) {
            triggeredSinceReleaseRef.current = false;
          }
        } else {
          noneFramesRef.current = 0;
        }

        // Trigger once per hold + cooldown
        const now = Date.now();
        const stable = stableGestureRef.current;
        if (
          stable !== "none" &&
          !triggeredSinceReleaseRef.current &&
          now - lastGestureTime.current > cooldownMs
        ) {
          triggeredSinceReleaseRef.current = true;
          lastGestureTime.current = now;
          onGestureDetected?.(stable);
        }
      } else {
        // No hand detected
        // Treat as raw 'none'
        if (lastRawGestureRef.current === "none") {
          sameGestureFramesRef.current += 1;
        } else {
          lastRawGestureRef.current = "none";
          sameGestureFramesRef.current = 1;
        }

        if (
          sameGestureFramesRef.current >= STABLE_FRAMES &&
          stableGestureRef.current !== "none"
        ) {
          stableGestureRef.current = "none";
          setState((prev) => ({ ...prev, gesture: "none", confidence: 0 }));
        }

        noneFramesRef.current += 1;
        if (noneFramesRef.current >= RELEASE_FRAMES) {
          triggeredSinceReleaseRef.current = false;
        }

        const now = Date.now();
        if (now - lastHandSeenAtRef.current > POINTER_HIDE_GRACE_MS) {
          if (state.pointer) {
            lastPointerRef.current = null;
            smoothedPointerRef.current = null;
            prevPointerMotionRef.current = null;
            lastMotionDeltaRef.current = 0;
            setState((prev) => ({ ...prev, pointer: null }));
          }
        }
      }
    },
    [cooldownMs, detectGestureFromLandmarks, onGestureDetected, state.pointer],
  );

  const cleanupCameraResources = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (handsRef.current) {
      handsRef.current.close();
      handsRef.current = null;
    }

    const stream =
      streamRef.current ?? (videoRef.current?.srcObject as MediaStream | null);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    streamRef.current = null;
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  // Initialize MediaPipe Hands
  const initializeMediaPipe = useCallback(async () => {
    if (!videoRef.current) return;

    try {
      // First, request camera access using native browser API
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
      });

      streamRef.current = stream;

      // If the browser/hardware stops the camera stream, surface a clear error.
      const [videoTrack] = stream.getVideoTracks();
      if (videoTrack) {
        videoTrack.onended = () => {
          setState((prev) => ({
            ...prev,
            error: "Camera stream stopped. Please click Enable Gestures again.",
            isDetecting: false,
            gesture: "none",
            pointer: null,
          }));
          setCameraEnabled(false);
        };
      }

      // Set the stream to the video element
      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      // Now initialize MediaPipe
      const hands = new Hands({
        locateFile: (file) => {
          // Pin to the same version as package.json to avoid CDN mismatches
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`;
        },
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      hands.onResults(onResults);
      handsRef.current = hands;

      // Drive MediaPipe with our own requestAnimationFrame loop.
      // This is more reliable than the MediaPipe Camera helper in bundler environments.
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      const pump = async () => {
        const video = videoRef.current;
        const handsInstance = handsRef.current;
        if (!video || !handsInstance) return;

        // HAVE_CURRENT_DATA (>=2) means we have a frame to process.
        if (video.readyState >= 2) {
          try {
            await handsInstance.send({ image: video });
          } catch (sendErr) {
            // Keep the loop alive; transient send errors can happen during tab switches.
            console.warn("MediaPipe send() error", sendErr);
          }
        }

        rafRef.current = requestAnimationFrame(pump);
      };

      rafRef.current = requestAnimationFrame(pump);

      setState((prev) => ({ ...prev, isDetecting: true, error: null }));
      console.log("✅ Camera and MediaPipe initialized successfully");
    } catch (err: unknown) {
      console.error("❌ MediaPipe initialization error:", err);
      const errorName =
        err &&
        typeof err === "object" &&
        "name" in err &&
        typeof (err as { name?: unknown }).name === "string"
          ? (err as { name: string }).name
          : undefined;
      const errorMessage =
        errorName === "NotAllowedError"
          ? "Camera access denied. Please allow camera permissions in your browser."
          : errorName === "NotFoundError"
            ? "No camera found. Please connect a camera and try again."
            : "Failed to initialize gesture detection. Please refresh and try again.";

      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isDetecting: false,
      }));
      setCameraEnabled(false);
    }
  }, [onResults]);

  const startCamera = useCallback(async () => {
    console.log("🎥 Starting camera...");
    try {
      setCameraEnabled(true);
      await initializeMediaPipe();
    } catch (err) {
      console.error("❌ Start camera error:", err);
      setState((prev) => ({
        ...prev,
        error:
          "Camera access denied. Please allow camera access to use gesture controls.",
        isDetecting: false,
      }));
      setCameraEnabled(false);
    }
  }, [initializeMediaPipe]);

  const stopCamera = useCallback(() => {
    console.log("🛑 Stopping camera...");

    cleanupCameraResources();

    setCameraEnabled(false);
    setState((prev) => ({ ...prev, isDetecting: false, gesture: "none" }));
  }, [cleanupCameraResources]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    videoRef,
    canvasRef,
    ...state,
    cameraEnabled,
    startCamera,
    stopCamera,
  };
}
