import asyncio
import logging

from aiohttp import web

from server.settings import get_config
from server.utils import (
    init_app,
    destroy_app
)


def create_app(loop):
    app = web.Application(loop=loop)

    config = get_config()
    app['config'] = config

    app.on_startup.append(init_app)
    app.on_cleanup.append(destroy_app)

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
