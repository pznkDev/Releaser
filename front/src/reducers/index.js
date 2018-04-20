import {combineReducers} from 'redux';
import {bugs} from './bugs'
import {release} from './release'
import {teams} from "./teams";
import {teamReleaseStatus} from "./team_release_status"


const allReducers = combineReducers({
    bugs,
    release,
    teams,
    teamReleaseStatus
});

export default allReducers
