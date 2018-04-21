import React, {Component} from 'react';
import {Button, Form, Header, Modal, Segment, TransitionablePortal} from 'semantic-ui-react'
import {postConfig} from "../../config/utils";


class ReleaseInit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openReleaseModal: false,
            openNotification: false,
            notification_message: ''
        };
    }

    createRelease(releaseData) {
        let config = postConfig(releaseData);
        config.method = "POST";

        fetch(`/api/release/`, config)
            .then((response) => {
                if (response.ok) {
                    this.notificationModal('Release created! New tag: ' + releaseData.tag + ' created.');
                } else {
                    response.json().then(json => {
                        this.notificationModal('Release Initialization FAILED! ' + json.error);
                    });
                }
            })
            .catch((err) => console.log('Fetch Error :-S', err));
    }

    releaseModal = () => this.setState({...this.state, openReleaseModal: !this.state.openReleaseModal});

    notificationModal = (msg = '') => this.setState(
        {
            ...this.state,
            openNotification: !this.state.openNotification,
            notification_message: msg
        });

    handleReleaseSubmit = (e) => {
        let tag = e.target.tag.value;
        let login = e.target.login.value;
        let pass = e.target.pass.value;

        this.releaseModal();

        this.createRelease({
            'tag': tag,
            'login': login,
            'password': pass
        });
    };

    render() {
        let {openReleaseModal, openNotification, notification_message} = this.state;

        return (
            <div>
                <Button onClick={this.releaseModal} secondary>Init Release Voting</Button>

                <Modal dimmer='blurring' open={openReleaseModal} size='small' onClose={this.releaseModal}>
                    <Segment inverted>
                        <Header as='h3' textAlign='center'>
                            Initialize Release Voting
                        </Header>
                        <Form inverted onSubmit={this.handleReleaseSubmit}>
                            <Form.Input label='Tag'
                                        placeholder='tag'
                                        name='tag'/>

                            <Form.Input label='Login'
                                        placeholder='login'
                                        name='login'/>

                            <Form.Input label='Password'
                                        placeholder='password'
                                        name='pass'
                                        type='password'/>

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

export default ReleaseInit;