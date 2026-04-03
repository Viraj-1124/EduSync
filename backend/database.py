from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'edusync.db')
SQLALCHEMY_DATABASE_URL = f"sqlite:///{DB_PATH}"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    # Create all SQLAlchemy models in database
    from models.tasks import Task
    from models.users import User

    Base.metadata.create_all(bind=engine)

    # Keep backward-compatible raw table creation for existing services
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            deadline TEXT,
            completed BOOLEAN NOT NULL CHECK (completed IN (0, 1)) DEFAULT 0
        )
    ''')
    conn.commit()
    conn.close()
