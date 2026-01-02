# MVP web para auditoría con ML/AI

Este directorio contiene un esqueleto funcional para una **web comercial + SaaS ligera** orientada a auditoría con ML/AI. El objetivo es ofrecer:

- Sitio comercial con propuesta de valor y captación.
- Plataforma SaaS básica por cliente con panel de resultados.
- API backend modular siguiendo SOLID.
- Microservicio ML aislado.

## Alcance del MVP

- Web informativa con CTA y formulario de contacto.
- API para crear proyectos y subir datasets (simulado).
- Microservicio ML con endpoints de inferencia y explicación.
- Dashboard básico con métricas y exportación (mock).
- Autenticación y roles (estructurado para OIDC/JWT).

## Arquitectura propuesta (SOLID)

```
Presentation (React)
  └── API Layer (Express Controllers/Routes)
       └── Application Layer (Use Cases / Services)
            └── Domain Layer (Entities / Interfaces / DTOs)
                 └── Infrastructure Layer (Repos / Storage / ML client)
```

- **SRP**: cada clase realiza una tarea concreta.
- **OCP**: interfaces como `IModelEvaluator` permiten nuevas estrategias.
- **LSP**: repositorios cumplen contratos definidos.
- **ISP**: interfaces separadas de lectura/escritura.
- **DIP**: la capa de aplicación depende de abstracciones.

## Stack recomendado

- **Frontend**: React + TypeScript + Tailwind (este MVP usa CSS base).
- **Backend**: Node + Express + TypeScript (arquitectura por capas).
- **ML**: FastAPI + scikit-learn (endpoint de ejemplo).
- **DB**: PostgreSQL + Redis (no configurados en este skeleton).
- **Observabilidad**: Sentry + Prometheus (referencias en README).

## Seguridad (resumen)

- CSP, HSTS, X-Frame-Options y Helmet en API.
- OAuth2/OIDC o JWT con refresh tokens.
- Sanitización y validación en backend.
- Encriptación en tránsito y en reposo.

## Estructura

```
16-audit-ml-mvp/
├── frontend/
├── backend/
└── ml-service/
```

## Ejecución local (referencial)

> Este MVP es un esqueleto. Ajusta dependencias y secrets antes de usar en producción.

### Frontend

```bash
cd 16-audit-ml-mvp/frontend
npm install
npm run dev
```

### Backend

```bash
cd 16-audit-ml-mvp/backend
npm install
npm run dev
```

### ML Service

```bash
cd 16-audit-ml-mvp/ml-service
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Próximos pasos sugeridos

- Integrar base de datos y almacenamiento S3.
- Implementar RBAC y MFA.
- Integrar CI/CD con escaneo SCA y contenedores.
- Añadir dashboards reales y exportación PDF.
