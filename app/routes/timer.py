from utils import Route
from views import timer

routes = [
    Route(
        name='get_timer',
        method='GET',
        path='/',
        handler=timer.get_timer
    ),
    Route(
        name='update_timer',
        method='POST',
        path=r'/',
        handler=timer.update_timer
    ),
    Route(
        name='reset_timer',
        method='DELETE',
        path=r'/',
        handler=timer.reset_timer
    )
]
