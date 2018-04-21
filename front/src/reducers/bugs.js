import {
    BUGS_REQUEST_STARTS, BUGS_REQUEST_SUCCESS, BUGS_REQUEST_FAIL
} from '../actions/bugs';

export function bugs(state={bugs: []}, action) {
    switch (action.type) {
        case BUGS_REQUEST_STARTS:
            return {...state, isFetching: action.isFetching};
        case BUGS_REQUEST_SUCCESS:
            return {
                ...state,
                isFetching: action.isFetching,
                errorMessage: '',
                bugs: action.bugs,
                pages: action.pages
            };
        case BUGS_REQUEST_FAIL:
            return {...state, isFetching: action.isFetching, errorMessage: action.errorMessage};
        default:
            return state;
    }
}
