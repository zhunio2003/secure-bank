from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import models, schemas
from app.core.security import hash_password
from app.deps import get_db
from app.core.jwt import require_role

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", response_model=schemas.UserOut)
def create_user(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.username == user_in.username).first()
    if existing:
        raise HTTPException(status_code=400, detail="El usuario ya existe")

    new_user = models.User(
        username=user_in.username,
        hashed_password=hash_password(user_in.password),
        secret_question=user_in.secret_question,
        secret_answer=user_in.secret_answer,
        icon_id=user_in.icon_id,
        role="user"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    new_account = models.Account(user_id=new_user.id, balance=0.0)
    db.add(new_account)
    db.commit()

    return new_user

@router.get("/", response_model=list[schemas.UserOut])
def get_all_users(db: Session = Depends(get_db), user=Depends(require_role("admin"))):
    return db.query(models.User).all()


from app.core.jwt import get_current_user

@router.put("/me/update")
def update_my_profile(
    update_data: schemas.UserCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    db_user = db.query(models.User).filter(models.User.id == int(user["sub"])).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    db_user.hashed_password = hash_password(update_data.password)
    db_user.secret_question = update_data.secret_question
    db_user.secret_answer = update_data.secret_answer
    db_user.icon_id = update_data.icon_id
    db.commit()

    return {"message": "Perfil actualizado correctamente"}
