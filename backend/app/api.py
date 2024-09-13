from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
import json
import os
from database import graph
from database.db import session
api = APIRouter(prefix='')


@api.post('/serialized')
@api.options("/serialized")
async def post_serialized(request: Request):
    # Read the raw JSON data from the request body
    raw_data = await request.body()
    
    # Decode the raw data from bytes to a string
    data_str = raw_data.decode('utf-8')
    
    # Parse the JSON string into a Python dictionary
    try:
        data_dict = json.loads(data_str)
        # Extract and parse the 'data' field if it exists
        if 'graph' in data_dict:
            inner_data_str = data_dict['graph']
            inner_data = json.loads(inner_data_str)
        else:
            raise HTTPException(status_code=400, detail="Field 'data' not found in the JSON.")
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=400, detail=f"Invalid JSON data: {e}")
    
    _graph = graph.Graph(name="name", file=inner_data, args={})
    session.add(_graph)
    session.commit()

    return {"message": "Data saved successfully!"}

@api.get('/download-serialized')
async def download_serialized():
    # Check if the file exists
    
    search_name="name"
    _graph = graph.Graph.query.filter(graph.Graph.name == search_name).first()

    return JSONResponse(content=_graph.file)
@api.get('/test')
def test():
    _graph=graph.Graph(file={})
    session.add(_graph)
    session.commit()
    return {"message": "Hello World"}