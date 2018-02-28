from collections import namedtuple

from aiohttp_security import setup as setup_security, SessionIdentityPolicy
from aiohttp_session import setup as setup_session
from aiohttp_session.redis_storage import RedisStorage
from aiopg import sa
from aioredis import create_pool

from services.auth import DBAuthorizationPolicy

Route = namedtuple('Route', ['name', 'method', 'path', 'handler'])


async def init_app(app):
    await init_db(app)
    await init_redis(app)

    setup_security(app,
                   SessionIdentityPolicy(),
                   DBAuthorizationPolicy(app['db']))

    setup_session(app,
                  RedisStorage(app['redis']))


async def init_db(app):
    conf = app['config']
    engine = await sa.create_engine(
        database=conf['POSTGRES_DATABASE'],
        user=conf['POSTGRES_USER'],
        password=conf['POSTGRES_PASSWORD'],
        host=conf['POSTGRES_HOST'],
        port=conf['POSTGRES_PORT'])
    app['db'] = engine


async def init_redis(app):
    conf = app['config']
    app['redis'] = await create_pool((conf['REDIS_HOST'],
                                      conf['REDIS_PORT']))


async def close_app(app):
    await close_db(app)
    await close_redis(app)


async def close_db(app):
    app['db'].close()
    await app['db'].wait_closed()


async def close_redis(app):
    app['redis'].close()
    await app['redis'].wait_closed()
