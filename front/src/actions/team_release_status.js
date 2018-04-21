import fetch from "isomorphic-fetch";
export const TEAM_RELEASE_STATUS_REQUEST_STARTS = 'TEAM_RELEASE_STATUS_REQUEST_STARTS';
export const TEAM_RELEASE_STATUS_REQUEST_SUCCESS = 'TEAM_RELEASE_STATUS_REQUEST_SUCCESS';
export const TEAM_RELEASE_STATUS_REQUEST_FAIL = 'TEAM_RELEASE_STATUS_REQUEST_FAIL';


function teamReleaseStatusReqStarts() {
    return {
        type: TEAM_RELEASE_STATUS_REQUEST_STARTS,
        isFetching: false
    }
}

function teamReleaseStatusReqSuccess(team_release_status) {
    return {
        type: TEAM_RELEASE_STATUS_REQUEST_SUCCESS,
        isFetching: true,
        team_release_status
    }
}

function teamReleaseStatusReqFail(errorMessage) {
    return {
        type: TEAM_RELEASE_STATUS_REQUEST_FAIL,
        isFetching: false,
        errorMessage
    }
}

export function getTeamReleaseStatuses() {
    return (dispatch) => {
        dispatch(teamReleaseStatusReqStarts());
        return fetch(`/api/team_release_status/`, {'method': 'GET'})
            .then((response) => {
                if (response.ok){
                    response.json().then((json) => dispatch(teamReleaseStatusReqSuccess(json)));
                } else {
                    dispatch(teamReleaseStatusReqFail(response.error))
                }
            })
            .catch(err =>
                console.log('Fetch Error :-S', err)
            );
    }
}
