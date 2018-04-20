import React, {Component} from 'react';

import styles from './css/poll_page.css';

import ReleaseInit from "../release_init_modal/release_init_modal";
import VotePoll from "../vote_poll_modal/vote_poll_modal";
import ReleaseTeamStatus from "../team_release_status/team_release_status"
import Timer from "../timer/timer";
import TagBlock from"../tag_block/tagBlock"


class Poll extends Component {

    render() {
        return (
            <div className={styles.container_full}>
                <div className={styles.container_center}>
                    <div className={styles.container_center_tag}>
                        <TagBlock/>
                    </div>
                    <div className={styles.container_center_timer}>
                        <Timer/>
                    </div>
                    <div className={styles.container_center_modals}>
                        <ReleaseInit/>
                        <VotePoll/>
                    </div>
                </div>
                <div className={styles.container_bottom}>
                    <ReleaseTeamStatus/>
                </div>
            </div>
        )
    }
}

export default Poll;