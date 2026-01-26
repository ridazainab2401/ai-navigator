@echo off
echo ====================================
echo Starting AI CoE Gesture Website
echo ====================================
echo.

echo Starting Backend Server...
start "AI-CoE Backend" cmd /k "cd backend && npm start"
timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "AI-CoE Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ====================================
echo Servers Starting...
echo ====================================
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Two terminal windows will open.
echo Wait for both servers to start.
echo Then open your browser to:
echo http://localhost:5173
echo ====================================
echo.
pause
