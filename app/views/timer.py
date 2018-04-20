from datetime import (
    datetime,
    timedelta
)
from http import HTTPStatus

from aiohttp import web

from app.db_handler.schedule import select_schedule

SECONDS_IN_WEEK = 604800


async def get_timer(request):
    """ Returns timestamp of next release. If release started returns also max delay. """

    with await request.app['redis'] as conn:
        timer_value = await conn.execute('get', 'timer_value')
        release_started = await conn.execute('get', 'release_started')
        timer_delay = await conn.execute('get', 'timer_delay')

        if release_started:
            if (timer_value + timer_delay) < datetime.now().timestamp():
                return web.json_response({
                    'timer_value': timer_value.decode('utf-8'),
                    'timer_delay': 0})
            else:
                return web.json_response({
                    'timer_value': timer_value.decode('utf-8'),
                    'timer_delay': timer_delay.decode('utf-8')})

        if timer_value and float(timer_value) < datetime.now().timestamp():
            return web.json_response({'timer_value': timer_value.decode('utf-8')})
        else:
            timer_next_release = await get_schedule_release_time(request.app)
            if timer_next_release:
                await conn.execute('set',
                                   'timer_value',
                                   timer_next_release)

                return web.json_response({'timer_value': timer_next_release})
            else:
                return web.json_response({'errors:': 'Empty release schedule'})


async def update_timer(request):
    request_data = await request.json()

    try:
        timer_new_value = float(request_data.get('timer_value'))

        if timer_new_value > datetime.now().timestamp():
            with await request.app['redis'] as conn:
                await conn.execute('set',
                                   'timer_value',
                                   timer_new_value)
                return web.Response()

    except (TypeError, ValueError):
        pass

    return web.json_response(
        {'errors': 'Invalid timer value'},
        status=HTTPStatus.BAD_REQUEST
    )


async def reset_timer(request):
    with await request.app['redis'] as conn:
        await conn.execute('set', 'timer_value', '')
        return web.Response()


async def get_schedule_release_time(app):
    """ Returns timestamp of upcoming release. """

    async with app['db'].acquire() as conn:
        schedule = await select_schedule(conn)

        now = datetime.now()
        min_diff = float('inf')

        for event in schedule:
            event_date = now + timedelta(days=event['day'] - now.weekday() + 1)
            event_date = event_date.replace(hour=int(event['hour']), minute=int(event['minute']))

            diff = event_date.timestamp() - now.timestamp()
            if diff < 0:
                diff = SECONDS_IN_WEEK + diff

            if diff < min_diff:
                min_diff = diff

        return now.timestamp() + min_diff
