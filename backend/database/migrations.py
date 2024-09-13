from .db import engine
from . import graph
graph.Base.metadata.create_all(engine)