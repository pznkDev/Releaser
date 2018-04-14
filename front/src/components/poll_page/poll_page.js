import React, {Component} from 'react';

import styles from './css/poll_page.css';

import ReleaseInit from "../release_init_modal/release_init_modal";
import VotePoll from "../vote_poll_modal/vote_poll_modal";
import ReleaseTeamStatus from "../team_release_status/team_release_status"

class Poll extends Component {

    render() {
        return (
            <div className={styles.container_full}>
                <ReleaseInit/>
                <VotePoll/>
                <ReleaseTeamStatus/>
            </div>
        )
    }
}

export default Poll;
