# Navigate to the backend directory and run the FastAPI server
Start-Process -NoNewWindow -FilePath powershell -ArgumentList {
    Write-Host "Starting FastAPI server..."
    Set-Location -Path "./backend"
    python -m uvicorn app.api:app --reload
}

# Navigate to the frontend directory and run the SvelteKit dev server
Start-Process -NoNewWindow -FilePath powershell -ArgumentList {
    Write-Host "Starting SvelteKit dev server..."
    Set-Location -Path "./frontend"
    npm install # Run once to ensure dependencies are installed
    npm run dev -- --open
}

# Optional: Keep the script running until stopped manually to monitor the output of both servers
Write-Host "Servers are running. Press Ctrl+C to stop."
Start-Sleep -Seconds 3600
