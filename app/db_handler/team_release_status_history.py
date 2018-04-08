from app.models import team_release_status_history


async def insert_team_release_status_history(conn, data):
    result = await conn.execute(
        team_release_status_history
        .insert()
        .values(data)
    )

    if result.rowcount:
        return True
