# 📂 Complete Project Structure

```
ai-navigator/
│
├── 📁 frontend/                          # React Frontend Application
│   ├── 📁 public/
│   │   └── robots.txt
│   │
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── GestureOverlay.tsx        # Camera preview & gesture display
│   │   │   ├── Navigation.tsx            # Top navigation bar
│   │   │   ├── NavLink.tsx              # Navigation link component
│   │   │   └── 📁 ui/                   # 40+ Shadcn UI components
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── input.tsx
│   │   │       └── ... (40+ components)
│   │   │
│   │   ├── 📁 pages/                    # All website pages
│   │   │   ├── HomePage.tsx             # 🏠 Landing page
│   │   │   ├── ResearchPage.tsx         # 🔬 Research areas
│   │   │   ├── ProjectsPage.tsx         # 📁 Projects showcase
│   │   │   ├── AboutPage.tsx            # ℹ️ Team & mission
│   │   │   ├── ContactPage.tsx          # 📧 Contact form & info
│   │   │   └── NotFound.tsx             # 404 page
│   │   │
│   │   ├── 📁 hooks/
│   │   │   ├── useGestureDetection.ts   # 🎯 MediaPipe gesture detection
│   │   │   ├── use-mobile.tsx
│   │   │   └── use-toast.ts
│   │   │
│   │   ├── 📁 lib/
│   │   │   └── utils.ts                 # Utility functions
│   │   │
│   │   ├── 📁 test/
│   │   │   ├── example.test.ts
│   │   │   └── setup.ts
│   │   │
│   │   ├── App.tsx                      # Main app with routing
│   │   ├── App.css
│   │   ├── main.tsx                     # Entry point
│   │   ├── index.css                    # Global styles
│   │   └── vite-env.d.ts
│   │
│   ├── components.json                  # Shadcn config
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json                     # Frontend dependencies
│   ├── postcss.config.js
│   ├── tailwind.config.ts               # Tailwind configuration
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts                   # Vite configuration
│   ├── vitest.config.ts
│   └── bun.lockb
│
├── 📁 backend/                          # Node.js + Express Backend
│   ├── server.js                        # API server with routes
│   ├── package.json                     # Backend dependencies
│   ├── .env                             # Environment variables
│   └── .gitignore
│
├── 📄 README.md                         # 📖 Complete documentation
├── 📄 SETUP_GUIDE.md                    # 🚀 Quick setup (3 steps)
├── 📄 DEMO_GUIDE.md                     # 🎮 Gesture demo guide
├── 📄 PROJECT_SUMMARY.md                # 🎯 Requirements checklist
├── 📄 PROJECT_STRUCTURE.md              # 📂 This file
│
├── 🔧 setup.bat                         # Windows: Install dependencies
├── 🔧 start-servers.bat                 # Windows: Start both servers
│
├── package.json                         # Root package (scripts)
├── package-lock.json
└── .gitignore

```

## 📊 File Count Summary

| Category | Count | Details |
|----------|-------|---------|
| **Pages** | 6 | Home, Research, Projects, About, Contact, 404 |
| **Components** | 45+ | GestureOverlay, Navigation, 40+ UI components |
| **Hooks** | 3 | useGestureDetection, use-mobile, use-toast |
| **Documentation** | 5 | README, SETUP, DEMO, SUMMARY, STRUCTURE |
| **Scripts** | 2 | setup.bat, start-servers.bat |
| **Config Files** | 10+ | Vite, TypeScript, Tailwind, ESLint, etc. |

## 🔑 Key Files Explained

### Frontend Key Files

| File | Purpose | Technologies |
|------|---------|-------------|
| `useGestureDetection.ts` | Hand gesture recognition | MediaPipe Hands, Camera Utils |
| `GestureOverlay.tsx` | Camera UI & gesture feedback | React, Framer Motion |
| `App.tsx` | Main app, routing, gesture handling | React Router, React Hooks |
| `*Page.tsx` | Individual page components | React, TypeScript, Tailwind |

### Backend Key Files

| File | Purpose | Endpoints |
|------|---------|-----------|
| `server.js` | Express API server | /api/health, /api/research, /api/projects, /api/about |
| `.env` | Configuration | PORT=5000 |

### Setup & Documentation

| File | Purpose | For |
|------|---------|-----|
| `README.md` | Complete project guide | Developers & Users |
| `SETUP_GUIDE.md` | Quick 3-step setup | First-time setup |
| `DEMO_GUIDE.md` | Gesture demo instructions | Evaluation & Demo |
| `PROJECT_SUMMARY.md` | Requirements checklist | Evaluation |
| `setup.bat` | Automated install | Windows users |
| `start-servers.bat` | Start both servers | Windows users |

