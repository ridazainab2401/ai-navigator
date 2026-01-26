# 🎮 Gesture Controls Demo Guide

## How to Use the Gesture Navigation

### Setup (One-time)
1. Double-click `setup.bat` to install all dependencies
2. Wait for installation to complete

### Running the App
1. Double-click `start-servers.bat`
2. Wait for both servers to start (2 terminal windows will open)
3. Open browser to: `http://localhost:5173`

### Enabling Gestures
1. Look for the camera panel in the **bottom-right corner**
2. Click the **"Enable Gestures"** button
3. Allow camera access when your browser asks
4. You'll see yourself in the camera preview

### Gesture Reference Card

```
╔══════════════════════════════════════════════════════════╗
║                    GESTURE CONTROLS                      ║
╠══════════════════════════════════════════════════════════╣
║  👍 THUMBS UP                                            ║
║     └─> Navigate to NEXT page                           ║
║                                                          ║
║  ✌️ PEACE SIGN (Index + Middle fingers)                  ║
║     └─> Navigate to PREVIOUS page                       ║
║                                                          ║
║  ✋ OPEN PALM (All 5 fingers)                            ║
║     └─> Go to HOME page                                 ║
║                                                          ║
║  👆 POINTING (Index finger only)                         ║
║     └─> Select action (reserved for future use)         ║
║                                                          ║
║  ✊ CLOSED FIST (All fingers closed)                     ║
║     └─> Reset action (reserved for future use)          ║
╚══════════════════════════════════════════════════════════╝
```

## 📄 Page Navigation Flow

```
┌─────────┐  👍  ┌──────────┐  👍  ┌──────────┐  👍  ┌───────┐  👍  ┌─────────┐
│  HOME   │ ───> │ RESEARCH │ ───> │ PROJECTS │ ───> │ ABOUT │ ───> │ CONTACT │
└─────────┘      └──────────┘      └──────────┘      └───────┘      └─────────┘
     ↑                                                                       │
     └───────────────────────────────────────────────────────────────────────┘
                                ✋ (Open Palm)
                            (or loop with 👍)
```

## 🎯 Tips for Best Results

### Lighting
- ✅ Use good lighting in front of you
- ✅ Avoid backlighting (window behind you)
- ✅ Even lighting on your hand

### Hand Position
- ✅ Keep hand **15-50cm** from camera
- ✅ Keep hand in camera frame
- ✅ Face palm toward camera

### Gesture Execution
- ✅ Make gestures **clear and distinct**
- ✅ Hold gesture for **1 second**
- ✅ Wait for detection before next gesture
- ⚠️ Don't rush between gestures

### Common Mistakes
- ❌ Hand too close or too far
- ❌ Poor lighting
- ❌ Changing gesture too quickly
- ❌ Partial hand outside frame
- ❌ Unclear finger positions

## 🔍 Visual Feedback

### What to Look For:

1. **Camera Preview** (bottom-right)
   - Green lines showing hand skeleton
   - Red dots on finger joints
   - Your video feed (mirrored)

2. **Gesture Label** (bottom-right panel)
   - Shows current detected gesture
   - Shows associated action

3. **Center Screen Notification** (when gesture detected)
   - Large emoji showing gesture
   - Action text
   - Appears briefly during navigation

4. **Gesture Guide** (bottom-left panel)
   - Quick reference for gestures
   - Always visible for help

## 🧪 Testing Procedure

### Complete Demo Test:
1. ✅ Start with Home page
2. 👍 Show thumbs up → Goes to Research
3. 👍 Show thumbs up → Goes to Projects
4. 👍 Show thumbs up → Goes to About
5. 👍 Show thumbs up → Goes to Contact
6. ✌️ Show peace sign → Goes back to About
7. ✌️ Show peace sign → Goes back to Projects
8. ✋ Show open palm → Returns to Home

**If all steps work ✅ Demo is successful!**

## 🎥 For Recording/Presentation

### Best Practice:
1. Position camera to show:
   - Your hand making gestures
   - Screen showing page changes
   
2. Speak while demonstrating:
   - "I'm showing thumbs up gesture..."
   - "The page is navigating to Research..."
   - "Now showing peace sign to go back..."

3. Highlight features:
   - Real-time hand tracking
   - Smooth page transitions
   - Visual feedback
   - No mouse/keyboard needed

## 🚨 Troubleshooting During Demo

### Gesture Not Detecting:
- Check camera preview is showing
- Improve lighting
- Move hand closer/further
- Make gesture more distinct

### Camera Not Working:
- Refresh browser page
- Allow camera permission
- Check camera not used by other app
- Try Chrome or Edge browser

### Page Not Changing:
- Hold gesture for 1 full second
- Wait for cooldown (1.5 seconds between gestures)
- Ensure gesture is clear and correct

## 🏆 Acceptance Criteria Validation

✅ **Multiple Pages**: 5 pages (Home, Research, Projects, About, Contact)

✅ **Gesture Navigation**: 
   - Thumbs up for next page ✓
   - Peace sign for previous page ✓

✅ **Camera-Based**: MediaPipe Hands with live video feed ✓

✅ **Reliable Detection**: Consistent recognition with proper hand position ✓

✅ **No Mouse/Keyboard**: Complete navigation using gestures only ✓

✅ **Live Demo Ready**: Fully functional with visual feedback ✓

---

**You're ready to demonstrate! 🎉**

For any questions during setup, refer to README.md or SETUP_GUIDE.md
