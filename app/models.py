import enum

import sqlalchemy as sa

__all__ = [
    'Role',
    'Status',
    'Priority',
    'account',
    'team',
    'team_account',
    'bug',
    'bug_history',
    'release',
    'team_release_status',
    'team_release_status_history',
    'schedule_update'
]

meta = sa.MetaData()


class Role(enum.Enum):
    viewer = 1
    dev = 2
    manager = 3

    def __str__(self):
        return self.name


class Status(enum.Enum):
    ready = 1
    unready = 2
    in_process = 3

    def __str__(self):
        return self.name


class Priority(enum.Enum):
    minor = 1
    major = 2
    critical = 3

    def __str__(self):
        return self.name


account = sa.Table(
    'account', meta,

    sa.Column('account_id', sa.Integer),
    sa.Column('name', sa.String(50), nullable=False),
    sa.Column('username', sa.String(20), unique=True, nullable=False),
    sa.Column('password', sa.String(20), nullable=False),
    sa.Column('role', sa.Enum(Role), default="viewer"),

    sa.PrimaryKeyConstraint('account_id', name='account_id_pkey'),
)

team = sa.Table(
    'team', meta,

    sa.Column('team_id', sa.Integer),
    sa.Column('name', sa.String(50), unique=True, nullable=False)
)

team_account = sa.Table(
    'team_account', meta,

    sa.Column('account_id', sa.Integer, nullable=False),
    sa.Column('team_id', sa.Integer, nullable=False),

    sa.ForeignKeyConstraint(
        ['account_id'], [account.c.account_id], name='account_id_fkey'
    ),
    sa.ForeignKeyConstraint(
        ['team_id'], [team.c.team_id], name='team_id_fkey'
    )
)

bug = sa.Table(
    'bug', meta,

    sa.Column('bug_id', sa.Integer),
    sa.Column('name', sa.String(30), nullable=False),
    sa.Column('description', sa.String(240)),
    sa.Column('team_id', sa.Integer, nullable=False),
    sa.Column('priority', sa.Enum(Priority), default="minor"),
    sa.Column('time_created', sa.TIMESTAMP, nullable=False),

    sa.PrimaryKeyConstraint('bug_id', name='bug_id_pkey'),
    sa.ForeignKeyConstraint(
        ['team_id'], [team.c.team_id], name='team_id_fkey'
    )
)

bug_history = sa.Table(
    'bug_history', meta,

    sa.Column('bug_id', sa.Integer),
    sa.Column('name', sa.String(30), nullable=False),
    sa.Column('description', sa.String(240)),
    sa.Column('team_id', sa.Integer, nullable=False),
    sa.Column('priority', sa.Enum(Priority), default="minor"),
    sa.Column('time_created', sa.TIMESTAMP, nullable=False),
    sa.Column('time_closed', sa.TIMESTAMP, nullable=False),

    sa.PrimaryKeyConstraint('bug_id', name='bug_history_id_pkey'),
    sa.ForeignKeyConstraint(
        ['team_id'], [team.c.team_id], name='team_id_fkey'
    )
)

release = sa.Table(
    'release', meta,

    sa.Column('release_id', sa.Integer),
    sa.Column('tag', sa.String(9), nullable=False, unique=True),
    sa.Column('time_created', sa.TIMESTAMP, nullable=False),

    sa.PrimaryKeyConstraint('release_id', name='release_id_pkey')
)

team_release_status = sa.Table(
    'team_release_status', meta,

    sa.Column('id', sa.Integer),
    sa.Column('team_id', sa.Integer, nullable=False),
    sa.Column('release_id', sa.Integer, nullable=False),
    sa.Column('status', sa.Enum(Status), default="in_process"),
    sa.Column('comment', sa.String(240)),
    sa.Column('submitter_id', sa.Integer),
    sa.Column('time_submit', sa.TIMESTAMP),
    sa.Column('time_delay', sa.TIMESTAMP),

    sa.PrimaryKeyConstraint('id', name='team_release_status_id_pkey'),
    sa.ForeignKeyConstraint(
        ['team_id'], [team.c.team_id], name='team_id_fkey'
    ),
    sa.ForeignKeyConstraint(
        ['release_id'], [release.c.release_id], name='release_id_fkey'
    ),
    sa.ForeignKeyConstraint(
        ['submitter_id'], [account.c.account_id], name='account_id_fkey'
    )
)

team_release_status_history = sa.Table(
    'team_release_status_history', meta,

    sa.Column('id', sa.Integer),
    sa.Column('team_id', sa.Integer, nullable=False),
    sa.Column('release_id', sa.Integer, nullable=False),
    sa.Column('status', sa.Enum(Status), default="in_process"),
    sa.Column('comment', sa.String(240)),
    sa.Column('submitter_id', sa.Integer),
    sa.Column('time_submit', sa.TIMESTAMP),
    sa.Column('time_delay', sa.TIMESTAMP),

    sa.PrimaryKeyConstraint('id', name='team_release_status_history_id_pkey'),
    sa.ForeignKeyConstraint(
        ['team_id'], [team.c.team_id], name='team_id_fkey'
    ),
    sa.ForeignKeyConstraint(
        ['release_id'], [release.c.release_id], name='release_id_fkey'
    ),
    sa.ForeignKeyConstraint(
        ['submitter_id'], [account.c.account_id], name='account_id_fkey'
    )
)

schedule_update = sa.Table(
    'schedule_update', meta,

    sa.Column('day', sa.Integer, nullable=False),
    sa.Column('hour', sa.Integer, nullable=False),
    sa.Column('minute', sa.Integer, nullable=False)
)
