from app.views import auth

from utils import Route

routes = [
    Route(
        name='signin',
        method='POST',
        path='/signin/',
        handler=auth.signin
    ),
    Route(
        name='signout',
        method='POST',
        path='/signout/',
        handler=auth.signout
    )
]
