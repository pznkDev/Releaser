from app.utils import Route
from app.views.main import index


routes = [
    Route(
        name='other',
        method='GET',
        path='/{tail:.*}',
        handler=index
    ),
]
