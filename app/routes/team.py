from app.views import team
from app.utils import Route

routes = [
    Route(
        name='get_all_teams',
        method='GET',
        path='/',
        handler=team.get_all_teams
    )
]
