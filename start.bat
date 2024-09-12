@echo off

REM Start the FastAPI server in a new command prompt window
start cmd /k "cd /d backend && echo Starting FastAPI server... && python -m uvicorn app.api:app --reload"

REM Start the SvelteKit dev server in another new command prompt window
start cmd /k "cd /d frontend && echo Starting SvelteKit dev server... && npm run dev -- --open"

REM Pause the script to keep the batch file window open (optional)
echo Servers are running. Press any key to exit.
pause
