from datetime import datetime
import json
from functools import partial
from http import HTTPStatus

from aiohttp import web
from psycopg2 import IntegrityError

from db_handler.release import (
    insert_release,
    select_last_release
)
from forms import ReleaseValidator
from app.services.bot import send_message


MSG_UPDATING_STARTED = 'New Tag - %s ! Updating started at %s !'


async def get_last_release(request):
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
    request_data = await request.json()

    release_data = ReleaseValidator(
        tag=request_data.get('tag'),
        time_created=request_data.get('time_created')
    )
    if not release_data.validate():
        return web.json_response(
            {'error': 'Invalid release data.'},
            status=HTTPStatus.BAD_REQUEST
        )

    async with request.app['db'].acquire() as conn:
        try:
            result = await insert_release(conn, release_data.data)
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

    # send notification that updating started
    await send_message(request.app,
                       MSG_UPDATING_STARTED % (release_data.data['tag'], datetime.now().strftime("%Y-%m-%d %H:%M")))

    return web.Response()
