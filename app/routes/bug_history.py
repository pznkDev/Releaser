from app.views import bug_history
from app.utils import Route

routes = [
    Route(
        name='get_all_bug_history',
        method='GET',
        path='/',
        handler=bug_history.get_all_bugs
    ),
    Route(
        name='get_one_bug_history',
        method='GET',
        path=r'/{bug_id:\d+}/',
        handler=bug_history.get_one_bug
    ),
    Route(
        name='create_bug_history',
        method='POST',
        path=r'/',
        handler=bug_history.create_bug
    ),
    Route(
        name='update_bug_history',
        method='PUT',
        path=r'/{bug_id:\d+}/',
        handler=bug_history.update_bug
    ),
    Route(
        name='delete_bug_history',
        method='DELETE',
        path=r'/{bug_id:\d+}/',
        handler=bug_history.delete_bug
    )
]
