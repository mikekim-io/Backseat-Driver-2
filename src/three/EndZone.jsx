import React from 'react';
import { connect } from 'react-redux';
import { getPosition } from '../store/position';

class EndZone extends React.Component {
  constructor() {
    super();
    this.zoneRef = React.createRef();
  }

  componentDidMount() {
    if (this.zoneRef.current) {
      this.props.getPosition({
        x: this.zoneRef.current.position.x,
        y: this.zoneRef.current.position.y,
        z: this.zoneRef.current.position.z,
      });
    }
  }

  render() {
    return (
      <mesh ref={this.zoneRef} position={[0, 0, -100]}>
        <boxGeometry args={[20, 100, 20]} />
        <meshStandardMaterial
          wireframe={false}
          color="yellow"
          transparent
          opacity={0.6}
        />
      </mesh>
    );
  }
}

const mapDispatch = (dispatch) => ({
  getPosition: (position) => dispatch(getPosition(position)),
});

export default connect(null, mapDispatch)(EndZone);
