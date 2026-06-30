@echo off
REM ============================================================
REM  MelodyCraft - stop the local dev server
REM  Kills whatever is listening on port 3000.
REM ============================================================

echo Stopping MelodyCraft dev server on port 3000...
powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }"
echo Done.
timeout /t 2 >nul
