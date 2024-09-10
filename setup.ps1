# Check if Python is installed
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "Python is not installed. Please install Python and try again." -ForegroundColor Red
    exit 1
}

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js is not installed. Please install Node.js and try again." -ForegroundColor Red
    exit 1
}

# Set up the Python virtual environment
Write-Host "Setting up Python virtual environment..." -ForegroundColor Cyan
python -m venv venv
# Activate the virtual environment
& .\venv\Scripts\Activate.ps1

# Install Python dependencies
Write-Host "Installing Python dependencies..." -ForegroundColor Cyan
pip install --upgrade pip
pip install -r requirements.txt

# Deactivate the virtual environment
deactivate

# Set up the SvelteKit frontend
Write-Host "Setting up SvelteKit frontend..." -ForegroundColor Cyan
Set-Location -Path frontend

# Check if npm is installed
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "npm is not installed. Please install npm and try again." -ForegroundColor Red
    exit 1
}

# Install Node.js dependencies
npm install

Write-Host "Setup complete!" -ForegroundColor Green
