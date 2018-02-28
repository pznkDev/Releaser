from sqlalchemy import select

from models import bug_history


async def select_bug_history(conn):
    bug_rows = await conn.execute(
        select([
            bug_history.c.bug_id,
            bug_history.c.name,
            bug_history.c.description,
            bug_history.c.team_id,
            bug_history.c.priority.name,
            bug_history.c.time_created,
            bug_history.c.time_closed
        ])
        .select_from(
            bug_history
        )
    )
    return [dict(row.items()) for row in bug_rows]


async def select_bug_history_by_id(conn, bug_id):
    bug_row = await conn.execute(
        select([
            bug_history.c.bug_id,
            bug_history.c.name,
            bug_history.c.description,
            bug_history.c.team_id,
            bug_history.c.priority.name,
            bug_history.c.time_created,
            bug_history.c.time_closed
        ])
        .select_from(bug_history)
        .where(bug_history.c.bug_id == bug_id)
    )

    bug_one = await bug_row.fetchone()
    if bug_one:
        return dict(bug_one.items())


async def insert_bug_history(conn, bug_data):
    result = await conn.execute(
        bug_history
        .insert()
        .values(bug_data)
    )

    if result.rowcount:
        return True


async def update_bug_history_by_id(conn, bug_id, bug_data):
    result = await conn.execute(
        bug_history
        .update()
        .where(bug_history.c.bug_id == bug_id)
        .values(bug_data)
    )

    if result.rowcount:
        return True


async def remove_bug_history(conn, bug_id):
    result = await conn.execute(
        bug_history
        .delete()
        .where(bug_history.c.bug_id == bug_id)
    )

    if result.rowcount:
        return True
