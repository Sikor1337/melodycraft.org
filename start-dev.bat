@echo off
REM ============================================================
REM  MelodyCraft - local dev launcher
REM  Double-click this file to start the website locally.
REM  It runs on http://127.0.0.1:3000/melodycraft.org/  (Ctrl+C to stop)
REM ============================================================

cd /d "%~dp0"

if not exist node_modules (
  echo Installing dependencies for the first time...
  call npm install
  if errorlevel 1 (
    echo.
    echo npm install failed. Make sure Node.js v18+ is installed.
    pause
    exit /b 1
  )
)

echo.
echo ============================================================
echo  Starting MelodyCraft at  http://127.0.0.1:3000/melodycraft.org/
echo  Keep this window open. Press Ctrl+C to stop the server.
echo ============================================================
echo.

start "" "http://127.0.0.1:3000/melodycraft.org/"
call npm run dev -- --host 127.0.0.1 --port 3000 --strictPort

pause
