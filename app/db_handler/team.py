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


async def select_team_by_id(conn, team_id):
    team_row = await conn.execute(
        select([
            team.c.team_id,
            team.c.name
        ])
        .select_from(team)
        .where(team.c.team_id == team_id)
    )

    team_one = await team_row.fetchone()
    if team_one:
        return dict(team_one.items())
