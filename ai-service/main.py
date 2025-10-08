from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import List, Optional

app = FastAPI(title="Wardrope Whisper AI Service")


class Measurement(BaseModel):
    height_cm: float = Field(..., gt=0)
    weight_kg: float = Field(..., gt=0)
    chest_cm: Optional[float] = None
    waist_cm: Optional[float] = None
    hips_cm: Optional[float] = None


class Preference(BaseModel):
    styles: List[str] = []
    colors: List[str] = []


class RecommendRequest(BaseModel):
    user_id: Optional[str]
    measurements: Optional[Measurement]
    preferences: Optional[Preference]


class RecommendItem(BaseModel):
    product_id: str
    score: float


class SizeRequest(BaseModel):
    product_id: str
    measurements: Measurement


@app.get("/health")
def health():
    return {"ok": True}


@app.post("/recommend", response_model=List[RecommendItem])
def recommend(req: RecommendRequest):
    # Placeholder: deterministic but simple scoring using lengths
    base = len((req.preferences.styles if req.preferences else [])) + len(
        (req.preferences.colors if req.preferences else [])
    )
    items = [
        RecommendItem(product_id="1", score=0.6 + base * 0.01),
        RecommendItem(product_id="2", score=0.55 + base * 0.01),
        RecommendItem(product_id="3", score=0.5 + base * 0.01),
    ]
    return items


@app.post("/size")
def size(req: SizeRequest):
    # Placeholder sizing heuristic
    bmi = req.measurements.weight_kg / ((req.measurements.height_cm / 100) ** 2)
    if bmi < 20:
        sz = "S"
    elif bmi < 25:
        sz = "M"
    elif bmi < 30:
        sz = "L"
    else:
        sz = "XL"
    return {"product_id": req.product_id, "size": sz}



