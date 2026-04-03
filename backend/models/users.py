from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String, nullable=True)
    google_id = Column(String, nullable=True)
    leetcode_username = Column(String, nullable=True)

    access_token = Column(String, nullable=True)
    refresh_token = Column(String, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)