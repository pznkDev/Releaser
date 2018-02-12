import asyncio

from aiohttp import web

from server.settings import get_config


def create_app(loop):
    app = web.Application(loop=loop)

    config = get_config()
    app['config'] = config

    return app


def run():
    loop = asyncio.get_event_loop()

    app = create_app(loop)

    web.run_app(app,
                host=app['config']['HOST'],
                port=app['config']['PORT'])


if __name__ == '__main__':
    run()
