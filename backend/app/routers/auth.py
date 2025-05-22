from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from app import models, schemas
from app.core import security
from app.deps import get_db
from datetime import datetime, timedelta
import uuid

router = APIRouter(prefix="/auth", tags=["auth"])

# Memoria temporal para tokens de 2FA (simulado)
TEMP_TOKENS = {}

# --- LOGIN (Paso 1) ---
@router.post("/login", response_model=dict)
def login(request: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == request.username).first()

    if not user or not security.verify_password(request.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    # ¿Cuenta bloqueada?
    if user.locked_until and datetime.utcnow() < user.locked_until:
        raise HTTPException(status_code=403, detail="Cuenta bloqueada temporalmente")

    # Reiniciar fallos si accede bien
    user.failed_attempts = 0
    db.commit()

    temp_token = str(uuid.uuid4())
    TEMP_TOKENS[temp_token] = {
        "user_id": user.id,
        "expires": datetime.utcnow() + timedelta(minutes=2)
    }

    return {
        "message": "Credenciales correctas. Continúa con segundo factor.",
        "temp_token": temp_token,
        "secret_question": user.secret_question,
        "icon_id_options": ["🦁", "🐱", "🐶", "🐼", "🐧"]  # simulado, luego puedes personalizarlo
    }

# --- 2FA (Paso 2) ---
@router.post("/second-factor", response_model=schemas.TokenResponse)
def second_factor(request: schemas.SecondFactorRequest, db: Session = Depends(get_db)):
    token_data = TEMP_TOKENS.get(request.temp_token)

    if not token_data or token_data["expires"] < datetime.utcnow():
        raise HTTPException(status_code=401, detail="Token expirado o inválido")

    user = db.query(models.User).filter(models.User.id == token_data["user_id"]).first()

    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # Verificar icono y respuesta
    if user.secret_answer != request.secret_answer or user.icon_id != request.icon_id:
        user.failed_attempts += 1
        if user.failed_attempts >= 3:
            user.locked_until = datetime.utcnow() + timedelta(minutes=5)
        db.commit()
        raise HTTPException(status_code=401, detail="Verificación fallida")

    # Reiniciar intentos si todo va bien
    user.failed_attempts = 0
    user.locked_until = None
    db.commit()

    # Generar JWT
    access_token = security.create_access_token(
        data={"sub": str(user.id), "username": user.username, "role": user.role}
    )

    return schemas.TokenResponse(access_token=access_token)
