from fastapi import FastAPI
from app.database import Base, engine
from app.routers import auth, user, account

from fastapi.middleware.cors import CORSMiddleware  # ✅ IMPORT

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Banco Seguro API")

# ✅ MIDDLEWARE CORS (antes de rutas)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Rutas
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(account.router)

@app.get("/")
def read_root():
    return {"message": "Bienvenido al API del Banco Seguro 🏦"}
