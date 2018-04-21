import {
    TEAMS_REQUEST_STARTS, TEAMS_REQUEST_SUCCESS, TEAMS_REQUEST_FAIL
} from '../actions/teams';

export function teams(state={teams: []}, action) {
    switch (action.type) {
        case TEAMS_REQUEST_STARTS:
            return {...state, isFetching: action.isFetching};
        case TEAMS_REQUEST_SUCCESS:
            return {
                ...state,
                isFetching: action.isFetching,
                errorMessage: '',
                teams: action.teams
            };
        case TEAMS_REQUEST_FAIL:
            return {...state, isFetching: action.isFetching, errorMessage: action.errorMessage};
        default:
            return state;
    }
}
