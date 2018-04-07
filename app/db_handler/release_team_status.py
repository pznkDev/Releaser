from app.models import team_release_status


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
