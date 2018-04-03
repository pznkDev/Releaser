import json
import logging

import async_timeout
from aiohttp import ClientSession

URL = 'https://api.telegram.org/bot{}/sendMessage?chat_id=@{}&text={}'


async def fetch(session, url):
    async with async_timeout.timeout(4):
        async with session.get(url) as response:
            return await response.json()


async def send_message(app, message):
    conf = app['config']
    url = URL.format(conf['BOT_TOKEN'], conf['BOT_CHANNEL'], message)

    async with ClientSession() as session:
        json_response = await fetch(session, url)
        if not json_response['ok']:
            logging.warning('Unable to send message in telegram channel!')
