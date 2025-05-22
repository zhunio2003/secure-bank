from app.database import SessionLocal
from app.core.security import hash_password
from app import models

db = SessionLocal()

# Verificar si ya existe
existing = db.query(models.User).filter(models.User.username == "miguelito").first()
if existing:
    print("⚠️ Usuario ya existe, omitiendo creación")
else:
    user = models.User(
        username="miguelito",
        hashed_password=hash_password("1234"),
        secret_question="¿Tu color favorito?",
        secret_answer="azul",
        icon_id="🐱",
        role="user"
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    account = models.Account(user_id=user.id, balance=1000)
    db.add(account)
    db.commit()
    print("✔️ Usuario de prueba creado")
