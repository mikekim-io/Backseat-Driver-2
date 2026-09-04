import React from 'react';
import { connect } from 'react-redux';
import { fetchLeaderboard } from '../store/leaderboard';
import { Modal, Table } from 'react-bootstrap';

class Leaderboard extends React.Component {
  constructor() {
    super();
    this.formatScore = this.formatScore.bind(this);
  }

  componentDidMount() {
    this.props.fetchLeaderboard();
  }

  formatScore(time) {
    if (!time) {
      return `00:00:00`;
    } else {
      let elapsedTime = time;
      let minutes, seconds, milliseconds;
      minutes = Math.floor(elapsedTime / 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      seconds = Math.floor(elapsedTime - minutes * 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      milliseconds = Math.floor((elapsedTime % 1) * 100).toLocaleString(
        'en-US',
        { minimumIntegerDigits: 2, useGrouping: false }
      );
      return `${minutes}:${seconds}:${milliseconds}`;
    }
  }

  render() {
    const leaderboard = this.props.leaderboard || [];

    return (
      <Modal
        centered
        show={this.props.showModal}
        onHide={this.props.toggleLeaderboard}
        dialogClassName="leaderboard-modal"
      >
        <div>
          <h1>Backseat Driver Leaderboard</h1>
          <div className="table-shell">
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Course Time</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center' }}>
                      No scores recorded yet. Be the first!
                    </td>
                  </tr>
                ) : (
                  leaderboard.map((record, idx) => (
                    <tr key={record.id || idx}>
                      <td>{idx + 1}</td>
                      <td>{record.name}</td>
                      <td>
                        <i>{this.formatScore(record.score)}</i>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
          <button onClick={this.props.toggleLeaderboard}>
            Close Leaderboard
          </button>
        </div>
      </Modal>
    );
  }
}

const mapState = (state) => ({
  leaderboard: state.leaderboard,
});

const mapDispatch = (dispatch) => ({
  fetchLeaderboard: () => dispatch(fetchLeaderboard()),
});

export default connect(mapState, mapDispatch)(Leaderboard);
