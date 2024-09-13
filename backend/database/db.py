from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Define the connection URL for SQLite, assuming the file is in the backend directory
url = "sqlite:///api.db"

# Create an engine using the SQLite URL
engine = create_engine(url)

# Create a sessionmaker bound to the engine
Session = sessionmaker(bind=engine)

# Create a session instance
session = Session()
