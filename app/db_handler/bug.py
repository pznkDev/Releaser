from sqlalchemy import select

from app.models import bug


async def select_bugs(conn):
    bug_rows = await conn.execute('''
        SELECT
          bug.name,
          bug.description,
          team.name as team_name,
          bug.priority,
          bug.time_created
        FROM bug
        INNER JOIN team ON bug.team_id=team.team_id
    ''')
    return [dict(row.items()) for row in bug_rows]


async def select_bug_by_id(conn, bug_id):
    bug_row = await conn.execute(
        select([
            bug.c.bug_id,
            bug.c.name,
            bug.c.description,
            bug.c.team_id,
            bug.c.priority.name,
            bug.c.time_created
        ])
        .select_from(bug)
        .where(bug.c.bug_id == bug_id)
    )

    bug_one = await bug_row.fetchone()
    if bug_one:
        return dict(bug_one.items())


async def insert_bug(conn, bug_data):
    result = await conn.execute(
        bug
        .insert()
        .values(bug_data)
    )

    if result.rowcount:
        return True


async def update_bug_by_id(conn, bug_id, bug_data):
    result = await conn.execute(
        bug
        .update()
        .where(bug.c.bug_id == bug_id)
        .values(bug_data)
    )

    if result.rowcount:
        return True


async def remove_bug(conn, bug_id):
    result = await conn.execute(
        bug
        .delete()
        .where(bug.c.bug_id == bug_id)
    )

    if result.rowcount:
        return True
