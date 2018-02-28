import trafaret as t
from trafaret_validator import TrafaretValidator

from app.models import (
    Role,
    Priority
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
