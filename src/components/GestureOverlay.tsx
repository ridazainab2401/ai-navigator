import { motion, AnimatePresence } from 'framer-motion';
import { Hand, Camera, CameraOff, ChevronLeft, ChevronRight, MousePointer2 } from 'lucide-react';
import { GestureType } from '@/hooks/useGestureDetection';

interface GestureOverlayProps {
  gesture: GestureType;
  isDetecting: boolean;
  cameraEnabled: boolean;
  onToggleCamera: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  error: string | null;
}

const gestureIcons: Record<GestureType, { icon: React.ReactNode; label: string; action: string }> = {
  open_palm: { icon: '✋', label: 'Open Palm', action: 'Next Page' },
  closed_fist: { icon: '✊', label: 'Closed Fist', action: 'Previous Page' },
  pointing: { icon: '👆', label: 'Pointing', action: 'Select' },
  peace: { icon: '✌️', label: 'Peace Sign', action: 'Menu' },
  none: { icon: '🤚', label: 'No Gesture', action: 'Waiting...' },
};

export function GestureOverlay({
  gesture,
  isDetecting,
  cameraEnabled,
  onToggleCamera,
  videoRef,
  canvasRef,
  error,
}: GestureOverlayProps) {
  const currentGesture = gestureIcons[gesture];

  return (
    <>
      {/* Camera Preview - Bottom Right */}
      <div className="fixed bottom-4 right-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-3 rounded-2xl"
        >
          {/* Camera Feed */}
          <div className="relative mb-3">
            <div className={`w-40 h-30 rounded-lg overflow-hidden bg-secondary ${!cameraEnabled ? 'flex items-center justify-center' : ''}`}>
              {cameraEnabled ? (
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover transform -scale-x-100"
                  playsInline
                  muted
                />
              ) : (
                <div className="text-muted-foreground text-sm text-center p-4">
                  <CameraOff className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  Camera Off
                </div>
              )}
            </div>
            
            {/* Hidden canvas for processing */}
            <canvas ref={canvasRef} className="hidden" />
            
            {/* Detection indicator */}
            {isDetecting && (
              <div className="absolute top-2 left-2">
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
              </div>
            )}
          </div>
          
          {/* Gesture Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={gesture}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center mb-3"
            >
              <div className="text-3xl mb-1">{currentGesture.icon}</div>
              <div className="text-xs text-muted-foreground">{currentGesture.label}</div>
              <div className="text-xs text-primary font-medium">{currentGesture.action}</div>
            </motion.div>
          </AnimatePresence>
          
          {/* Toggle Button */}
          <button
            onClick={onToggleCamera}
            className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-all ${
              cameraEnabled
                ? 'bg-destructive/20 text-destructive hover:bg-destructive/30'
                : 'bg-primary/20 text-primary hover:bg-primary/30'
            }`}
          >
            {cameraEnabled ? (
              <span className="flex items-center justify-center gap-2">
                <CameraOff className="w-4 h-4" /> Stop
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Camera className="w-4 h-4" /> Enable Gestures
              </span>
            )}
          </button>
          
          {/* Error message */}
          {error && (
            <div className="mt-2 text-xs text-destructive text-center">
              {error}
            </div>
          )}
        </motion.div>
      </div>

      {/* Gesture Action Indicator - Center Screen */}
      <AnimatePresence>
        {gesture !== 'none' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 pointer-events-none flex items-center justify-center z-40"
          >
            <div className="glass-card p-8 rounded-3xl glow-border">
              <div className="text-6xl mb-4 text-center">{currentGesture.icon}</div>
              <div className="text-xl font-display text-primary text-center">{currentGesture.action}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gesture Guide - Bottom Left */}
      <div className="fixed bottom-4 left-4 z-50">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-4 rounded-xl text-sm"
        >
          <h4 className="font-display text-primary mb-3 text-xs">GESTURE CONTROLS</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="text-lg">✋</span>
              <ChevronRight className="w-3 h-3 text-primary" />
              <span>Next Page</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="text-lg">✊</span>
              <ChevronLeft className="w-3 h-3 text-primary" />
              <span>Previous Page</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="text-lg">👆</span>
              <MousePointer2 className="w-3 h-3 text-primary" />
              <span>Select Item</span>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
