from app.utils import Route
from app.views.main import index

index_routes = [
    Route(
        name='index',
        method='GET',
        path='/',
        handler=index
    )
]
