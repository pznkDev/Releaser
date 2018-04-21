import React, {Component} from 'react';
import './css/timer.css'


class AnimatedCard extends React.Component {
  render() {
    const { position, digit, animation } = this.props;
    return(
      <div className={`flipCard ${position} ${animation}`}>
        <span>{digit}</span>
      </div>
    );
  }
}

class StaticCard extends React.Component {
  render() {
    const { position, digit } = this.props;
    return(
      <div className={position}>
        <span>{digit}</span>
      </div>
    );
  }
}

class FlipUnitContainer extends React.Component {

  render() {
    const { digit, shuffle, unit } = this.props;

    let now = digit;
    let before = digit + 1;

    if( unit !== 'hours') {
      before = before === -1 ? 59 : before;
    } else {
      before = before === -1 ? 23 : before;
    }

    if( now < 10 ) now = `0${now}`;
    if( before < 10 ) before = `0${before}`;

    const digit1 = shuffle ? before : now;
    const digit2 = !shuffle ? before : now;

    const animation1 = shuffle ? 'fold' : 'unfold';
    const animation2 = !shuffle ? 'fold' : 'unfold';

    return(
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

class FlipClock extends React.Component {
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
  componentDidMount() {
    this.countdown =  new Date("Apr 25, 2018 13:16:00").getTime();
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
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if( hours !== this.state.hours) {
        const hoursShuffle = !this.state.hoursShuffle;
        this.setState({
          hours,
          hoursShuffle
        });
      }

      if( minutes !== this.state.minutes) {
        const minutesShuffle = !this.state.minutesShuffle;
        this.setState({
          minutes,
          minutesShuffle
        });
      }

      if( seconds !== this.state.seconds) {
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
  render() {
    const { hours, minutes, seconds, hoursShuffle, minutesShuffle, secondsShuffle } = this.state;
    return(
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
    );
  }
}

class Header extends React.Component {
  render() {
    return(
      <header>
        <h1> Timer </h1>
      </header>
    );
  }
}


class Timer extends Component {
    render() {
        return (
            <div>
                <Header />
                <FlipClock />
            </div>
        )
    }
}

export default Timer
