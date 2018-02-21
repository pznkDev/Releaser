import asyncio
import json

import logging
import async_timeout
from aiohttp import ClientSession

URL = 'https://api.telegram.org/bot{}/sendMessage?chat_id=@{}&text={}'.format(
    'bot_token', 'channel_name', 'Ko ko ko')


async def fetch(session, url):
    async with async_timeout.timeout(4):
        async with session.get(url) as response:
            return await response.text()


async def send_message(message):
    # TODO format URL string with bot_token and channel_name from .config and message from args

    async with ClientSession() as session:
        response = await fetch(session, URL)
        json_response = json.loads(response)
        if not json_response['ok']:
            logging.warning('Unable to send message in telegram channel!')

#
# def main():
#     loop = asyncio.get_event_loop()
#     loop.run_until_complete(send_message(''))
#     print(URL)
#
#
# if __name__ == '__main__':
#     main()
