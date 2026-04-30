from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, runbooks, executions, logs, plugins, metrics
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(runbooks.router, prefix="/runbooks", tags=["runbooks"])
api_router.include_router(executions.router, prefix="/executions", tags=["executions"])
api_router.include_router(logs.router, prefix="/logs", tags=["logs"])
api_router.include_router(plugins.router, prefix="/plugins", tags=["plugins"])
api_router.include_router(metrics.router, prefix="/metrics", tags=["metrics"])
