from sqlalchemy import (
    select,
    sql
)

from app.models import team_account


async def select_row_by_account_id_team_id(conn, account_id, team_id):
    row = await conn.execute(
        select([team_account.c.team_id,
                team_account.c.account_id])
        .select_from(team_account)
        .where(sql.and_(
            team_account.c.team_id == team_id,
            team_account.c.account_id == account_id)
        )
    )

    result_one = await row.fetchone()
    if result_one:
        return dict(result_one.items())
