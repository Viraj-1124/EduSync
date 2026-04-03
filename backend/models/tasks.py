from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, nullable=True)
    deadline = Column(String, nullable=True)
    completed = Column(Integer, default=0)  # 0 for False, 1 for True
    created_at = Column(DateTime, default=datetime.utcnow)
