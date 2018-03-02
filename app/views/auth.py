from http import HTTPStatus

from aiohttp import web
from aiohttp.web_response import json_response
from aiohttp_security import (
    remember,
    forget
)

from models import Role
from services.auth import (
    check_credentials,
    require
)


async def signin(request):
    response = web.Response()
    post_data = await request.json()

    username = post_data.get('username')
    password = post_data.get('password')

    if await check_credentials(request, username, password):
        print('KO KO KO')
        await remember(request, response, username)

        return response
    return json_response({'error': 'Wrong credentials'}, status=HTTPStatus.UNAUTHORIZED)


@require(Role.viewer)
async def signout(request):
    response = web.Response()
    await forget(request, response)
    return response
