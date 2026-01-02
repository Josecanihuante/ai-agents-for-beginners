from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Audit ML Service", version="0.1.0")


class PredictRequest(BaseModel):
    score: float
    control_gap: float
    anomaly_index: float


class PredictResponse(BaseModel):
    risk_level: str
    risk_score: float


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}


@app.post("/predict", response_model=PredictResponse)
async def predict(payload: PredictRequest) -> PredictResponse:
    weighted_score = 0.4 * payload.score + 0.35 * payload.control_gap + 0.25 * payload.anomaly_index
    risk_level = "high" if weighted_score > 0.7 else "medium" if weighted_score > 0.4 else "low"
    return PredictResponse(risk_level=risk_level, risk_score=round(weighted_score, 3))


@app.post("/explain")
async def explain(payload: PredictRequest) -> dict:
    return {
        "feature_importance": {
            "score": 0.4,
            "control_gap": 0.35,
            "anomaly_index": 0.25,
        },
        "note": "Explicación simulada. Sustituir por SHAP/LIME en producción.",
        "input": payload.model_dump(),
    }
