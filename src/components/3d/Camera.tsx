import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export function CameraScrollController() {
  const { camera } = useThree();

  useEffect(() => {
    const container = document.getElementById("container");

    if (!container) return;
    function onScroll() {
      if (!container) return;

      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const offsetHeight = container.offsetHeight;

      const t = scrollTop / (scrollHeight - offsetHeight);

      camera.position.z = t * 0.35;
      camera.position.x = t * 0.025;
      camera.rotation.y = t * 0.025;
    }

    container.addEventListener("scroll", onScroll);
    onScroll();

    return () => container.removeEventListener("scroll", onScroll);
  }, [camera]);

  return null;
}