## 🎯 Gesture Detection Flow

```
┌─────────────────────────────────────────────────────────────┐
│ User shows gesture to camera                                │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ MediaPipe Hands (useGestureDetection.ts)                    │
│ • Detects hand landmarks (21 points)                        │
│ • Analyzes finger positions                                 │
│ • Identifies gesture type                                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ GestureOverlay.tsx                                          │
│ • Displays detected gesture                                 │
│ • Shows visual feedback                                     │
│ • Updates camera preview                                    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ App.tsx (handleGesture)                                     │
│ • Receives gesture event                                    │
│ • Determines navigation action                              │
│ • Triggers page change                                      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ React Router                                                │
│ • Navigates to new page                                     │
│ • Animates transition                                       │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Startup Flow

```
1. User runs: start-servers.bat
   │
   ├─► Terminal 1: cd backend && npm start
   │   └─► Backend starts on http://localhost:5000
   │
   └─► Terminal 2: cd frontend && npm run dev
       └─► Frontend starts on http://localhost:5173
           │
           └─► User opens browser
               │
               ├─► React app loads
               │
               ├─► User clicks "Enable Gestures"
               │
               ├─► Camera permission requested
               │
               ├─► MediaPipe initializes
               │
               └─► Ready for gesture control! ✨
```

## 📦 Dependencies Overview

### Frontend Dependencies (package.json)
- **Core**: react, react-dom, react-router-dom
- **Gesture**: @mediapipe/hands, @mediapipe/camera_utils
- **UI**: @radix-ui/*, lucide-react, framer-motion
- **Styling**: tailwindcss, tailwindcss-animate
- **Forms**: react-hook-form, zod
- **Build**: vite, typescript, vitest

### Backend Dependencies (package.json)
- **Core**: express
- **Middleware**: cors, dotenv
- **Dev**: nodemon

## 🎨 UI Component Tree

```
App
├── Navigation
│   ├── Logo (Brain icon)
│   ├── NavLink (Home)
│   ├── NavLink (Research)
│   ├── NavLink (Projects)
│   ├── NavLink (About)
│   └── NavLink (Contact)
│
├── Routes
│   ├── HomePage
│   ├── ResearchPage
│   ├── ProjectsPage
│   ├── AboutPage
│   ├── ContactPage
│   └── NotFound
│
├── GestureOverlay
│   ├── Camera Preview
│   ├── Gesture Display
│   ├── Toggle Button
│   └── Error Message
│
├── Gesture Guide (bottom-left)
│   └── Gesture List
│
└── Footer
```

## 🔧 Configuration Files

| File | Purpose | Key Settings |
|------|---------|-------------|
| `vite.config.ts` | Vite build config | Port 5173, React plugin |
| `tailwind.config.ts` | Tailwind CSS | Custom colors, animations |
| `tsconfig.json` | TypeScript | Path aliases, strict mode |
| `eslint.config.js` | Linting rules | React, TypeScript rules |
| `vitest.config.ts` | Testing setup | Test environment |

## 📈 Technology Choices

| Requirement | Technology | Why? |
|------------|------------|------|
| Gesture Recognition | MediaPipe Hands | Industry-standard, accurate, real-time |
| Frontend Framework | React 18 | Modern, component-based, large ecosystem |
| Type Safety | TypeScript | Catch errors early, better IDE support |
| Styling | Tailwind CSS | Rapid development, consistent design |
| Animation | Framer Motion | Smooth, declarative animations |
| Routing | React Router v6 | Standard React routing solution |
| Backend | Express.js | Simple, flexible, widely used |
| Build Tool | Vite | Fast HMR, modern, optimized builds |

---

## ✅ Verification Checklist

Use this to verify complete setup:

- [ ] `/frontend/` folder exists with all files
- [ ] `/backend/` folder exists with server.js
- [ ] 6 page files in `frontend/src/pages/`
- [ ] `useGestureDetection.ts` in `frontend/src/hooks/`
- [ ] `GestureOverlay.tsx` in `frontend/src/components/`
- [ ] Both `package.json` files present
- [ ] All 5 documentation files (README, SETUP, DEMO, SUMMARY, STRUCTURE)
- [ ] Both batch scripts (setup.bat, start-servers.bat)
- [ ] MediaPipe dependencies in frontend package.json

**All checked? Project is complete! ✨**
