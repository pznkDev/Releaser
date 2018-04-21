from datetime import datetime
import json
from functools import partial
from http import HTTPStatus

from aiohttp import web
from psycopg2 import IntegrityError

from app.db_handler.account import select_account_by_username_password
from app.db_handler.release import (
    insert_release,
    select_last_release
)
from app.db_handler.team_release_status import (
    insert_team_release_status,
    remove_all
)
from app.db_handler.team import select_teams
from app.forms import ReleaseValidator
from app.services.bot import send_message


MSG_UPDATING_STARTED = 'New Tag - %s ! Updating started at %s !'


async def get_last_release(request):
    """ Returns last release sorted by tag """

    async with request.app['db'].acquire() as conn:
        release = await select_last_release(conn)

        if not release:
            return web.json_response(
                {'error': 'No releases'},
                status=HTTPStatus.BAD_REQUEST
            )

        return web.json_response(
            release,
            dumps=partial(json.dumps, default=str)
        )


async def create_release(request):
    """
        Creates row release in db. Sends notification in telegram.
        Set all statuses in team_release_status to 'in_process'.
        Set redis value release_started to True.
    """

    request_data = await request.json()

    release_data = ReleaseValidator(
        tag=request_data.get('tag'),
        username=request_data.get('login'),
        password=request_data.get('password'),
        time_created=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    )
    if not release_data.validate():
        return web.json_response(
            {'error': 'Invalid release data.'},
            status=HTTPStatus.BAD_REQUEST
        )

    async with request.app['db'].acquire() as conn:
        try:
            account = await select_account_by_username_password(conn, release_data.data)
            if not account or account['role'] != 'manager':
                return web.json_response(
                    {'error': 'Permission denied'},
                    status=HTTPStatus.FORBIDDEN
                )

            release = {
                'tag': release_data.data['tag'],
                'time_created': release_data.data['time_created']
            }
            result = await insert_release(conn, release)
            if not result:
                return web.json_response(
                    {'error': 'Release insert error.'},
                    status=HTTPStatus.NOT_FOUND
                )
        except IntegrityError:
            return web.json_response(
                {'error': 'Release with such fields already exists.'},
                status=HTTPStatus.CONFLICT
            )

        # set to all teams in team_release_status in process
        last_release = await select_last_release(conn)
        await remove_all(conn)
        teams = await select_teams(conn)
        async with conn.begin() as _:
            for team in teams:
                data = {
                    'team_id': team['team_id'],
                    'release_id': last_release['release_id'],
                    'status': 'in_process'
                }
                await insert_team_release_status(conn, data)

    # send notification in telegram
    await send_message(request.app,
                       MSG_UPDATING_STARTED % (release_data.data['tag'],
                                               datetime.now().strftime("%Y-%m-%d %H:%M")))

    with await request.app['redis'] as conn:
        await conn.execute('set', 'release_started', 1)

    return web.Response()
