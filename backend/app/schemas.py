from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# ---------- Auth ----------

class LoginRequest(BaseModel):
    username: str
    password: str

class SecondFactorRequest(BaseModel):
    temp_token: str
    secret_answer: str
    icon_id: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

# ---------- User ----------

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    username: str
    password: str
    secret_question: str
    secret_answer: str
    icon_id: str

class UserOut(UserBase):
    id: int
    role: str
    created_at: datetime

    class Config:
        orm_mode = True
