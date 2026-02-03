export function BasicLights() {
  return (
    <>
      <ambientLight intensity={0.6} />

      <directionalLight intensity={1.2} position={[5, 5, 5]} castShadow />

      <pointLight intensity={0.5} position={[-5, 3, -5]} />
    </>
  );
}
