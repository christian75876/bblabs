import { useCursor } from "@/hooks/useCursor";

const PlasmaCursor = () => {
  const { canvasRef } = useCursor();

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9998,
        mixBlendMode: "screen",
        cursor: "none",
        willChange: "opacity, transform",
        transform: "translateZ(0)",
      }}
    />
  );
};

export default PlasmaCursor;
