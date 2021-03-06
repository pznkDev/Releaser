import trafaret as t
from trafaret_validator import TrafaretValidator

from app.models import (
    Role,
    Priority,
    Status
)


class AccountValidator(TrafaretValidator):
    name = t.String(max_length=50)
    nickname = t.String(max_length=20)
    password = t.String(max_length=20)
    role = t.Enum(*[e.name for e in Role])


class BugValidator(TrafaretValidator):
    name = t.String(max_length=30)
    description = t.String(max_length=240)
    team_id = t.Int()
    priority = t.Enum(*[e.name for e in Priority])
    time_created = t.String()


class BugHistoryValidator(TrafaretValidator):
    name = t.String(max_length=30)
    description = t.String(max_length=240)
    team_id = t.Int()
    priority = t.Enum(*[e.name for e in Priority])
    time_created = t.String()
    time_closed = t.String()


class ReleaseValidator(TrafaretValidator):
    tag = t.String(max_length=9)
    time_created = t.String()
    username = t.String()
    password = t.String()


class TeamReleaseStatusValidator(TrafaretValidator):
    team_id = t.Int
    release_id = t.Int
    status = t.Enum(*[e.name for e in Status])
    comment = t.String(250)
    username = t.String
    password = t.String
    time_delay = t.Int
