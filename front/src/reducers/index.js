import {combineReducers} from 'redux';
import {bugs} from './bugs'
import {teams} from "./teams";


const allReducers = combineReducers({
    bugs,
    teams
});

export default allReducers
