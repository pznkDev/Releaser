from app.routes import account
from routes import (
    auth,
    main
)


def setup_routes(app):
    app.router.add_static('/static', app['templates_root'] + '/static', name='static')

    add_routes(app, main.index_routes)
    add_routes(app, auth.routes, prefix='/api')
    add_routes(app, account.routes, prefix='/api/accounts')


def add_routes(app, routes, prefix=''):
    for route in routes:
        app.router.add_route(
            route.method, prefix + route.path, route.handler, name=route.name
        )
