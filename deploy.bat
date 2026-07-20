@echo off
cd /d C:\Users\DELL\toolhub-fresh
echo === ToolHub Deploy ===
git add .
git status
set /p msg="Commit message: "
git commit -m "%msg%"
git push origin main
echo.
echo === Pushed! Vercel will build in 30s ===
pause