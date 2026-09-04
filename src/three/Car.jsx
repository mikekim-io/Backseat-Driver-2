import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useBox } from '@react-three/cannon';
import car from '../models/models/McLaren.glb';
import { PerspectiveCamera, PointerLockControls } from '@react-three/drei';
import Viewport from './Viewport';
import { connect } from 'react-redux';

let rotation = -90;
let acc = 0;
let baseVel = 0;

const Car = (props) => {
  const gltf = useLoader(GLTFLoader, car);
  const [carRef, api] = useBox(() => ({
    mass: 1,
    args: [4.7, 1.3, 2],
    position: props.carPosition,
  }));

  const currentPos = useRef({ x: 0, y: 1, z: 150 });
  const endZonePosition = props.position || { x: 0, y: 0, z: -100 };

  useFrame(() => {
    if (carRef.current) {
      currentPos.current = carRef.current.position;
    }
    const carPosition = currentPos.current;

    if (
      carPosition.x >= endZonePosition.x - 10 &&
      carPosition.x <= endZonePosition.x + 10 &&
      carPosition.z >= endZonePosition.z - 10 &&
      carPosition.z <= endZonePosition.z + 10
    ) {
      props.stopListening();
      props.changeWin();
      props.changePlaying();
    }

    api.rotation.set(0, (Math.PI * rotation) / 180, 0);
    switch (props.action) {
      case 'right':
        rotation--;
        if (rotation % 90 === 0) {
          props.setAction('');
        }
        break;
      case 'left':
        rotation++;
        if (rotation % 90 === 0) {
          props.setAction('');
        }
        break;
      case 'up':
        if (acc < 5 && baseVel > 0) {
          acc++;
        }
        props.setAction('');
        break;
      case 'down':
        if (acc > 0) {
          acc--;
        }
        props.setAction('');
        break;
      case 'go':
        baseVel = 10;
        if (acc === 0) {
          acc++;
        }
        props.setAction('');
        break;
      case 'stop':
        baseVel = 0;
        acc = 0;
        props.setAction('');
        break;
      default:
        break;
    }

    if (rotation === 360 || rotation === -360) {
      rotation = 0;
    }

    switch (Math.round(rotation / 90)) {
      case 0:
        api.velocity.set(-(baseVel * acc), -1, 0);
        break;
      case 1:
        api.velocity.set(0, -1, baseVel * acc);
        break;
      case 2:
        api.velocity.set(baseVel * acc, -1, 0);
        break;
      case 3:
        api.velocity.set(0, -1, -(baseVel * acc));
        break;
      case -3:
        api.velocity.set(0, -1, baseVel * acc);
        break;
      case -2:
        api.velocity.set(baseVel * acc, -1, 0);
        break;
      case -1:
        api.velocity.set(0, -1, -(baseVel * acc));
        break;
      default:
        break;
    }
  });

  return (
    <>
      <mesh ref={carRef}>
        <PerspectiveCamera
          position={[0.7, 0.35, 0]}
          rotation={[0, (Math.PI * 90) / 180, 0]}
          makeDefault={true}
        />
        <primitive
          object={gltf.scene}
          scale={[10, 10, 10]}
          position={[1.8, 0, -1.825]}
          rotation={[0, (Math.PI * -45) / 180, 0]}
        />
        <meshStandardMaterial wireframe={true} />
        <PointerLockControls />
      </mesh>
      <Viewport carPosition={currentPos.current} />
    </>
  );
};

const mapState = (state) => ({
  position: state.position,
});

export default connect(mapState, null)(Car);
