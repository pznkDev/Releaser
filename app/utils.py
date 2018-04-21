import os
from collections import namedtuple
from os.path import isfile

from aiohttp_security import (
    setup as setup_security,
    SessionIdentityPolicy
)
from aiohttp_session import setup as setup_session
from aiohttp_session.redis_storage import RedisStorage
from aiopg import sa
from aioredis import create_pool
from envparse import env

from app.services.auth import DBAuthorizationPolicy

Route = namedtuple('Route', ['name', 'method', 'path', 'handler'])


def setup_config(app, file_name='.config'):
    path_to_file = os.path.join(app['project_root'], file_name)
    if isfile(path_to_file):
        env.read_envfile(file_name)

    app['config'] = {
        'HOST': env.str('SERVER_HOST'),
        'PORT': env.int('SERVER_PORT'),

        'POSTGRES_DATABASE': env.str('POSTGRES_DATABASE'),
        'POSTGRES_USER': env.str('POSTGRES_USER'),
        'POSTGRES_PASSWORD': env.str('POSTGRES_PASSWORD'),
        'POSTGRES_HOST': env.str('POSTGRES_HOST'),
        'POSTGRES_PORT': env.str('POSTGRES_PORT'),

        'REDIS_HOST': env.str('REDIS_HOST'),
        'REDIS_PORT': env.str('REDIS_PORT'),

        'BOT_TOKEN': env.str('BOT_TOKEN'),
        'BOT_CHANNEL': env.str('BOT_CHANNEL')
    }


async def init_app(app):
    await init_db(app)
    await init_redis(app)

    setup_security(app,
                   SessionIdentityPolicy(),
                   DBAuthorizationPolicy(app['db']))

    setup_session(app,
                  RedisStorage(app['redis']))

    await set_redis_init_values(app)


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


async def set_redis_init_values(app):
    with await app['redis'] as conn:
        timer_value = await conn.execute('get', 'timer_value')
        if timer_value is None:
            await conn.execute('set',
                               'timer_delay',
                               0)

        release_started = await conn.execute('get', 'release_started')
        if release_started is None:
            await conn.execute('set',
                               'release_started',
                               0)

        timer_delay = await conn.execute('get', 'timer_delay')
        if timer_delay is None:
            await conn.execute('set',
                               'timer_delay',
                               0)
