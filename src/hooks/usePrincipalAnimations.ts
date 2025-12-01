import { useEffect } from "react";
import { animate } from "animejs";

export function usePrincipalAnimations() {
  useEffect(() => {
    const title = document.querySelector(".data__text");
    const image = document.querySelector(".data__img__ia");

    if (!title || !image) {
      console.log("No se encontró algún elemento para animaciones");
      return;
    }

    animate(image, {
      translateY: ["20px", "0px"],
      opacity: [0, 1],
      scale: [1.04, 1],
      duration: 500,
      easing: "easeOutCubic",
    });

    animate(title, {
      translateX: ["32px", "0px"],
      translateY: ["8px", "0px"],
      opacity: [0, 1],
      scale: [0.98, 1],
      duration: 500,
      delay: 150,
      easing: "easeOutCubic",
    });
  }, []);
}
