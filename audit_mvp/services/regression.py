from __future__ import annotations

from dataclasses import dataclass

import numpy as np
import pandas as pd


@dataclass(frozen=True)
class RegressionResult:
    intercept: float
    coefficients: dict[str, float]
    correlations: dict[str, float]
    r2_score: float


class LinearRegressionService:
    def fit(self, dataframe: pd.DataFrame, target: str, features: list[str]) -> RegressionResult:
        X = dataframe[features].to_numpy(dtype=float)
        y = dataframe[target].to_numpy(dtype=float)

        if X.ndim == 1:
            X = X.reshape(-1, 1)

        X_design = np.column_stack([np.ones(len(X)), X])
        coefficients, *_ = np.linalg.lstsq(X_design, y, rcond=None)
        predictions = X_design @ coefficients
        ss_res = float(((y - predictions) ** 2).sum())
        ss_tot = float(((y - y.mean()) ** 2).sum())
        r2_score = 1.0 - ss_res / ss_tot if ss_tot != 0 else 0.0

        intercept = float(coefficients[0])
        feature_coeffs = {
            feature: float(coeff)
            for feature, coeff in zip(features, coefficients[1:], strict=False)
        }
        correlations = {
            feature: float(dataframe[feature].corr(dataframe[target]))
            for feature in features
        }
        return RegressionResult(
            intercept=intercept,
            coefficients=feature_coeffs,
            correlations=correlations,
            r2_score=r2_score,
        )
