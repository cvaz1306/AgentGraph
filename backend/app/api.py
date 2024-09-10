from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

@app.post('/serialized')
@app.options("/serialized")
async def post_serialized(request: Request):
    # Read the raw JSON data from the request body
    raw_data = await request.body()
    
    # Decode the raw data from bytes to a string
    data_str = raw_data.decode('utf-8')
    
    # Parse the JSON string into a Python dictionary
    try:
        data_dict = json.loads(data_str)
        # Extract and parse the 'data' field if it exists
        if 'data' in data_dict:
            inner_data_str = data_dict['data']
            inner_data = json.loads(inner_data_str)
        else:
            raise HTTPException(status_code=400, detail="Field 'data' not found in the JSON.")
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=400, detail=f"Invalid JSON data: {e}")
    
    # Save the JSON data directly to a file
    with open('data.json', 'w') as file:
        json.dump(inner_data, file, indent=4)
    
    return {"message": "Data saved successfully!"}

@app.get('/download-serialized')
async def download_serialized():
    # Check if the file exists
    if not os.path.exists('data.json'):
        raise HTTPException(status_code=404, detail="Data file not found")
    
    # Read the JSON data from the file
    with open('data.json', 'r') as file:
        data = json.load(file)
    
    # Return the JSON data as a response
    return JSONResponse(content=data)
