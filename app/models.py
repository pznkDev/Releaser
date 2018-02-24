import enum

import sqlalchemy as sa

__all__ = [
    'account'
]

meta = sa.MetaData()


class Role(enum.Enum):
    viewer = 1
    dev = 2
    manager = 3

    def __str__(self):
        return self.name


account = sa.Table(
    'account', meta,

    sa.Column('account_id', sa.Integer),
    sa.Column('name', sa.String(50), nullable=False),
    sa.Column('nickname', sa.String(20), nullable=False),
    sa.Column('password', sa.String(20), nullable=False),
    sa.Column('role', sa.Enum(Role), default="viewer"),

    sa.PrimaryKeyConstraint('account_id', name='account_id_pkey'),
)
