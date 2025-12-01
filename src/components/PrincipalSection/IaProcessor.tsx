import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import AiProcessor from "../../animations/ai-processor.json";

type Props = {
  size?: number;
  loop?: boolean;
};

export default function BrandLoader({ size = 200, loop = true }: Props) {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  if (reduce) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col justify-center items-center"
    >
      <Lottie
        play
        loop={loop}
        animationData={AiProcessor}
        style={{ width: size, height: size }}
        renderer="svg"
      />
    </div>
  );
}
