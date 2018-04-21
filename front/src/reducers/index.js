import {combineReducers} from 'redux';
import {bugs} from './bugs'
import {release} from './release'
import {timer} from './timer';
import {teams} from "./teams";
import {teamReleaseStatus} from "./team_release_status"


const allReducers = combineReducers({
    bugs,
    release,
    timer,
    teams,
    teamReleaseStatus
});

export default allReducers
