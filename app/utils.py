from collections import namedtuple

from aiopg import sa

Route = namedtuple('Route', ['name', 'method', 'path', 'handler'])


async def init_app(app):
    await init_db(app)


async def destroy_app(app):
    await close_db(app)


async def init_db(app):
    conf = app['config']
    engine = await sa.create_engine(
        database=conf['POSTGRES_DATABASE'],
        user=conf['POSTGRES_USER'],
        password=conf['POSTGRES_PASSWORD'],
        host=conf['POSTGRES_HOST'],
        port=conf['POSTGRES_PORT'])
    app['db'] = engine


async def close_db(app):
    app['db'].close()
    await app['db'].wait_closed()
