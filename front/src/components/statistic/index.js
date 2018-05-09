import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Radar, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis, AreaChart, Area
} from 'recharts';


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

    renderRadarChart() {
        if (this.state.bugsCurrent.length) {
            let data = [
                {priority: 'minor'},
                {priority: 'major'},
                {priority: 'critical'},
            ];
            for (let i = 0; i < this.props.teams.length; i++) {
                for (let j = 0; j < data.length; j++) {
                    let team = this.props.teams[i].name;
                    data[j][team] = 0
                }
            }

            for (let i = 0; i < this.state.bugsCurrent.length; i++) {
                for (let j = 0; j < data.length; j++) {
                    if (this.state.bugsCurrent[i].priority === data[j].priority) {
                        data[j][this.state.bugsCurrent[i].team_name] += 1
                    }
                }
            }

            return (
                <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={400} data={data}>
                    <PolarGrid/>
                    <PolarAngleAxis dataKey="priority"/>
                    <PolarRadiusAxis angle={90}/>
                    <Radar name="Qa" dataKey="Qa" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                    <Radar name="Back" dataKey="Back" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6}/>
                    <Radar name="Front" dataKey="Front" stroke="#521525" fill="#985721" fillOpacity={0.6}/>
                    <Radar name="Design" dataKey="Design" stroke="#898989" fill="#a5a5a5" fillOpacity={0.6}/>
                    <Legend/>
                </RadarChart>
            )
        }

        return <h2>Not enough data for radarChart</h2>
    }

    renderAreaChart() {
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

            const getPercent = (value, total) => {
                const ratio = total > 0 ? value / total : 0;

                return toPercent(ratio, 2);
            };

            const toPercent = (decimal, fixed = 0) => {
                return `${(decimal * 100).toFixed(fixed)}%`;
            };
            const renderTooltipContent = (o) => {
                const {payload, label} = o;
                const total = payload.reduce((result, entry) => (result + entry.value), 0);

                return (
                    <div className="customized-tooltip-content">
                        <p className="total">{`${label} (Total: ${total})`}</p>
                        <ul className="list">
                            {
                                payload.map((entry, index) => (
                                    <li key={`item-${index}`} style={{color: entry.color}}>
                                        {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                );
            };

            return (
                <AreaChart width={600} height={400} data={data} stackOffset="expand"
                           margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <XAxis dataKey="month"/>
                    <YAxis tickFormatter={toPercent}/>
                    <Tooltip content={renderTooltipContent}/>
                    <Area type='monotone' dataKey='minor' stackId="1" stroke='#8884d8' fill='#8884d8'/>
                    <Area type='monotone' dataKey='major' stackId="1" stroke='#82ca9d' fill='#82ca9d'/>
                    <Area type='monotone' dataKey='critical' stackId="1" stroke='#ffc658' fill='#ffc658'/>
                </AreaChart>
            )
        }

        return <h2>Not enough data for AreaChart</h2>
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
                    {this.renderRadarChart()}
                    {this.renderAreaChart()}
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
