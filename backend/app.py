from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from uuid import uuid4

app = FastAPI(title="Tracko API")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class ExpenseIn(BaseModel):
    description: str
    amount: float
    category: str
    date: str

class Expense(ExpenseIn):
    id: str

DB: List[Expense] = []

@app.get("/expenses", response_model=List[Expense])
def list_expenses():
    return list(reversed(DB))

@app.post("/expenses", response_model=Expense)
def create_expense(expense: ExpenseIn):
    if not expense.description.strip() or expense.amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid expense payload")
    new = Expense(id=str(uuid4()), **expense.model_dump())
    DB.append(new)
    return new

@app.delete("/expenses/{expense_id}")
def delete_expense(expense_id: str):
    global DB
    before = len(DB)
    DB = [e for e in DB if e.id != expense_id]
    if len(DB) == before:
        raise HTTPException(status_code=404, detail="Not found")
    return {"ok": True}
