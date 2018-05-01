import {
    BUG_HISTORY_REQUEST_STARTS, BUG_HISTORY_REQUEST_SUCCESS, BUG_HISTORY_REQUEST_FAIL
} from '../actions/bug_history';

export function bugHistory(state={bug_history: []}, action) {
    switch (action.type) {
        case BUG_HISTORY_REQUEST_STARTS:
            return {...state, isFetching: action.isFetching};
        case BUG_HISTORY_REQUEST_SUCCESS:
            return {
                ...state,
                isFetching: action.isFetching,
                errorMessage: '',
                bug_history: action.bug_history
            };
        case BUG_HISTORY_REQUEST_FAIL:
            return {...state, isFetching: action.isFetching, errorMessage: action.errorMessage};
        default:
            return state;
    }
}
