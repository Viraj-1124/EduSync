import math

def calculate_attendance(total_lectures, attended_lectures):
    if total_lectures <= 0:
        return {"error": "Total lectures must be greater than 0"}
    if attended_lectures < 0 or attended_lectures > total_lectures:
        return {"error": "Invalid attended lectures"}

    percentage = (attended_lectures / total_lectures) * 100
    
    # max(0, ceil((0.75 * total - attended) / (1 - 0.75)))
    required_lectures = max(0, math.ceil((0.75 * total_lectures - attended_lectures) / (1 - 0.75)))
    
    # max(0, floor((attended / 0.75) - total))
    bunk_allowed = max(0, math.floor((attended_lectures / 0.75) - total_lectures))
    
    return {
        "percentage": round(percentage, 2),
        "required_lectures": required_lectures,
        "bunk_allowed": bunk_allowed,
        "is_safe": percentage >= 75.0
    }
