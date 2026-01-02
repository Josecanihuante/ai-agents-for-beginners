from __future__ import annotations

from dataclasses import dataclass

import pandas as pd


@dataclass(frozen=True)
class ValidationResult:
    dataframe: pd.DataFrame
    features: list[str]
    target: str


class DatasetValidator:
    def validate(self, dataframe: pd.DataFrame, target: str, features: list[str]) -> ValidationResult:
        missing = [column for column in [target, *features] if column not in dataframe.columns]
        if missing:
            raise ValueError(f"Columnas faltantes en el archivo: {', '.join(missing)}")

        data = dataframe[[target, *features]].copy()
        data = data.apply(pd.to_numeric, errors="coerce")
        data = data.dropna()

        if data.empty:
            raise ValueError("Los datos seleccionados no son numéricos o están vacíos.")

        return ValidationResult(dataframe=data, features=features, target=target)
