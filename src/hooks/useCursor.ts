import { useEffect, useRef } from "react";

export const useCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  const opacity = useRef(1);
  const targetOpacity = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersCoarse =
      typeof window !== "undefined" &&
      window.matchMedia?.("(pointer: coarse), (hover: none)").matches;
    if (prefersCoarse) {
      canvas.style.display = "none";
      return;
    }

    const ctx = canvas.getContext("2d")!;
    const getDPR = () => Math.min(2, Math.max(1, window.devicePixelRatio || 1));

    const sizeToCanvas = () => {
      const dpr = getDPR();
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    sizeToCanvas();

    const onPointerMove = (e: PointerEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    const fadeTo = (v: number) => (targetOpacity.current = v);

    const onPointerOver = (e: Event) => {
      const t = e.target as Element | null;
      if (t && t.closest("a, button, [role='button']")) fadeTo(0);
    };
    const onPointerOut = (e: Event) => {
      const t = e.target as Element | null;
      if (t && t.closest("a, button, [role='button']")) fadeTo(1);
    };

    let resizeRAF = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRAF);
      resizeRAF = requestAnimationFrame(sizeToCanvas);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("pointerover", onPointerOver, {
      passive: true,
    });
    document.addEventListener("pointerout", onPointerOut, { passive: true });

    const GRAD_0 = "rgba(125,252,255,0.8)";
    const GRAD_1 = "rgba(0,180,255,0.3)";
    const GRAD_2 = "rgba(0,80,255,0.15)";
    const RING = "rgba(255,255,255,0.9)";
    const DOT = "rgba(255,255,255,0.95)";

    const render = () => {
      opacity.current += (targetOpacity.current - opacity.current) * 0.18;

      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createRadialGradient(
        pos.current.x,
        pos.current.y,
        0,
        pos.current.x,
        pos.current.y,
        180
      );
      gradient.addColorStop(0, GRAD_0);
      gradient.addColorStop(0.12, GRAD_1);
      gradient.addColorStop(0.32, GRAD_2);
      gradient.addColorStop(0.55, "transparent");

      ctx.globalAlpha = opacity.current;
      ctx.fillStyle = gradient;
      const dpr = getDPR();
      ctx.fillRect(0, 0, width / dpr, height / dpr);

      const r = 12;

      ctx.beginPath();
      ctx.arc(pos.current.x, pos.current.y, r, 0, Math.PI * 2);
      ctx.strokeStyle = RING;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(pos.current.x, pos.current.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = DOT;
      ctx.fill();

      ctx.globalAlpha = 1;

      requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      cancelAnimationFrame(resizeRAF);
    };
  }, []);

  return { canvasRef };
};
