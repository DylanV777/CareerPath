from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.models import Career, User, VocationalProfile
from app.schemas import CareerDetailOut, CareerOut

router = APIRouter(prefix="/careers", tags=["careers"])


@router.get("", response_model=list[CareerOut])
def list_careers(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Career).order_by(Career.name).all()


@router.get("/{career_id}", response_model=CareerDetailOut)
def get_career(career_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    career = db.get(Career, career_id)
    if career is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Carrera no encontrada")

    profile = db.get(VocationalProfile, career.profile_id)
    return CareerDetailOut(id=career.id, name=career.name, description=career.description, profile=profile)
