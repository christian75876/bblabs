import { useRef } from "react";
import type { Dictionary } from "@/i18n/types";

interface Props {
  t: Dictionary;
}

export const useCarrouserExperience = ({ t }: Props) => {
  const testimonials = t.experience.testimonials;

  const containerRef = useRef<HTMLDivElement | null>(null);

  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    isDown.current = true;
    containerRef.current.classList.add("cursor-grabbing");

    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDown.current = false;
    containerRef.current?.classList.remove("cursor-grabbing");
  };

  const onMouseUp = () => {
    isDown.current = false;
    containerRef.current?.classList.remove("cursor-grabbing");
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !containerRef.current) return;

    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return {
    testimonials,
    containerRef,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onMouseMove,
  };
};
