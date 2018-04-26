from datetime import datetime
from http import HTTPStatus

from aiohttp import web
from psycopg2 import IntegrityError

from app.db_handler.account import select_account_by_username_password
from app.db_handler.team_release_status import update_team_release_status_by_team_id, select_release_team_statuses
from app.db_handler.team import select_team_by_id
from app.db_handler.team_account import select_row_by_account_id_team_id
from app.db_handler.team_release_status_history import insert_team_release_status_history

from app.forms import TeamReleaseStatusValidator
from app.services.bot import send_message

MSG_TEAM_VOTED = 'Team %s %s at %s !'


async def get_all_release_team_status(request):
    async with request.app['db'].acquire() as conn:
        all_release_team_statuses = await select_release_team_statuses(conn)
        return web.json_response(all_release_team_statuses)


async def update_release_team_status(request):
    request_data = await request.json()

    status_data = TeamReleaseStatusValidator(
        team_id=request_data.get('team_id'),
        release_id=request_data.get('release_id'),
        status=request_data.get('status'),
        comment=request_data.get('comment'),
        username=request_data.get('username'),
        password=request_data.get('password'),
        time_delay=request_data.get('time_delay')
    )
    if not status_data.validate():
        return web.json_response(
            {'error': 'Invalid team_release_status data.'},
            status=HTTPStatus.BAD_REQUEST
        )

    async with request.app['db'].acquire() as conn:

        # check submitter role in db
        account = await select_account_by_username_password(conn, status_data.data)
        if not account or not account['role'] in ('manager', 'dev'):
            return web.json_response(
                {'error': 'Permission denied.'},
                status=HTTPStatus.FORBIDDEN
            )

        # check if submitter in team
        result = await select_row_by_account_id_team_id(conn,
                                                        account['account_id'],
                                                        status_data.data['team_id'])
        if not result:
            return web.json_response(
                {'error': 'Permission denied. Not team member.'},
                status=HTTPStatus.FORBIDDEN
            )

        release_team_status = {
            "team_id": status_data.data['team_id'],
            "release_id": status_data.data['release_id'],
            "status": status_data.data['status'],
            "comment": status_data.data['comment'],
            "submitter_id": account['account_id'],
            "time_delay": status_data.data['time_delay']
        }

        try:
            result = await update_team_release_status_by_team_id(conn, release_team_status)
            if not result:
                return web.json_response(
                    {'error': 'TeamReleaseStatus not found.'},
                    status=HTTPStatus.NOT_FOUND
                )

            release_team_status['time_submit'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            await insert_team_release_status_history(conn, release_team_status)

            # send notification about team-status
            team = await select_team_by_id(conn, release_team_status['team_id'])
            await send_message(request.app,
                               MSG_TEAM_VOTED % (team['name'],
                                                 release_team_status['status'],
                                                 datetime.now().strftime("%Y-%m-%d %H:%M")))

            # update time_delay in redis if bigger than current
            if release_team_status['time_delay']:
                with await request.app['redis'] as redis_conn:
                    timer_delay = float((await redis_conn.execute('get', 'timer_delay')).decode('utf-8'))
                    if release_team_status['time_delay'] > timer_delay:
                        await redis_conn.execute('set',
                                                 'timer_delay',
                                                 release_team_status['time_delay'])

            return web.Response()

        except IntegrityError:
            return web.json_response(
                {'error': 'Already exist'},
                status=HTTPStatus.CONFLICT
            )
