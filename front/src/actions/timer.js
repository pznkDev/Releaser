import fetch from "isomorphic-fetch";
export const TIMER_REQUEST_STARTS = 'TIMER_REQUEST_STARTS';
export const TIMER_REQUEST_SUCCESS = 'TIMER_REQUEST_SUCCESS';
export const TIMER_REQUEST_FAIL = 'TIMER_REQUEST_FAIL';


function timerReqStarts() {
    return {
        type: TIMER_REQUEST_STARTS,
        isFetching: false
    }
}

function timerReqSuccess(timer) {
    return {
        type: TIMER_REQUEST_SUCCESS,
        isFetching: true,
        timer
    }
}

function timerReqFail(errorMessage) {
    return {
        type: TIMER_REQUEST_FAIL,
        isFetching: false,
        errorMessage
    }
}

export function getTimer() {
    return (dispatch) => {
        dispatch(timerReqStarts());
        return fetch(`/api/timer/`, {'method': 'GET'})
            .then((response) => {
                if (response.ok){
                    response.json().then((json) => dispatch(timerReqSuccess(json)));
                } else {
                    dispatch(timerReqFail(response.error))
                }
            })
            .catch(err =>
                console.log('Fetch Error :-S', err)
            );
    }
}