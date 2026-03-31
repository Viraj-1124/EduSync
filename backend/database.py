import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'edusync.db')

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
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
