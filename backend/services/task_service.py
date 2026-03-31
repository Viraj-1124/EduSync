from database import get_db_connection

def get_all_tasks():
    conn = get_db_connection()
    tasks = conn.execute('SELECT * FROM tasks ORDER BY completed ASC, deadline ASC').fetchall()
    conn.close()
    return [dict(ix) for ix in tasks]

def create_task(title, description, deadline):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO tasks (title, description, deadline, completed) VALUES (?, ?, ?, ?)',
                   (title, description, deadline, 0))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return get_task_by_id(new_id)

def get_task_by_id(task_id):
    conn = get_db_connection()
    task = conn.execute('SELECT * FROM tasks WHERE id = ?', (task_id,)).fetchone()
    conn.close()
    return dict(task) if task else None

def update_task_status(task_id, completed):
    conn = get_db_connection()
    conn.execute('UPDATE tasks SET completed = ? WHERE id = ?', (1 if completed else 0, task_id))
    conn.commit()
    conn.close()
    return get_task_by_id(task_id)

def delete_task(task_id):
    conn = get_db_connection()
    conn.execute('DELETE FROM tasks WHERE id = ?', (task_id,))
    conn.commit()
    conn.close()
    return True
