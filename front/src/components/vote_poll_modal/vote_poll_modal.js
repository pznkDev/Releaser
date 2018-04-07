import React, {Component} from 'react';
import {Button, Form, Header, Modal, Segment, TransitionablePortal} from 'semantic-ui-react'


class VotePoll extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openPollModal: false,
            openNotification: false,
            notification_message: ''
        };
    }

    voteRequest(voteData) {
        console.log(voteData);
    }

    pollModal = () => this.setState({...this.state, openPollModal: !this.state.openPollModal});

    notificationModal = (msg = '') => this.setState(
        {
            ...this.state,
            openNotification: !this.state.openNotification,
            notification_message: msg
        });

    handleReleaseSubmit = (e) => {
        let teamId = e.target.team_id.value;
        let releaseId = e.target.release_id.value;
        let status = e.target.status.value;
        let comment = e.target.comment.value;
        let delay = e.target.delay.value;
        let login = e.target.login.value;
        let password = e.target.pass.value;

        this.pollModal();

        this.voteRequest({
            'team_id': teamId,
            'release_id': releaseId,
            'status': status,
            'comment': comment,
            'delay': delay,
            'login': login,
            'password': password,
            'time_created': new Date().toLocaleString()
        });

    };

    render() {
        let {openPollModal, openNotification, notification_message} = this.state;
        console.log(openPollModal, openNotification);
        return (
            <div>
                <Button onClick={this.pollModal}>Vote</Button>

                <Modal dimmer='blurring' open={openPollModal} size='small' onClose={this.pollModal}>
                    <Segment inverted>
                        <Header as='h3' textAlign='center'>Vote</Header>
                        <Form inverted onSubmit={this.handleReleaseSubmit}>

                            <Form.Input label='Team'
                                        placeholder='team id'
                                        name='team_id'/>

                            <Form.Input label='Release'
                                        placeholder='release id'
                                        name='release_id'/>

                            <Form.Input label='Status'
                                        placeholder='status'
                                        name='status'/>

                            <Form.Input label='Comment'
                                        placeholder='comment'
                                        name='comment'/>

                            <Form.Input label='Delay'
                                        placeholder='delay'
                                        name='delay'/>

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

export default VotePoll;
