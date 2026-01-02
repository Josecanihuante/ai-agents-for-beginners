from __future__ import annotations

import io
from dataclasses import dataclass

import pandas as pd
from fastapi import UploadFile


@dataclass(frozen=True)
class DatasetInfo:
    dataframe: pd.DataFrame
    columns: list[str]
    row_count: int


class DatasetLoader:
    _allowed_extensions = {".xlsx", ".xls", ".csv"}

    def load(self, upload: UploadFile) -> DatasetInfo:
        filename = (upload.filename or "").lower()
        extension = "." + filename.split(".")[-1] if "." in filename else ""
        if extension not in self._allowed_extensions:
            raise ValueError("Formato de archivo no permitido. Usa .xlsx, .xls o .csv.")

        content = upload.file.read()
        buffer = io.BytesIO(content)
        if extension == ".csv":
            dataframe = pd.read_csv(buffer)
        else:
            dataframe = pd.read_excel(buffer)

        if dataframe.empty:
            raise ValueError("El archivo no contiene datos válidos.")

        dataframe.columns = [str(column).strip() for column in dataframe.columns]
        return DatasetInfo(dataframe=dataframe, columns=list(dataframe.columns), row_count=len(dataframe))
