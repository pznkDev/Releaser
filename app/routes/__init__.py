from app.routes import (
    account,
    auth,
    bug,
    bug_history,
    main,
    release,
    team,
    timer,
    team_release_status,
    other
)


def setup_routes(app):
    app.router.add_static('/static', app['templates_root'] + '/static', name='static')

    add_routes(app, main.index_routes)
    add_routes(app, auth.routes, prefix='/api')
    add_routes(app, account.routes, prefix='/api/accounts')
    add_routes(app, bug.routes, prefix='/api/bugs')
    add_routes(app, bug_history.routes, prefix='/api/bug_history')
    add_routes(app, release.routes, prefix='/api/release')
    add_routes(app, team.routes, prefix='/api/team')
    add_routes(app, team_release_status.routes, prefix='/api/team_release_status')
    add_routes(app, timer.routes, prefix='/api/timer')

    add_routes(app, other.routes)


def add_routes(app, routes, prefix=''):
    for route in routes:
        app.router.add_route(
            route.method, prefix + route.path, route.handler, name=route.name
        )
