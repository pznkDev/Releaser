import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getBugHistory} from '../../actions/bug_history'
import {getTeams} from "../../actions/teams";
import styles from './css/index.css';
import {Checkbox, Form, Grid, Header} from "semantic-ui-react";


class Statistic extends Component {

    constructor(props) {
        super(props);

        this.state = {
            period: 'month',
            priority: 'all',
            team: 'all',
            bugsCurrent: []
        };
    }

    componentWillMount() {
        this.props.actions.getTeams();
        this.props.actions.getBugHistory();
    }

    componentWillReceiveProps(nextProps){
        if (this.props.bugs.length === 0 && nextProps.bugs.length > 0){
            this.setState({...this.state, bugsCurrent: nextProps.bugs});
        }
    }

    filter(newData){
        let {period, priority, team} = {...this.state, ...newData};
        let bugs = this.props.bugs;

        let bugsCurrentUpdated = bugs.filter(bug => {
            if ((priority !== 'all') && (bug.priority !== priority)) return false;
            if ((team !== 'all') && (bug.team_name !== team)) return false;
            return true
        });

        this.setState({...this.state, ...newData, bugsCurrent: bugsCurrentUpdated})
    }

    handlePeriodChange = (e, { value }) => this.filter({period:value});
    handlePriorityChange = (e, { value }) => this.filter({priority:value});
    handleTeamChange = (e, { value }) => this.filter({team:value});


    renderTeams() {
        return this.props.teams.map((team, key) => {
            return (
                <Form.Field key={key}>
                    <Checkbox radio
                              label={team.name}
                              name='checkboxTeam'
                              value={team.name}
                              checked={this.state.team === team.name}
                              onChange={this.handleTeamChange}
                    />
                </Form.Field>
            )
        });
    }

    renderOptionsMenu() {
        let {period, priority, team, bugsCurrent} = this.state;
        return (
            <Grid columns='equal' padded='horizontally'>
                <Grid.Column>
                    <Form inverted>
                        <Header as={'h3'} inverted>
                            Choose timeline
                        </Header>
                        <Form.Field>
                            <Checkbox radio
                                      label='24 hours'
                                      name='checkboxPeriod'
                                      value='day'
                                      checked={period === 'day'}
                                      onChange={this.handlePeriodChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox radio
                                      label='Week'
                                      name='checkboxPeriod'
                                      value='week'
                                      checked={period === 'week'}
                                      onChange={this.handlePeriodChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox radio
                                      label='Month'
                                      name='checkboxPeriod'
                                      value='month'
                                      checked={period === 'month'}
                                      onChange={this.handlePeriodChange}

                            />
                        </Form.Field>
                    </Form>
                </Grid.Column>
                <Grid.Column>
                    <Form inverted>
                        <Header as={'h3'} inverted>
                            Choose priority
                        </Header>
                        <Form.Field>
                            <Checkbox radio
                                      label='All'
                                      name='checkboxPriority'
                                      value='all'
                                      checked={priority === 'all'}
                                      onChange={this.handlePriorityChange}

                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox radio
                                      label='minor'
                                      name='checkboxPriority'
                                      value='minor'
                                      checked={priority === 'minor'}
                                      onChange={this.handlePriorityChange}

                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox radio
                                      label='major'
                                      name='checkboxPriority'
                                      value='major'
                                      checked={priority === 'major'}
                                      onChange={this.handlePriorityChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox radio
                                      label='critical'
                                      name='checkboxPriority'
                                      value='critical'
                                      checked={priority === 'critical'}
                                      onChange={this.handlePriorityChange}
                            />
                        </Form.Field>
                    </Form>
                </Grid.Column>
                <Grid.Column>
                    <Form inverted>
                        <Header as={'h3'} inverted>
                            Choose Team
                        </Header>
                        <Form.Field>
                            <Checkbox radio
                                      label='All'
                                      name='checkboxPriority'
                                      value='all'
                                      checked={team === 'all'}
                                      onChange={this.handleTeamChange}
                            />
                        </Form.Field>
                        {this.renderTeams()}
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }

    render() {
        return (
            <div className={styles.stat_cont}>
                <h1 className={styles.stat_header_name}>Statistic</h1>
                <div className={styles.stat_params_cont}>
                    {this.renderOptionsMenu()}
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        isFetching: state.bugHistory.isFetching,
        bugs: state.bugHistory.bug_history,
        errorMessage: state.bugHistory.errorMessage,
        teams: state.teams.teams
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getBugHistory: bindActionCreators(getBugHistory, dispatch),
            getTeams: bindActionCreators(getTeams, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Statistic);
