from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models
from app.deps import get_db
from app.core.jwt import get_current_user

router = APIRouter(prefix="/accounts", tags=["accounts"])

@router.get("/me")
def get_my_account(user=Depends(get_current_user), db: Session = Depends(get_db)):
    account = db.query(models.Account).filter(models.Account.user_id == int(user["sub"])).first()
    if not account:
        raise HTTPException(status_code=404, detail="Cuenta no encontrada")
    return {
        "saldo": account.balance,
        "ultima_actualizacion": account.last_update
    }

@router.post("/transfer")
def transfer_funds(to_username: str, amount: float, user=Depends(get_current_user), db: Session = Depends(get_db)):
    if amount <= 0:
        raise HTTPException(status_code=400, detail="Monto inválido")

    sender = db.query(models.User).filter(models.User.id == int(user["sub"])).first()
    receiver = db.query(models.User).filter(models.User.username == to_username).first()

    if not receiver:
        raise HTTPException(status_code=404, detail="Destino no encontrado")

    sender_acc = db.query(models.Account).filter(models.Account.user_id == sender.id).first()
    receiver_acc = db.query(models.Account).filter(models.Account.user_id == receiver.id).first()

    if sender_acc.balance < amount:
        raise HTTPException(status_code=400, detail="Saldo insuficiente")

    sender_acc.balance -= amount
    receiver_acc.balance += amount
    db.commit()

    return {"message": "Transferencia completada exitosamente"}
