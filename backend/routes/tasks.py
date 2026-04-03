from fastapi import APIRouter, HTTPException, status
from typing import Optional, List
from schemas.task_schema import TaskCreate, TaskUpdate
from services.task_service import get_all_tasks, create_task, get_task_by_id, update_task_status, delete_task

router = APIRouter()



@router.get("", response_model=List[dict])
def get_tasks():
    tasks = get_all_tasks()
    return tasks

@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
def add_task(task: TaskCreate):
    new_task = create_task(
        title=task.title,
        description=task.description,
        deadline=task.deadline
    )
    return new_task

@router.put("/{task_id}", response_model=dict)
def update_task(task_id: int, task: TaskUpdate):
    existing_task = get_task_by_id(task_id)
    if not existing_task:
        raise HTTPException(status_code=404, detail="Task not found")
        
    updated = update_task_status(task_id, task.completed)
    return updated

@router.delete("/{task_id}")
def remove_task(task_id: int):
    existing_task = get_task_by_id(task_id)
    if not existing_task:
        raise HTTPException(status_code=404, detail="Task not found")
        
    delete_task(task_id)
    return {"message": "Task deleted successfully"}
