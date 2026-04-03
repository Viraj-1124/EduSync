from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from schemas.auth_schema import SignupRequest, LoginRequest
from services.auth_service import signup_user, login_user
from services.google_service import get_google_auth_url, handle_google_callback
from models.users import User
from core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------- EMAIL AUTH ---------------- #

@router.post("/signup")
def signup(data: SignupRequest, db: Session = Depends(get_db)):
    try:
        token = signup_user(db, data.email, data.password)
        return {"access_token": token}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    try:
        token = login_user(db, data.email, data.password)
        return {"access_token": token}
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

# ---------------- GOOGLE AUTH ---------------- #

@router.get("/google/login")
async def google_login(request: Request):
    return await get_google_auth_url(request)


@router.get("/google/callback")
async def google_callback(request: Request, db: Session = Depends(get_db)):
    try:
        user_info, token = await handle_google_callback(request)

        email = user_info["email"]
        google_id = user_info["sub"]

        user = db.query(User).filter(User.email == email).first()

        if not user:
            user = User(
                email=email,
                google_id=google_id,
                access_token=token.get("access_token"),
                refresh_token=token.get("refresh_token"),
            )
            db.add(user)
            db.commit()
            db.refresh(user)

        jwt_token = create_access_token({"sub": email})

        return {"access_token": jwt_token}

    except Exception:
        raise HTTPException(status_code=400, detail="Google OAuth failed")