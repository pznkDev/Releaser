from utils import Route
from views.main import index

index_routes = [
    Route(
        name='index',
        method='GET',
        path='/',
        handler=index
    )
]
