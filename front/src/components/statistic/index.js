import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


import {getBugHistory} from '../../actions/bug_history'
import {getTeams} from "../../actions/teams";
import styles from './css/index.css';
import {Checkbox, Divider, Form, Grid, Header} from "semantic-ui-react";


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

    filter(newData) {
        let {period, priority, team} = {...this.state, ...newData};
        let bugs = this.props.bugs;

        let bugsCurrentUpdated = bugs.filter(bug => {
            if ((priority !== 'all') && (bug.priority !== priority)) return false;
            if ((team !== 'all') && (bug.team_name !== team)) return false;
            return true
        });

        this.setState({...this.state, ...newData, bugsCurrent: bugsCurrentUpdated})
    }

    handlePeriodChange = (e, {value}) => this.filter({period: value});
    handlePriorityChange = (e, {value}) => this.filter({priority: value});
    handleTeamChange = (e, {value}) => this.filter({team: value});


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
        if (this.props.bugs.length && period==='month' && priority==='all' && team==='all'){
            this.setState({...this.state, bugsCurrent: this.props.bugs})
        }

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

    renderBarChart() {
        if (this.state.bugsCurrent.length) {
            let data = this.props.teams.map((team) => ({
                name: team.name,
                minor: 0,
                major: 0,
                critical: 0
            }));
            for (let i = 0; i < this.state.bugsCurrent.length; i++) {
                for (let j = 0; j < data.length; j++) {
                    if (this.state.bugsCurrent[i].team_name === data[j].name) {
                        data[j][this.state.bugsCurrent[i].priority] += 1
                    }
                }

            }

            return (
                <BarChart width={600} height={300} data={data}
                          margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid vertical={false} stroke="#F5F5F5"/>
                    <XAxis dataKey="name" stroke="#F5F5F5" fontFamily="monospace"/>
                    <YAxis stroke="#F5F5F5" fontFamily="monospace"/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="minor" stackId="a" fill="#EEEEEE"/>
                    <Bar dataKey="major" stackId="a" fill="#757575"/>
                    <Bar dataKey="critical" stackId="a" fill="#212121"/>
                </BarChart>
            )
        }

        return <h2>Not enough data for barChart</h2>
    }

    render() {
        return (
            <div className={styles.stat_cont}>
                <h1 className={styles.stat_header_name}>Statistic</h1>
                <div className={styles.stat_params_cont}>
                    {this.renderOptionsMenu()}
                </div>
                <Divider horizontal inverted>Charts</Divider>
                <div>
                    {this.renderBarChart()}
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
