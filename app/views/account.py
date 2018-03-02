from http import HTTPStatus

from aiohttp import web
from psycopg2 import IntegrityError

from app.db_handler.account import (
    select_accounts,
    select_account_by_id,
    update_account_by_id,
    insert_account,
    remove_account
)
from app.forms import AccountValidator


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


async def create_account(request):
    request_data = await request.json()

    account_data = AccountValidator(
        name=request_data.get('name'),
        nickname=request_data.get('nickname'),
        password=request_data.get('password'),
        role=request_data.get('role', 'viewer')
    )
    if not account_data.validate():
        return web.json_response(
            {'error': 'Invalid account data.'},
            status=HTTPStatus.BAD_REQUEST
        )

    async with request.app['db'].acquire() as conn:
        try:
            result = await insert_account(conn, account_data.data)
            if result:
                return web.Response()
            else:
                return web.json_response(
                    {'error': 'Account insert error.'},
                    status=HTTPStatus.NOT_FOUND
                )
        except IntegrityError:
            return web.json_response(
                {'error': 'Account with such fields already exists.'},
                status=HTTPStatus.CONFLICT
            )


async def update_account(request):
    try:
        account_id = int(request.match_info['account_id'])
    except (ValueError, TypeError):
        return web.json_response(
            {'error': 'Invalid account id.'},
            status=HTTPStatus.BAD_REQUEST
        )

    request_data = await request.json()

    account_data = AccountValidator(
        name=request_data.get('name'),
        nickname=request_data.get('nickname'),
        password=request_data.get('password'),
        role=request_data.get('role', 'viewer')
    )
    if not account_data.validate():
        return web.json_response(
            {'error': 'Invalid account data.'},
            status=HTTPStatus.BAD_REQUEST
        )

    async with request.app['db'].acquire() as conn:
        try:
            result = await update_account_by_id(conn, account_id, account_data.data)
            if result:
                return web.Response()
            else:
                return web.json_response(
                    {'error': 'Account not found.'},
                    status=HTTPStatus.NOT_FOUND
                )
        except IntegrityError:
            return web.json_response(
                {'error': 'Account with such fields already exists.'},
                status=HTTPStatus.CONFLICT
            )


async def delete_account(request):
    try:
        account_id = int(request.match_info['account_id'])
    except (ValueError, TypeError):
        return web.json_response(
            {'error': 'Invalid account id.'},
            status=HTTPStatus.BAD_REQUEST
        )

    async with request.app['db'].acquire() as conn:
        result = await remove_account(conn, account_id)

        if result:
            return web.Response()
        else:
            return web.json_response(
                {'error': 'Account not found.'},
                status=HTTPStatus.NOT_FOUND
            )
