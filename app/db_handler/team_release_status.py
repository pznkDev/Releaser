from app.models import team_release_status


async def select_release_team_statuses(conn):
    team_release_status_rows = await conn.execute("""
        SELECT team.name as team,
               release.tag as tag,
               team_release_status.status,
               team_release_status.comment,
               team_release_status.time_submit,
               team_release_status.time_delay
        FROM team_release_status
          LEFT JOIN team as team ON team_release_status.team_id = team.team_id
          LEFT JOIN release as release ON team_release_status.release_id = release.release_id
    """)

    return [dict(row.items()) for row in team_release_status_rows]


async def update_team_release_status_by_team_id(conn, data):
    result = await conn.execute(
        team_release_status
        .update()
        .where(team_release_status.c.team_id == data['team_id'])
        .values(data)
    )

    if result.rowcount:
        return True


async def insert_team_release_status(conn, data):
    result = await conn.execute(
        team_release_status
        .insert()
        .values(data)
    )

    if result.rowcount:
        return True


async def remove_all(conn):
    result = await conn.execute('''TRUNCATE team_release_status''')

    if result.rowcount:
        return True
