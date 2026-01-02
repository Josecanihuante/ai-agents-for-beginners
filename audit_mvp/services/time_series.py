from __future__ import annotations

from dataclasses import dataclass

import numpy as np
import pandas as pd


@dataclass(frozen=True)
class TimeSeriesResult:
    intercept: float
    coefficient: float
    forecasts: list[float]
    last_observation: float


class AutoRegressiveService:
    def fit_and_forecast(
        self,
        dataframe: pd.DataFrame,
        target: str,
        time_column: str,
        periods: int,
    ) -> TimeSeriesResult:
        series = dataframe[[time_column, target]].dropna().copy()
        series[time_column] = pd.to_datetime(series[time_column], errors="coerce")
        series = series.dropna().sort_values(time_column)

        values = series[target].to_numpy(dtype=float)
        if len(values) < 3:
            raise ValueError("Se requieren al menos 3 observaciones para la serie de tiempo.")

        y = values[1:]
        x = values[:-1]
        x_design = np.column_stack([np.ones(len(x)), x])
        coefficients, *_ = np.linalg.lstsq(x_design, y, rcond=None)
        intercept = float(coefficients[0])
        slope = float(coefficients[1])

        forecasts: list[float] = []
        last_value = float(values[-1])
        for _ in range(periods):
            next_value = intercept + slope * last_value
            forecasts.append(float(next_value))
            last_value = next_value

        return TimeSeriesResult(
            intercept=intercept,
            coefficient=slope,
            forecasts=forecasts,
            last_observation=float(values[-1]),
        )
