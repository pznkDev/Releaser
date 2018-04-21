import {
    TEAM_RELEASE_STATUS_REQUEST_STARTS, TEAM_RELEASE_STATUS_REQUEST_SUCCESS, TEAM_RELEASE_STATUS_REQUEST_FAIL
} from '../actions/team_release_status';

export function teamReleaseStatus(state={team_release_status: []}, action) {
    switch (action.type) {
        case TEAM_RELEASE_STATUS_REQUEST_STARTS:
            return {...state, isFetching: action.isFetching};
        case TEAM_RELEASE_STATUS_REQUEST_SUCCESS:
            return {
                ...state,
                isFetching: action.isFetching,
                errorMessage: '',
                team_release_status: action.team_release_status
            };
        case TEAM_RELEASE_STATUS_REQUEST_FAIL:
            return {...state, isFetching: action.isFetching, errorMessage: action.errorMessage};
        default:
            return state;
    }
}
