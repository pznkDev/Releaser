from app.views import release
from app.utils import Route

routes = [
    Route(
        name='get_one_release',
        method='GET',
        path=r'/',
        handler=release.get_last_release
    ),
    Route(
        name='create_release',
        method='POST',
        path=r'/',
        handler=release.create_release
    )
]
