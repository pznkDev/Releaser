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
            team: 'all'
        };
    }

    componentWillMount() {
        this.props.actions.getTeams();
        this.props.actions.getBugHistory();
    }

    renderTeams() {
        return this.props.teams.map((team, key) => {
            return (
                <Form.Field key={key}>
                    <Checkbox radio
                              label={team.name}
                              name='checkboxTeam'
                              value={team.name}
                    />
                </Form.Field>
            )
        });
    }

    renderOptionsMenu() {
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
                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox radio
                                      label='Week'
                                      name='checkboxPeriod'
                                      value='week'
                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox radio
                                      label='Month'
                                      name='checkboxPeriod'
                                      value='month'
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
                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox radio
                                      label='minor'
                                      name='checkboxPriority'
                                      value='minor'
                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox radio
                                      label='major'
                                      name='checkboxPriority'
                                      value='major'
                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox radio
                                      label='critical'
                                      name='checkboxPriority'
                                      value='critical'
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
