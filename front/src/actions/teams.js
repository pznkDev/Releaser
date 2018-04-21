import fetch from "isomorphic-fetch";
export const TEAMS_REQUEST_STARTS = 'TEAMS_REQUEST_STARTS';
export const TEAMS_REQUEST_SUCCESS = 'TEAMS_REQUEST_SUCCESS';
export const TEAMS_REQUEST_FAIL = 'TEAMS_REQUEST_FAIL';


function teamsReqStarts() {
    return {
        type: TEAMS_REQUEST_STARTS,
        isFetching: false
    }
}

function teamsReqSuccess(teams) {
    return {
        type: TEAMS_REQUEST_SUCCESS,
        isFetching: true,
        teams
    }
}

function teamsReqFail(errorMessage) {
    return {
        type: TEAMS_REQUEST_FAIL,
        isFetching: false,
        errorMessage
    }
}

export function getTeams() {
    return (dispatch) => {
        dispatch(teamsReqStarts());
        return fetch(`/api/team/`, {'method': 'GET'})
            .then((response) => {
                if (response.ok){
                    response.json().then((json) => dispatch(teamsReqSuccess(json.teams)));
                } else {
                    dispatch(teamsReqFail(response.error))
                }
            })
            .catch(err =>
                console.log('Fetch Error :-S', err)
            );
    }
}
