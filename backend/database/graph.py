from sqlalchemy import Column, Integer, String, Boolean, JSON
from sqlalchemy.orm import declarative_base
Base = declarative_base()

class Graph(Base):
    __tablename__ = 'graphs'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    file=Column(JSON)
    args = Column(JSON)