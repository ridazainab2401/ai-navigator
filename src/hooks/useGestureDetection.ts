import { useEffect, useRef, useState, useCallback } from 'react';

export type GestureType = 'open_palm' | 'closed_fist' | 'pointing' | 'peace' | 'none';

interface GestureState {
  gesture: GestureType;
  confidence: number;
  isDetecting: boolean;
  error: string | null;
}

interface UseGestureDetectionOptions {
  onGestureDetected?: (gesture: GestureType) => void;
  cooldownMs?: number;
}

// Simplified gesture detection using video frame analysis
export function useGestureDetection(options: UseGestureDetectionOptions = {}) {
  const { onGestureDetected, cooldownMs = 1000 } = options;
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastGestureTime = useRef<number>(0);
  const animationFrameRef = useRef<number>();
  
  const [state, setState] = useState<GestureState>({
    gesture: 'none',
    confidence: 0,
    isDetecting: false,
    error: null,
  });

  const [cameraEnabled, setCameraEnabled] = useState(false);

  // Simple hand detection using skin color and shape analysis
  const detectGesture = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number): GestureType => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    let skinPixels = 0;
    let totalPixels = width * height;
    let leftCount = 0;
    let rightCount = 0;
    let topCount = 0;
    let bottomCount = 0;
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Detect skin-colored pixels (simplified)
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Simple skin color detection in RGB
      if (r > 95 && g > 40 && b > 20 &&
          r > g && r > b &&
          Math.abs(r - g) > 15 &&
          r - g > 15 && r - b > 15) {
        skinPixels++;
        
        const pixelIndex = i / 4;
        const x = pixelIndex % width;
        const y = Math.floor(pixelIndex / width);
        
        if (x < centerX) leftCount++;
        else rightCount++;
        if (y < centerY) topCount++;
        else bottomCount++;
      }
    }
    
    const skinRatio = skinPixels / totalPixels;
    
    // No hand detected
    if (skinRatio < 0.02) return 'none';
    
    // Analyze hand shape based on pixel distribution
    const horizontalSpread = Math.abs(leftCount - rightCount) / skinPixels;
    const verticalSpread = Math.abs(topCount - bottomCount) / skinPixels;
    
    // Large spread = open palm
    if (skinRatio > 0.08 && horizontalSpread < 0.3) {
      return 'open_palm';
    }
    
    // Concentrated pixels = fist
    if (skinRatio > 0.04 && skinRatio < 0.12 && horizontalSpread < 0.25 && verticalSpread < 0.25) {
      return 'closed_fist';
    }
    
    // Vertical concentration = pointing
    if (skinRatio > 0.02 && verticalSpread > 0.3) {
      return 'pointing';
    }
    
    // Medium spread = peace sign
    if (skinRatio > 0.05 && horizontalSpread > 0.2 && horizontalSpread < 0.4) {
      return 'peace';
    }
    
    return 'none';
  }, []);

  const processFrame = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !cameraEnabled) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx || video.readyState !== 4) {
      animationFrameRef.current = requestAnimationFrame(processFrame);
      return;
    }
    
    // Draw video frame to canvas
    canvas.width = 160;
    canvas.height = 120;
    ctx.drawImage(video, 0, 0, 160, 120);
    
    // Detect gesture
    const gesture = detectGesture(ctx, 160, 120);
    
    const now = Date.now();
    if (gesture !== 'none' && gesture !== state.gesture && now - lastGestureTime.current > cooldownMs) {
      lastGestureTime.current = now;
      setState(prev => ({ ...prev, gesture, confidence: 0.8 }));
      onGestureDetected?.(gesture);
    } else if (gesture === 'none') {
      setState(prev => ({ ...prev, gesture: 'none', confidence: 0 }));
    }
    
    animationFrameRef.current = requestAnimationFrame(processFrame);
  }, [cameraEnabled, cooldownMs, detectGesture, onGestureDetected, state.gesture]);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240, facingMode: 'user' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraEnabled(true);
        setState(prev => ({ ...prev, isDetecting: true, error: null }));
      }
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: 'Camera access denied. Please allow camera access to use gesture controls.',
        isDetecting: false,
      }));
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraEnabled(false);
    setState(prev => ({ ...prev, isDetecting: false, gesture: 'none' }));
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  useEffect(() => {
    if (cameraEnabled) {
      animationFrameRef.current = requestAnimationFrame(processFrame);
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [cameraEnabled, processFrame]);

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
