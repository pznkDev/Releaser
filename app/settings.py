from os.path import isfile

from envparse import env


def get_config(file_name='.config'):
    if isfile(file_name):
        env.read_envfile(file_name)

    config = {
        'HOST': env.str('SERVER_HOST'),
        'PORT': env.int('SERVER_PORT'),

        'POSTGRES_DATABASE': env.str('POSTGRES_DATABASE'),
        'POSTGRES_USER': env.str('POSTGRES_USER'),
        'POSTGRES_PASSWORD': env.str('POSTGRES_PASSWORD'),
        'POSTGRES_HOST': env.str('POSTGRES_HOST'),
        'POSTGRES_PORT': env.str('POSTGRES_PORT'),

        'REDIS_HOST': env.str('REDIS_HOST'),
        'REDIS_PORT': env.str('REDIS_PORT'),

        'BOT_TOKEN': env.str('BOT_TOKEN'),
        'BOT_CHANNEL': env.str('BOT_CHANNEL')
    }

    return config
