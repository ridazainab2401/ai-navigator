# Quick Setup Guide - AI CoE Gesture Website

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies

Open two terminal windows:

**Terminal 1 - Backend:**

```bash
cd backend
npm install
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm install
# or if you have bun:
bun install
```

### Step 2: Start the Servers

**Terminal 1 - Backend:**

```bash
cd backend
npm start
```

✅ Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

✅ Frontend will run on `http://localhost:5173`

### Step 3: Open and Use

1. Open your browser to `http://localhost:5173`
2. Click **"Enable Gestures"** button in bottom-right
3. Allow camera access when prompted
4. Show gestures to navigate:
   - 👍 **Thumbs Up** = Next page
   - ✌️ **Peace Sign** = Previous page

## 📋 Gesture Commands

| Gesture    | Icon | Action                    |
| ---------- | ---- | ------------------------- |
| Thumbs Up  | 👍   | Navigate to next page     |
| Peace Sign | ✌️   | Navigate to previous page |
| Open Palm  | ✋   | Go to home page           |
| Pointing   | 👆   | Select (future)           |

## 🎯 Testing Checklist

- [ ] Backend server running on port 5000
- [ ] Frontend running on port 5173
- [ ] Camera permission granted
- [ ] Gestures panel shows in bottom-right
- [ ] Thumbs up navigates to next page
- [ ] Peace sign navigates to previous page
- [ ] All 5 pages accessible: Home, Research, Projects, About, Contact
- [ ] Hand tracking visible in camera preview

## 🔧 Common Issues

### Camera Not Working

```
Solution: Use Chrome/Edge browser, ensure HTTPS or localhost
```

### Backend Not Starting

```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process if needed (Windows)
taskkill /PID <PID> /F
```

### Frontend Build Errors

```bash
# Clear and reinstall
cd frontend
rm -rf node_modules
npm install
```

## 🎓 For Evaluation/Demo

1. **Start both servers** (backend + frontend)
2. **Open browser** to localhost:5173
3. **Enable gestures** by clicking the button
4. **Show thumbs up** to navigate pages
5. **Show peace sign** to go back
6. **Demonstrate** all 5 pages are accessible via gestures alone

## 📱 Keyboard Shortcuts (Fallback)

- `Arrow Right` or `Arrow Down` = Next page
- `Arrow Left` or `Arrow Up` = Previous page

## ✨ Project Features

✅ 5 pages (Home, Research, Projects, About, Contact)
✅ 2+ gesture recognition (Thumbs Up, Peace Sign)
✅ MediaPipe camera-based detection
✅ Real-time hand tracking
✅ No mouse/keyboard required for navigation
✅ Fully functional for live demo

---

**Ready for evaluation! 🎉**
