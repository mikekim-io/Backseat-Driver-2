import React from 'react';
import { useBox } from '@react-three/cannon';

const Building = (props) => {
  const [buildingRef] = useBox(() => ({
    type: 'Kinematic',
    args: props.args,
    ...props,
  }));

  return (
    <group ref={buildingRef}>
      <mesh receiveShadow castShadow>
        <boxGeometry args={props.args} />
        <meshStandardMaterial
          color={props.color}
          roughness={0.5}
          metalness={0.5}
        />
      </mesh>
      {props.color !== 'green' && (
        <mesh>
          <boxGeometry args={props.args} />
          <meshBasicMaterial wireframe color="gray" />
        </mesh>
      )}
    </group>
  );
};

export default Building;
