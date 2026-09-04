import React from 'react';
import { usePlane } from '@react-three/cannon';

const Plane = (props) => {
  const [planeRef] = usePlane(() => ({
    position: props.position,
    mass: 0,
    ...props,
  }));

  return (
    <mesh ref={planeRef} receiveShadow>
      <planeGeometry args={[360, 360]} />
      <meshStandardMaterial color="black" />
    </mesh>
  );
};

export default Plane;
