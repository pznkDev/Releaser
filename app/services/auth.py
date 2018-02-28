import enum
import functools
from http import HTTPStatus

from aiohttp import web
from aiohttp_security import AbstractAuthorizationPolicy, permits
from sqlalchemy import select, and_

from app import models
from models import account


class UserStatus(enum.Enum):
    not_authorized = 1
    has_permission = 2
    no_permission = 3


class DBAuthorizationPolicy(AbstractAuthorizationPolicy):
    def __init__(self, db_engine):
        self.db_engine = db_engine

    async def authorized_userid(self, identity):
        async with self.db_engine.acquire() as conn:
            async with conn.begin():
                where = models.account.c.nickname == identity
                query = models.account.select(where)
                user_result = await conn.execute(query)
                account_ = await user_result.first()
                if account_:
                    return dict(account_.items())
                else:
                    return None

    async def permits(self, identity, permission, context=None):
        if identity is None:
            return UserStatus.not_authorized

        async with self.db_engine.acquire() as conn:
            async with conn.begin():
                where = models.account.c.nickname == identity
                query = models.account.select().where(where)
                user_result = await conn.execute(query)
                user = await user_result.first()
                if user:
                    if user.role.value >= models.Role[permission].value:
                        return UserStatus.has_permission
                    return UserStatus.no_permission
                return UserStatus.not_authorized


async def check_credentials(request, username, password):
    async with request.app['db'].acquire() as conn:
        account_row = await conn.execute(
            select([account.c.account_id,
                    account.c.name,
                    account.c.role.name])
            .select_from(account)
            .where(and_(
                account.c.nickname == username,
                account.c.password == password
                )
            )
        )
        print(account_row)
        account_one = await account_row.fetchone()
        if account_one:
            return True


def require(permission):
    def wrapper(f):
        @functools.wraps(f)
        async def wrapped(request):
            user_status = await permits(request, permission.name)
            if user_status == UserStatus.no_permission:
                message = 'User has no permission {}'.format(permission.name)
                return web.json_response({'error': message},
                                         status=HTTPStatus.FORBIDDEN)
            elif user_status == UserStatus.not_authorized:
                return web.json_response({'error': 'Unauthorized'},
                                         status=HTTPStatus.UNAUTHORIZED)
            return await f(request)

        return wrapped

    return wrapper
