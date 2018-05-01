import fetch from "isomorphic-fetch";
export const BUG_HISTORY_REQUEST_STARTS = 'BUG_HISTORY_REQUEST_STARTS';
export const BUG_HISTORY_REQUEST_SUCCESS = 'BUG_HISTORY_REQUEST_SUCCESS';
export const BUG_HISTORY_REQUEST_FAIL = 'BUG_HISTORY_REQUEST_FAIL';


function bugHistoryReqStarts() {
    return {
        type: BUG_HISTORY_REQUEST_STARTS,
        isFetching: false
    }
}

function bugHistoryReqSuccess(bug_history) {
    return {
        type: BUG_HISTORY_REQUEST_SUCCESS,
        isFetching: true,
        bug_history
    }
}

function bugHistoryReqFail(errorMessage) {
    return {
        type: BUG_HISTORY_REQUEST_FAIL,
        isFetching: false,
        errorMessage
    }
}

export function getBugHistory() {
    return (dispatch) => {
        dispatch(bugHistoryReqStarts());
        return fetch(`/api/bug_history/stat/`, {'method': 'GET'})
            .then((response) => {
                if (response.ok){
                    response.json().then((json) => dispatch(bugHistoryReqSuccess(json)));
                } else {
                    dispatch(bugHistoryReqFail(response.error))
                }
            })
            .catch(err =>
                console.log('Fetch Error :-S', err)
            );
    }
}
