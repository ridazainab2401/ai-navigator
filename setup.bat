@echo off
echo ====================================
echo AI CoE Gesture Website - Setup
echo ====================================
echo.

echo [1/3] Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed
echo.

echo [2/3] Installing Frontend Dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed
echo.

echo [3/3] Setup Complete!
echo.
echo ====================================
echo Next Steps:
echo ====================================
echo 1. Run: start-servers.bat
echo 2. Open browser to http://localhost:5173
echo 3. Click "Enable Gestures"
echo 4. Use gestures to navigate:
echo    👍 Thumbs Up = Next page
echo    ✌️ Peace Sign = Previous page
echo ====================================
echo.
pause
