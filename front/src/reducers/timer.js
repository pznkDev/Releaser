import {
    TIMER_REQUEST_STARTS, TIMER_REQUEST_SUCCESS, TIMER_REQUEST_FAIL
} from '../actions/timer';

export function timer(state={timer: ''}, action) {
    switch (action.type) {
        case TIMER_REQUEST_STARTS:
            return {...state, isFetching: action.isFetching};
        case TIMER_REQUEST_SUCCESS:
            return {
                ...state,
                isFetching: action.isFetching,
                errorMessage: '',
                timer: action.timer
            };
        case TIMER_REQUEST_FAIL:
            return {...state, isFetching: action.isFetching, errorMessage: action.errorMessage};
        default:
            return state;
    }
}
