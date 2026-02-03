import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Euler, Vector3 } from "three";
import { flightCurve } from "./flightCurve";
import { Group } from "three";

interface ScrollControllerProps {
  target: React.RefObject<Group | null | undefined>;
}

export function ScrollController({ target }: ScrollControllerProps) {
  const smoothT = useRef(0);
  const tempPos = new Vector3();
  const tempLook = new Vector3();
  const baseRotation = new Euler(0, Math.PI / 2, 0);
  const finalRotation = new Euler(-0.4, Math.PI / 3, 0.1);

  // useFrame(() => {
  //   if (!target.current) return;

  //   const maxScroll =
  //     document.documentElement.scrollHeight - window.innerHeight;
  //   const t = window.scrollY / maxScroll;

  //   smoothT.current += (t - smoothT.current) * 0.5;
  //   console.log("ScrollController", t);

  //   flightCurve.getPointAt(smoothT.current, tempPos);

  //   target.current.position.lerp(tempPos, 0.0095);

  //   flightCurve.getPointAt(Math.min(smoothT.current + 0.05, 1), tempLook);

  //   target.current.lookAt(tempLook);

  //   const r = smoothT.current;

  //   const start = 0.43;
  //   const end = 0.53;

  //   if (r > start && r < end) {
  //     const k = Math.pow((r - start) / (end - start), 1.5);

  //     target.current.rotation.x =
  //       baseRotation.x + (finalRotation.x - baseRotation.x) * k;
  //     target.current.rotation.y =
  //       baseRotation.y + (finalRotation.y - baseRotation.y) * k;
  //     target.current.rotation.z =
  //       baseRotation.z + (finalRotation.z - baseRotation.z) * k;
  //   } else if (r >= end) {
  //     target.current.rotation.x = finalRotation.x;
  //     target.current.rotation.y = finalRotation.y;
  //     target.current.rotation.z = finalRotation.z;
  //   } else {
  //     target.current.rotation.x +=
  //       (baseRotation.x - target.current.rotation.x) * 0.05;
  //     target.current.rotation.y +=
  //       (baseRotation.y - target.current.rotation.y) * 0.05;
  //     target.current.rotation.z +=
  //       (baseRotation.z - target.current.rotation.z) * 0.05;
  //   }
  // });

  useFrame(() => {
    if (!target.current) return;

    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const t = window.scrollY / maxScroll;

    // 👉 No permitir que pase de 0.50
    const clampedT = Math.min(t, 0.5);

    // Suavizado hacia el valor clamped
    smoothT.current += (clampedT - smoothT.current) * 0.5;

    // Obtener posición en la curva
    flightCurve.getPointAt(smoothT.current, tempPos);
    target.current.position.lerp(tempPos, 0.0095);

    // LookAt hacia la dirección del movimiento
    flightCurve.getPointAt(Math.min(smoothT.current + 0.05, 1), tempLook);
    target.current.lookAt(tempLook);

    // -----------------------------------------
    // ROTACIÓN EN EL TRAMO 0.43 → 0.50
    // -----------------------------------------

    const r = smoothT.current;
    const start = 0.43;
    const end = 0.5; //

    if (r > start && r < end) {
      const k = Math.pow((r - start) / (end - start), 1.5);

      target.current.rotation.x =
        baseRotation.x + (finalRotation.x - baseRotation.x) * k;
      target.current.rotation.y =
        baseRotation.y + (finalRotation.y - baseRotation.y) * k;
      target.current.rotation.z =
        baseRotation.z + (finalRotation.z - baseRotation.z) * k;
    } else if (r >= end) {
      target.current.rotation.x = finalRotation.x;
      target.current.rotation.y = finalRotation.y;
      target.current.rotation.z = finalRotation.z;
    } else {
      target.current.rotation.x +=
        (baseRotation.x - target.current.rotation.x) * 0.05;
      target.current.rotation.y +=
        (baseRotation.y - target.current.rotation.y) * 0.05;
      target.current.rotation.z +=
        (baseRotation.z - target.current.rotation.z) * 0.05;
    }
  });

  return null;
}
