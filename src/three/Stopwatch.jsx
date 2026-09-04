import React from 'react';
import { connect } from 'react-redux';
import { updateTime } from '../store/time';

class Stopwatch extends React.Component {
  constructor() {
    super();
    this.state = {
      startTime: performance.now(),
      elapsedTime: 0,
    };
    this.timer = null;
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      const elapsedSeconds = (performance.now() - this.state.startTime) / 1000;
      this.setState({
        elapsedTime: elapsedSeconds,
      });
      this.props.updateTime(elapsedSeconds);

      const minutes = Math.floor(elapsedSeconds / 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      const seconds = Math.floor(elapsedSeconds % 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      const milliseconds = Math.floor((elapsedSeconds % 1) * 100).toLocaleString(
        'en-US',
        { minimumIntegerDigits: 2, useGrouping: false }
      );

      const el = document.getElementById('elapsed-time');
      if (el) {
        el.innerHTML = `${minutes}:${seconds}:${milliseconds}`;
      }
    }, 10);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  resetTime() {
    this.setState({
      startTime: performance.now(),
      elapsedTime: 0,
    });
  }

  render() {
    return (
      <div id="stopwatch">
        <div id="elapsed-time">00:00:00</div>
        <hr />
        <p id="elapsed-label">ELAPSED TIME</p>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  updateTime: (time) => dispatch(updateTime(time)),
});

export default connect(null, mapDispatch)(Stopwatch);
