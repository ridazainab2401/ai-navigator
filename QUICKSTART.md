# ⚡ QUICK START - AI CoE Gesture Website

## 🚀 Get Running in 3 Minutes!

### Option 1: Windows Automated (RECOMMENDED)

```bash
# Step 1: Install everything
Double-click: setup.bat

# Step 2: Start servers
Double-click: start-servers.bat

# Step 3: Open browser
http://localhost:5173
```

### Option 2: Manual Setup

```bash
# Terminal 1 - Backend
cd backend
npm install
npm start

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev

# Browser
Open: http://localhost:5173
```

## 🎮 Start Using Gestures

1. Click "Enable Gestures" (bottom-right)
2. Allow camera access
3. Show gestures:
   - 👍 = Next page
   - ✌️ = Previous page

## 📚 Need Help?

- **Setup Issues?** → Read `SETUP_GUIDE.md`
- **Gesture Demo?** → Read `DEMO_GUIDE.md`
- **Full Docs?** → Read `README.md`
- **Requirements Check?** → Read `PROJECT_SUMMARY.md`

## ✅ Is It Working?

You should see:

- ✓ Backend: "Server running on port 5000"
- ✓ Frontend: Opens in browser automatically
- ✓ Website: AI CoE homepage loads
- ✓ Camera: Preview appears when enabled
- ✓ Gestures: Thumbs up navigates pages

## 🐛 Quick Fixes

**Backend won't start?**

```bash
# Kill port 5000 processes
netstat -ano | findstr :5000
taskkill /PID <number> /F
```

**Frontend errors?**

```bash
cd frontend
rm -rf node_modules
npm install
```

**Camera not working?**

- Use Chrome or Edge
- Allow camera permission
- Check camera isn't used elsewhere

---

**Ready to go! 🎉**

Show 👍 to go next page, ✌️ to go back!
