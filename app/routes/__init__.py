from app.routes import account


def setup_routes(app):
    add_routes(app, account.routes, prefix='/api/accounts')


def add_routes(app, routes, prefix=''):
    for route in routes:
        app.router.add_route(
            route.method, prefix + route.path, route.handler, name=route.name
        )
