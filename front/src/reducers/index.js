import {combineReducers} from 'redux';
import {bugs} from './bugs'
import {teams} from "./teams";
import {teamReleaseStatus} from "./team_release_status"


const allReducers = combineReducers({
    bugs,
    teams,
    teamReleaseStatus
});

export default allReducers
