from views import bug
from utils import Route

routes = [
    Route(
        name='get_all_bugs',
        method='GET',
        path='/',
        handler=bug.get_all_bugs
    ),
    Route(
        name='get_one_bug',
        method='GET',
        path=r'/{bug_id:\d+}/',
        handler=bug.get_one_bug
    ),
    Route(
        name='create_bug',
        method='POST',
        path=r'/',
        handler=bug.create_bug
    ),
    Route(
        name='update_bug',
        method='PUT',
        path=r'/{bug_id:\d+}/',
        handler=bug.update_bug
    ),
    Route(
        name='delete_bug',
        method='DELETE',
        path=r'/{bug_id:\d+}/',
        handler=bug.delete_bug
    )
]
