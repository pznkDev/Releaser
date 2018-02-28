import asyncio
import logging
import os
import pathlib

import aiohttp_jinja2
import jinja2
from aiohttp import web

from app.routes import setup_routes
from app.utils import (
    init_app,
    close_app,
    setup_config
)

PROJ_ROOT = pathlib.Path(__file__).parent.parent
TEMPLATES_ROOT = os.path.join(PROJ_ROOT, 'front/dist')


def create_app(loop):
    app = web.Application(loop=loop)

    app['project_root'] = PROJ_ROOT
    app['templates_root'] = TEMPLATES_ROOT

    aiohttp_jinja2.setup(
        app, loader=jinja2.FileSystemLoader(str(TEMPLATES_ROOT)))

    setup_config(app)

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
