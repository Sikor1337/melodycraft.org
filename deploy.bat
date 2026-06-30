@echo off
REM ============================================================
REM  MelodyCraft - publish to GitHub Pages (main branch /docs)
REM  Builds into docs/ and commits it to main. Single branch.
REM  Pages Source must be: Deploy from a branch -> main -> /docs
REM  Live at https://sikor1337.github.io/melodycraft.org/ (~1 min after push)
REM ============================================================

cd /d "%~dp0"

echo Building...
call npm run build
if errorlevel 1 (
  echo.
  echo Build failed - fix the error above and try again.
  pause
  exit /b 1
)

REM Stop GitHub Pages from running Jekyll on the output.
type nul > docs\.nojekyll

git add docs
git commit -m "Build site (docs) %date% %time%"
git push origin main

echo.
echo ============================================================
echo  Deployed. Live in ~1 min: https://sikor1337.github.io/melodycraft.org/
echo ============================================================
pause
