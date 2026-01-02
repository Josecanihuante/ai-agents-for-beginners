from __future__ import annotations

from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from audit_mvp.services.data_loader import DatasetLoader
from audit_mvp.services.regression import LinearRegressionService
from audit_mvp.services.time_series import AutoRegressiveService
from audit_mvp.services.validator import DatasetValidator

router = APIRouter()


def _parse_features(features: str) -> list[str]:
    parsed = [item.strip() for item in features.split(",") if item.strip()]
    if not parsed:
        raise ValueError("Debes definir al menos una variable explicativa.")
    return parsed


@router.post("/api/ml/analyze")
async def analyze_dataset(
    file: UploadFile = File(...),
    target_column: str = Form(...),
    feature_columns: str = Form(...),
    time_column: str | None = Form(None),
    forecast_periods: int = Form(2),
):
    try:
        loader = DatasetLoader()
        dataset = loader.load(file)
        features = _parse_features(feature_columns)

        if time_column:
            if time_column not in dataset.columns:
                raise ValueError("La columna de tiempo no existe en el archivo.")

            series_service = AutoRegressiveService()
            result = series_service.fit_and_forecast(
                dataset.dataframe,
                target=target_column,
                time_column=time_column,
                periods=max(1, min(forecast_periods, 6)),
            )

            return {
                "mode": "time_series",
                "rows": dataset.row_count,
                "target": target_column,
                "time_column": time_column,
                "intercept": result.intercept,
                "coefficient": result.coefficient,
                "last_observation": result.last_observation,
                "forecasts": [
                    {"period": index + 1, "value": value}
                    for index, value in enumerate(result.forecasts)
                ],
            }

        validator = DatasetValidator()
        validated = validator.validate(dataset.dataframe, target_column, features)
        regression = LinearRegressionService()
        result = regression.fit(validated.dataframe, validated.target, validated.features)

        return {
            "mode": "regression",
            "rows": dataset.row_count,
            "target": target_column,
            "features": validated.features,
            "intercept": result.intercept,
            "coefficients": result.coefficients,
            "correlations": result.correlations,
            "r2": result.r2_score,
        }
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
