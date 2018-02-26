import asyncio
import logging

from aiohttp import web

from app.routes import setup_routes
from app.settings import get_config
from app.utils import (
    init_app,
    close_app
)


def create_app(loop):
    app = web.Application(loop=loop)

    config = get_config()
    app['config'] = config

    app.on_startup.append(init_app)
    app.on_cleanup.append(close_app)

    setup_routes(app)

    return app


def run():
    logging.basicConfig(level=logging.DEBUG)

    loop = asyncio.get_event_loop()

    app = create_app(loop)

    web.run_app(app,
                host=app['config']['HOST'],
                port=app['config']['PORT'])


if __name__ == '__main__':
    run()
