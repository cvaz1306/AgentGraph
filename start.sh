#!/bin/bash

# Start the FastAPI server in the background
echo "Starting FastAPI server..."
cd backend || exit
python3 -m uvicorn app.api:app --reload &
FASTAPI_PID=$!

# Start the SvelteKit dev server in the background
echo "Starting SvelteKit dev server..."
cd ../frontend || exit
npm install # Run once to ensure dependencies are installed
npm run dev -- --open &
SVELTEKIT_PID=$!

# Wait for both processes to be stopped manually (optional)
echo "Servers are running. Press Ctrl+C to stop."
wait $FASTAPI_PID $SVELTEKIT_PID
