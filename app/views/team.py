import json
from functools import partial

from aiohttp import web

from app.db_handler.team import select_teams


async def get_all_teams(request):
    async with request.app['db'].acquire() as conn:
        all_teams = await select_teams(conn)

        body = {'teams': all_teams}

        return web.json_response(
            body,
            dumps=partial(json.dumps, default=str)
        )
