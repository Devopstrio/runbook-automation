from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_plugins():
    return {'status': 'ok', 'component': 'plugins'}
