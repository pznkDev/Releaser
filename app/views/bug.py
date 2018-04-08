import json
from functools import partial
from http import HTTPStatus

from aiohttp import web
from psycopg2 import IntegrityError

from app.db_handler.bug import (
    select_bugs,
    select_bug_by_id,
    insert_bug,
    update_bug_by_id,
    remove_bug
)
from app.forms import BugValidator


async def get_all_bugs(request):
    async with request.app['db'].acquire() as conn:
        all_bugs = await select_bugs(conn)
        return web.json_response(
            all_bugs,
            dumps=partial(json.dumps, default=str)
        )


async def get_one_bug(request):
    try:
        bug_id = int(request.match_info['bug_id'])
    except (ValueError, TypeError):
        return web.json_response(
            {'error': 'Invalid bug id.'},
            status=HTTPStatus.BAD_REQUEST
        )

    async with request.app['db'].acquire() as conn:
        bug = await select_bug_by_id(conn, bug_id)

        if not bug:
            return web.json_response(
                {'error': 'Bug not found'},
                status=HTTPStatus.BAD_REQUEST
            )

        return web.json_response(
            bug,
            dumps=partial(json.dumps, default=str)
        )


async def create_bug(request):
    request_data = await request.json()

    bug_data = BugValidator(
        name=request_data.get('name'),
        description=request_data.get('description'),
        team_id=request_data.get('team_id'),
        priority=request_data.get('priority', 'minor'),
        time_created=request_data.get('time_created')
    )
    if not bug_data.validate():
        return web.json_response(
            {'error': 'Invalid bug data.'},
            status=HTTPStatus.BAD_REQUEST
        )

    async with request.app['db'].acquire() as conn:
        try:
            result = await insert_bug(conn, bug_data.data)
            if result:
                return web.Response()
            else:
                return web.json_response(
                    {'error': 'Bug insert error.'},
                    status=HTTPStatus.NOT_FOUND
                )
        except IntegrityError:
            return web.json_response(
                {'error': 'Bug with such fields already exists.'},
                status=HTTPStatus.CONFLICT
            )


async def update_bug(request):
    try:
        bug_id = int(request.match_info['bug_id'])
    except (ValueError, TypeError):
        return web.json_response(
            {'error': 'Invalid bug id.'},
            status=HTTPStatus.BAD_REQUEST
        )

    request_data = await request.json()

    bug_data = BugValidator(
        name=request_data.get('name'),
        description=request_data.get('description'),
        team_id=request_data.get('team_id'),
        priority=request_data.get('priority', 'minor'),
        time_created=request_data.get('time_created')
    )
    if not bug_data.validate():
        return web.json_response(
            {'error': 'Invalid bug data.'},
            status=HTTPStatus.BAD_REQUEST
        )

    async with request.app['db'].acquire() as conn:
        try:
            result = await update_bug_by_id(conn, bug_id, bug_data.data)
            if result:
                return web.Response()
            else:
                return web.json_response(
                    {'error': 'Bug not found.'},
                    status=HTTPStatus.NOT_FOUND
                )
        except IntegrityError:
            return web.json_response(
                {'error': 'Bug with such fields already exists.'},
                status=HTTPStatus.CONFLICT
            )


async def delete_bug(request):
    try:
        bug_id = int(request.match_info['bug_id'])
    except (ValueError, TypeError):
        return web.json_response(
            {'error': 'Invalid bug id.'},
            status=HTTPStatus.BAD_REQUEST
        )

    async with request.app['db'].acquire() as conn:
        result = await remove_bug(conn, bug_id)

        if result:
            return web.Response()
        else:
            return web.json_response(
                {'error': 'Bug not found.'},
                status=HTTPStatus.NOT_FOUND
            )
