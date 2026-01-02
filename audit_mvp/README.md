# AuditPro AI MVP

MVP de auditoría inteligente con landing, formulario, endpoint de ML y dashboard.

## Ejecutar localmente

```bash
python -m pip install -r requirements.txt
uvicorn audit_mvp.app:app --reload
```

Luego visita:
- `http://localhost:8000/` (landing + formulario)
- `http://localhost:8000/dashboard` (dashboard)

## Endpoint ML

`POST /api/ml/analyze`

Campos (form-data):
- `file`: archivo `.xlsx`, `.xls` o `.csv`
- `target_column`: variable objetivo
- `feature_columns`: variables explicativas separadas por coma
- `time_column` (opcional): columna de tiempo
- `forecast_periods` (opcional, 1-6): períodos a proyectar

Si `time_column` está presente se aplica un modelo AR(1); de lo contrario, regresión lineal.
