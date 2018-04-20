import {
    RELEASE_REQUEST_STARTS, RELEASE_REQUEST_SUCCESS, RELEASE_REQUEST_FAIL
} from '../actions/release';

export function release(state={release: ''}, action) {
    switch (action.type) {
        case RELEASE_REQUEST_STARTS:
            return {...state, isFetching: action.isFetching};
        case RELEASE_REQUEST_SUCCESS:
            return {
                ...state,
                isFetching: action.isFetching,
                errorMessage: '',
                release: action.release,
            };
        case RELEASE_REQUEST_FAIL:
            return {...state, isFetching: action.isFetching, errorMessage: action.errorMessage};
        default:
            return state;
    }
}
