import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const People = () => {
  const Peopleref = useRef();
  useFrame((state,delta) => {
    Peopleref.current.rotation.y += 1 * delta;
  });
  return (
    <group ref={Peopleref}>
      <mesh>
        <coneGeometry args={[1, 1, 4]} />
        <meshBasicMaterial color="blue" />
      </mesh>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="orange" />
      </mesh>
    </group>
  );
};
export default People;
