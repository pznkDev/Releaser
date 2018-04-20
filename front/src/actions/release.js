import fetch from "isomorphic-fetch";
export const RELEASE_REQUEST_STARTS = 'RELEASE_REQUEST_STARTS';
export const RELEASE_REQUEST_SUCCESS = 'RELEASE_REQUEST_SUCCESS';
export const RELEASE_REQUEST_FAIL = 'RELEASE_REQUEST_FAIL';


function releaseReqStarts() {
    return {
        type: RELEASE_REQUEST_STARTS,
        isFetching: false
    }
}

function releaseReqSuccess(release) {
    console.log(release);
    return {
        type: RELEASE_REQUEST_SUCCESS,
        isFetching: true,
        release: release
    }
}

function releaseReqFail(errorMessage) {
    return {
        type: RELEASE_REQUEST_FAIL,
        isFetching: false,
        errorMessage
    }
}

export function getRelease() {
    return (dispatch) => {
        dispatch(releaseReqStarts());
        return fetch(`/api/release/`, {'method': 'GET'})
            .then((response) => {
                if (response.ok){
                    response.json().then((json) => dispatch(releaseReqSuccess(json)));
                } else {
                    dispatch(releaseReqFail(response.error))
                }
            })
            .catch(err =>
                console.log('Fetch Error :-S', err)
            );
    }
}
