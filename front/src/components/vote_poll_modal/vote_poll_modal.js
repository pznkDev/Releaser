import React, {Component} from 'react';
import {Button, Dropdown, Form, Header, Modal, Segment, TransitionablePortal} from 'semantic-ui-react'
import {connect} from 'react-redux';

import {getTeams} from '../../actions/teams';
import styles from './css/vote_poll_modal.css';
import {postConfig} from "../../config/utils";


class VotePoll extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openPollModal: false,
            openNotification: false,
            notification_message: '',
            curRelease: {},
            curTeamId: 0,
            status: ''
        };
    }

    componentWillMount() {
        this.props.getTeams();
        this.getLastRelease();
    }

    getLastRelease() {
        fetch(`/api/release/`, {'method': 'GET'})
            .then((response) => {
                if (response.ok) {
                    response.json().then((json) => this.setState({...this.state, curRelease: json}))
                } else {
                    console.log('loading last release error');
                }
            })
            .catch(err =>
                console.log('Fetch Error :-S', err)
            );
    }

    voteRequest(voteData) {
        let config = postConfig(voteData);
        config.method = "PUT";

        fetch(`/api/team_release_status/`, config)
            .then((response) => {
                if (response.ok) {
                    this.notificationModal('Thank you for voting!');
                } else {
                    response.json().then(json => {
                        this.notificationModal('Oops, something went wrong !' + json.error);
                    });
                }
            })
            .catch((err) => console.log('Fetch Error :-S', err));
    }

    pollModal = () => this.setState({...this.state, openPollModal: !this.state.openPollModal});

    notificationModal = (msg = '') => this.setState(
        {
            ...this.state,
            openNotification: !this.state.openNotification,
            notification_message: msg
        });

    handleReleaseSubmit = (e) => {
        let comment = e.target.comment.value;
        let delay = 0;
        if (this.state.status === 'unready'){
            delay = e.target.delay.value;
        }
        let login = e.target.login.value;
        let password = e.target.pass.value;

        this.pollModal();

        this.voteRequest({
            'team_id': this.state.curTeamId,
            'release_id': this.state.curRelease.release_id,
            'status': this.state.status,
            'comment': comment,
            'time_delay': delay,
            'username': login,
            'password': password
        });

    };

    handleStatusChange = (e, {value}) => this.setState({...this.state, status: value});

    handleTeamChange = (e, {value}) => this.setState({...this.state, curTeamId: value});

    render() {
        let {openPollModal, openNotification, notification_message, curRelease, status} = this.state;
        let teamsDropdown = [];
        if (this.props.teams.length > 0) {
            teamsDropdown = this.props.teams.map((team, key) => {
                return {text: team.name, value: team.team_id}
            });
        }

        return (
            <div>
                <Button onClick={this.pollModal} secondary>Vote for Team</Button>

                <Modal dimmer='blurring' open={openPollModal} size='small' onClose={this.pollModal}>
                    <Segment inverted>
                        <Header as='h3'
                                textAlign='center'>{curRelease ? 'Vote for tag ' + curRelease.tag : 'Tag loading failed'}</Header>
                        <Form inverted onSubmit={this.handleReleaseSubmit}>

                            <Dropdown fluid selection placeholder='Select Team'
                                      options={teamsDropdown}
                                      onChange={this.handleTeamChange}
                            />

                            <div className={styles.container}>
                                <Form.Group inline>
                                    <label>Status</label>
                                    <Form.Radio label='Ready'
                                                checked={status === 'ready'}
                                                value='ready'
                                                onChange={this.handleStatusChange}/>
                                    <Form.Radio label='Unready'
                                                checked={status === 'unready'}
                                                value='unready'
                                                onChange={this.handleStatusChange}/>
                                </Form.Group>
                            </div>

                            {status === 'unready' &&
                            <Form.Input label='Delay'
                                        placeholder='delay'
                                        name='delay'/>
                            }

                            <Form.Input label='Comment'
                                        placeholder='comment'
                                        name='comment'/>

                            <Form.Group widths='equal'>

                                <Form.Input label='Login'
                                            placeholder='login'
                                            name='login'/>

                                <Form.Input label='Password'
                                            placeholder='password'
                                            name='pass'
                                            type='password'/>
                            </Form.Group>

                            <Form.Button content='Submit'/>
                        </Form>
                    </Segment>
                </Modal>

                <TransitionablePortal onClose={this.notificationModal}
                                      open={openNotification}
                                      transition={{'animation': 'scale'}}>
                    <Segment inverted style={{left: '40%', position: 'fixed', top: '50%', zIndex: 1000}}>
                        <p>{notification_message}</p>
                    </Segment>
                </TransitionablePortal>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.teams.isFetching,
        teams: state.teams.teams,
        errorMessage: state.teams.errorMessage
    }
}

export default connect(mapStateToProps, {getTeams})(VotePoll);
