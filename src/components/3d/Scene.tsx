import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { BasicLights } from "./Lights";
import { ScrollController } from "./ScrollController";
import { useRef } from "react";
import { Group } from "three";

export default function Scene3D() {
  const birdRef = useRef<Group>(null);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none">
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 45 }}>
        <BasicLights />

        <ScrollController target={birdRef} />

        <Model
          ref={birdRef}
          // src="/models/pajaro_volando_de_arcilla_explosiva_deidara.glb"
          src="/models/crow.glb"
          scale={20}
        />
      </Canvas>
    </div>
  );
}
