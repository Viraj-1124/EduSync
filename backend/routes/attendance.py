from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.attendance_service import calculate_attendance

router = APIRouter()

class AttendanceRequest(BaseModel):
    total: int
    attended: int

@router.post("/calculate")
def calculate(data: AttendanceRequest):
    if data.total <= 0:
        raise HTTPException(status_code=400, detail="Total lectures must be greater than 0")
        
    if data.attended < 0 or data.attended > data.total:
        raise HTTPException(status_code=400, detail="Invalid attended lectures amount")

    result = calculate_attendance(data.total, data.attended)
    
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
        
    return result
