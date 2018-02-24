from http import HTTPStatus

from aiohttp import web

from app.db_handler.account import (
    select_accounts,
    select_account_by_id
)


async def get_all_accounts(request):
    async with request.app['db'].acquire() as conn:
        all_accounts = await select_accounts(conn)

        return web.json_response(all_accounts)


async def get_one_account(request):
    try:
        account_id = int(request.match_info['account_id'])
    except (ValueError, TypeError):
        return web.json_response(
            {'error': 'Invalid account id.'},
            status=HTTPStatus.BAD_REQUEST
        )

    async with request.app['db'].acquire() as conn:
        account = await select_account_by_id(conn, account_id)

        if not account:
            return web.json_response(
                {'error': 'Account not found'},
                status=HTTPStatus.BAD_REQUEST
            )

        return web.json_response(account)
