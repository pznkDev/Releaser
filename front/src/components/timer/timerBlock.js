import React, {Component} from 'react';
import FlipClock from './timer'
import {Header} from "semantic-ui-react";

class Timer extends Component {
    render() {
        return (
            <div>
                <Header size='huge' inverted> Next RELEASE in: </Header>
                <FlipClock/>
            </div>
        )
    }
}

export default Timer
