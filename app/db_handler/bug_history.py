import math
from sqlalchemy import select

from models import bug_history

BUGS_LIMIT = 10


async def select_bug_history(conn, page):
    bugs_count = await conn.scalar(bug_history.count())
    pages_count = math.ceil(bugs_count / BUGS_LIMIT)

    bug_rows = await conn.execute('''
        SELECT
          bug_history.bug_id,
          bug_history.name,
          bug_history.description,
          team.name as team_name,
          bug_history.priority,
          bug_history.time_created,
          bug_history.time_closed
        FROM bug_history
        INNER JOIN team ON bug_history.team_id=team.team_id
        ORDER BY bug_history.time_created
        LIMIT {}
        OFFSET {}
    '''.format(BUGS_LIMIT, page * BUGS_LIMIT))

    body = {
        'bugs': [dict(row.items()) for row in bug_rows],
        'pages': pages_count
    }

    return body


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
