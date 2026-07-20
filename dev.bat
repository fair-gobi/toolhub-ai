@echo off
cd /d C:\Users\DELL\toolhub-fresh
echo Starting ToolHub dev server...
start code .
timeout /t 2
npm run dev