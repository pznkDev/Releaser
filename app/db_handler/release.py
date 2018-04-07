from sqlalchemy import (
    desc,
    select
)

from app.models import release


async def select_last_release(conn):
    release_row = await conn.execute(
        select([
            release.c.release_id,
            release.c.tag,
            release.c.time_created
        ])
        .select_from(release)
        .order_by(desc(release.c.tag))
    )

    release_last = await release_row.fetchone()
    if release_last:
        return dict(release_last.items())


async def insert_release(conn, release_data):
    result = await conn.execute(
        release
        .insert()
        .values(release_data)
    )

    if result.rowcount:
        return True
