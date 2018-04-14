import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTeamReleaseStatuses } from '../../actions/team_release_status';


class TeamReleaseStatus extends Component {

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.props.getTeamReleaseStatuses();
    }


    render() {
        return (
            <div>
                Team release statuses
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        isFetching: state.teamReleaseStatus.isFetching,
        release_team_status: state.teamReleaseStatus.team_release_status,
        errorMessage: state.teamReleaseStatus.errorMessage
    }
}

export default connect(mapStateToProps, {getTeamReleaseStatuses})(TeamReleaseStatus);
