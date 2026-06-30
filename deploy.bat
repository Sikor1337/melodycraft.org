@echo off
REM ============================================================
REM  MelodyCraft - publish to GitHub Pages (gh-pages branch)
REM  Builds the site locally and force-pushes dist/ to gh-pages.
REM  Pages Source must be set to: Deploy from a branch -> gh-pages -> / (root)
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

REM Prevent GitHub Pages from running Jekyll on the output.
type nul > dist\.nojekyll

cd dist
if exist .git rmdir /s /q .git
git init -q
git checkout -q -b gh-pages
git add -A
git commit -q -m "Deploy %date% %time%"
git remote add origin https://github.com/Sikor1337/melodycraft.org.git
git push -f origin gh-pages
cd ..

echo.
echo ============================================================
echo  Deployed. Live in ~1 min: https://sikor1337.github.io/melodycraft.org/
echo ============================================================
pause
