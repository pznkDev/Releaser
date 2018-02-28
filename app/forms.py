import trafaret as t
from trafaret_validator import TrafaretValidator

from app.models import Role


class AccountValidator(TrafaretValidator):
    name = t.String(max_length=50)
    nickname = t.String(max_length=20)
    password = t.String(max_length=20)
    role = t.Enum(*[e.name for e in Role])
