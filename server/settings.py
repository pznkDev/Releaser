from os.path import isfile

from envparse import env


def get_config(file_name='.config'):
    if isfile(file_name):
        env.read_envfile(file_name)

    config = {
        'HOST': env.str('HOST'),
        'PORT': env.int('PORT')
    }

    return config
