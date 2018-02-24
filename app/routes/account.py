from app.utils import Route
from app.views import account

routes = [
    Route(
        name='get_all_accounts',
        method='GET',
        path='/',
        handler=account.get_all_accounts
    ),
    Route(
        name='get_one_account',
        method='GET',
        path=r'/{account_id:\d+}/',
        handler=account.get_one_account
    )
]
