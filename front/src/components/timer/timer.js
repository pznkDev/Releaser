import React, {Component} from 'react';
import './css/timer.css'
import {getTimer} from '../../actions/timer';
import {connect} from "react-redux";
import {Header} from "semantic-ui-react";


class AnimatedCard extends Component {
    render() {
        const {position, digit, animation} = this.props;
        return (
            <div className={`flipCard ${position} ${animation}`}>
                <span>{digit}</span>
            </div>
        );
    }
}

class StaticCard extends Component {
    render() {
        const {position, digit} = this.props;
        return (
            <div className={position}>
                <span>{digit}</span>
            </div>
        );
    }
}

class FlipUnitContainer extends Component {

    render() {
        const {digit, shuffle, unit} = this.props;

        let now = digit;
        let before = digit + 1;

        if (unit !== 'hours') {
            before = before === -1 ? 59 : before;
        } else {
            before = before === -1 ? 23 : before;
        }

        if (now < 10) now = `0${now}`;
        if (before < 10) before = `0${before}`;

        const digit1 = shuffle ? before : now;
        const digit2 = !shuffle ? before : now;

        const animation1 = shuffle ? 'fold' : 'unfold';
        const animation2 = !shuffle ? 'fold' : 'unfold';

        return (
            <div className={'flipUnitContainer'}>
                <StaticCard
                    position={'upperCard'}
                    digit={now}
                />
                <StaticCard
                    position={'lowerCard'}
                    digit={before}
                />
                <AnimatedCard
                    position={'first'}
                    digit={digit1}
                    animation={animation1}
                />
                <AnimatedCard
                    position={'second'}
                    digit={digit2}
                    animation={animation2}
                />
            </div>
        );
    }
}

class FlipClock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hours: 0,
            hoursShuffle: true,
            minutes: 0,
            minutesShuffle: true,
            seconds: 0,
            secondsShuffle: true
        };
    }

    componentWillMount() {
        this.props.getTimer();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.timer) {
            let timer_value = nextProps.timer.timer_value;
            if (nextProps.timer.timer_delay !== undefined) {
                timer_value += nextProps.timer.timer_delay;
            }
            this.countdown = new Date(timer_value * 1000).getTime();
        }
        else {
            new Date('0').getTime();
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.updateTime(),
            50
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    updateTime() {
        const now = new Date().getTime();

        const distance = this.countdown - now;

        if (distance > 0) {
            const days = Math.ceil(distance / (1000 * 3600 * 24));
            const hours = days * 24 + Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (hours !== this.state.hours) {
                const hoursShuffle = !this.state.hoursShuffle;
                this.setState({
                    hours,
                    hoursShuffle
                });
            }

            if (minutes !== this.state.minutes) {
                const minutesShuffle = !this.state.minutesShuffle;
                this.setState({
                    minutes,
                    minutesShuffle
                });
            }

            if (seconds !== this.state.seconds) {
                const secondsShuffle = !this.state.secondsShuffle;
                this.setState({
                    seconds,
                    secondsShuffle
                });
            }
        } else {
            clearInterval(this.timerID);
        }

    }

    renderAdditionalTimerMsg() {
        const delay = this.props.timer.timer_delay;
        if (delay === undefined) {
            return <div></div>
        } else {
            return (
                this.props.timer.timer_delay === 0 ?
                    <Header as='h3' inverted color='grey'>(Updating . . .)</Header> :
                    <Header as='h3' inverted color='grey'>(Delay for {this.props.timer.timer_delay})</Header>)
        }
    }

    render() {
        const {hours, minutes, seconds, hoursShuffle, minutesShuffle, secondsShuffle} = this.state;
        return (
            <div>
                <div className={'flipClock'}>
                    <FlipUnitContainer
                        unit={'hours'}
                        digit={hours}
                        shuffle={hoursShuffle}
                    />
                    <FlipUnitContainer
                        unit={'minutes'}
                        digit={minutes}
                        shuffle={minutesShuffle}
                    />
                    <FlipUnitContainer
                        unit={'seconds'}
                        digit={seconds}
                        shuffle={secondsShuffle}
                    />
                </div>
                {this.renderAdditionalTimerMsg()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.timer.isFetching,
        timer: state.timer.timer,
        errorMessage: state.timer.errorMessage
    }
}

export default connect(mapStateToProps, {getTimer})(FlipClock);
