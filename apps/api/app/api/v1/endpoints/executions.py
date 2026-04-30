from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_executions():
    return {'status': 'ok', 'component': 'executions'}
