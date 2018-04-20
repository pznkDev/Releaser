import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getTeamReleaseStatuses} from '../../actions/team_release_status';
import {Divider, Grid, Header, Popup, Segment} from 'semantic-ui-react'
import styles from './css/team_release_status.css';


class TeamReleaseStatus extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getTeamReleaseStatuses();
    }

    renderTeamReleaseStatuses() {
        if (this.props.team_release_status.length > 0) {
            console.log(this.props.team_release_status);
            return this.props.team_release_status.map((status, key) => {
                const IndCard = (
                    <Segment textAlign='center'>{status.team}</Segment>
                );

                return (
                    <Grid.Column>
                        <Popup trigger={IndCard} key={key} position='top center' verticalOffset={10}>
                            <Header textAlign='center'>{status.status}</Header>
                            <Divider inverted/>
                            {status.status === 'unready' &&
                            <Popup.Content>
                                <p>Comment: {status.comment}</p>
                                <p>Delay: {status.time_delay}</p>
                            </Popup.Content>
                            }
                            {status.status === 'ready' &&
                            <Popup.Content>
                                <p>Comment: {status.comment}</p>
                            </Popup.Content>
                            }
                        </Popup>
                    </Grid.Column>
                )
            });
        }
        return (<div>No statuses</div>)
    }

    render() {
        return (
            <div className={styles.container_horizontal}>
                <Header as='h1' inverted textAlign='center'>Statuses</Header>
                <div className={styles.container_statuses}>
                    <Grid columns='equal'>
                        {this.renderTeamReleaseStatuses()}
                    </Grid>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        isFetching: state.teamReleaseStatus.isFetching,
        team_release_status: state.teamReleaseStatus.team_release_status,
        errorMessage: state.teamReleaseStatus.errorMessage
    }
}

export default connect(mapStateToProps, {getTeamReleaseStatuses})(TeamReleaseStatus);
