import fetch from "isomorphic-fetch";
export const BUGS_REQUEST_STARTS = 'BUGS_REQUEST_STARTS';
export const BUGS_REQUEST_SUCCESS = 'BUGS_REQUEST_SUCCESS';
export const BUGS_REQUEST_FAIL = 'BUGS_REQUEST_FAIL';


function bugsReqStarts() {
    return {
        type: BUGS_REQUEST_STARTS,
        isFetching: false
    }
}

function bugsReqSuccess(bugs, pages) {
    return {
        type: BUGS_REQUEST_SUCCESS,
        isFetching: true,
        bugs,
        pages
    }
}

function bugsReqFail(errorMessage) {
    return {
        type: BUGS_REQUEST_FAIL,
        isFetching: false,
        errorMessage
    }
}

export function getBugs(pageNumber=0) {
    return (dispatch) => {
        dispatch(bugsReqStarts());
        return fetch(`/api/bugs/`, {'method': 'GET'})
            .then((response) => {
                if (response.ok){
                    response.json().then((json) => dispatch(bugsReqSuccess(json.bugs, json.pages)));
                } else {
                    dispatch(bugsReqFail(response.error))
                }
            })
            .catch(err =>
                console.log('Fetch Error :-S', err)
            );
    }
}
