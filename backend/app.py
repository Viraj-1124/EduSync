from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import init_db
from routes.tasks import router as tasks_router
from routes.attendance import router as attendance_router

def create_app() -> FastAPI:
    app = FastAPI(
        title="EduSync API",
        description="EduSync Phase 1 MVP Backend powered by FastAPI",
        version="1.0.0"
    )

    # Enable CORS for frontend
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"], # Allowing all origins for simple local dev
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Initialize SQLite database schema
    init_db()

    # Register APIRouters instead of Blueprints
    app.include_router(tasks_router, prefix="/tasks", tags=["Tasks"])
    app.include_router(attendance_router, prefix="/attendance", tags=["Attendance Tracker"])

    @app.get("/")
    def index():
        return {"message": "EduSync FastAPI is running!"}

    return app

app = create_app()

if __name__ == "__main__":
    import uvicorn
    # uvicorn.run will start the API on http://127.0.0.1:5000
    uvicorn.run("app:app", host="127.0.0.1", port=5000, reload=True)
