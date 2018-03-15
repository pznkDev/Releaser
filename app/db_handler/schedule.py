from models import schedule_update as schedule


async def select_schedule(conn):
    values = await conn.execute(
        schedule.select()
    )

    return [dict(row.items()) for row in values]
