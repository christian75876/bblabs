import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef, forwardRef } from "react";
import { Group } from "three";

interface ModelProps {
  src: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export const Model = forwardRef<Group, ModelProps>(
  ({ src, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }, ref) => {
    const localRef = useRef<Group>(null);

    const modelRef = (ref as any) || localRef;

    const gltf = useGLTF(src);
    const { actions, names } = useAnimations(gltf.animations, modelRef);

    useEffect(() => {
      if (names.length > 0) {
        const action = actions[names[0]];
        action?.reset().play();
      }
    }, [actions, names]);

    return (
      <primitive
        ref={modelRef}
        object={gltf.scene}
        scale={scale}
        position={position}
        rotation={rotation}
      />
    );
  }
);

useGLTF.preload("/models/model.glb");
