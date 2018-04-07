from sqlalchemy import select

from app.models import team


async def select_teams(conn):
    team_rows = await conn.execute(
        select([
            team.c.team_id,
            team.c.name
        ])
        .select_from(
            team
        )
    )

    return [dict(row.items()) for row in team_rows]
