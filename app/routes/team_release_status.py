from app.utils import Route
from app.views import team_release_status

routes = [
    Route(
        name='update_team_release_status',
        method='PUT',
        path=r'/',
        handler=team_release_status.update_release_team_status
    )
]
