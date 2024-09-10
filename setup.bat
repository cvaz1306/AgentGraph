@echo off
:: Check if Python is installed
python --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Python is not installed. Please install Python and try again.
    exit /b
)

:: Check if Node.js is installed
node --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please install Node.js and try again.
    exit /b
)

:: Set up the Python virtual environment
echo Setting up Python virtual environment...
python -m venv venv
call venv\Scripts\activate

:: Install Python dependencies
echo Installing Python dependencies...
pip install --upgrade pip
pip install -r requirements.txt

:: Deactivate the virtual environment
deactivate

:: Set up the SvelteKit frontend
echo Setting up SvelteKit frontend...
cd frontend

:: Check if npm is installed
npm --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo npm is not installed. Please install npm and try again.
    exit /b
)

:: Install Node.js dependencies
npm install

echo Setup complete!
pause
