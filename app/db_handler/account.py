from sqlalchemy import select

from app.models import account


async def select_accounts(conn):
    account_rows = await conn.execute(
        select([
            account.c.account_id,
            account.c.name,
            account.c.role.name])
        .select_from(
            account
        )
    )
    return [dict(row.items()) for row in account_rows]


async def select_account_by_id(conn, account_id):
    account_row = await conn.execute(
        select([account.c.account_id,
                account.c.name,
                account.c.role.name])
        .select_from(account)
        .where(account.c.account_id == account_id)
    )

    account_one = await account_row.fetchone()
    if account_one:
        return dict(account_one.items())


async def insert_account(conn, account_data):
    result = await conn.execute(
        account
        .insert()
        .values(account_data)
    )

    if result.rowcount:
        return True


async def update_account_by_id(conn, account_id, account_data):
    result = await conn.execute(
        account
        .update()
        .where(account.c.account_id == account_id)
        .values(account_data)
    )

    if result.rowcount:
        return True


async def remove_account(conn, account_id):
    result = await conn.execute(
        account
        .delete()
        .where(account.c.account_id == account_id)
    )

    if result.rowcount:
        return True
