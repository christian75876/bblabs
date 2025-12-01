import { useState, useRef, useEffect } from "react";
import { animate } from "animejs";
import type { Dictionary } from "@/i18n/types";

interface Props {
  t: Dictionary;
}

export default function CaseCarousel({ t }: Props) {
  const slides = [
    { ...t.cases.tudeuna, video: "/videos/dropshipping.mp4" },
    { ...t.cases.arro, video: "/videos/arro.mp4" },
    { ...t.cases.lavelada, video: "/videos/riwi.mp4" },
  ];

  const [index, setIndex] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const direction = useRef("left");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const next = () => {
    direction.current = "left";
    setIndex((i) => (i + 1) % slides.length);
  };

  const prev = () => {
    direction.current = "right";
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  };

  const handleStart = (clientX: number) => {
    isDragging.current = true;
    startX.current = clientX;
  };

  const handleEnd = (clientX: number) => {
    if (!isDragging.current) return;

    const delta = clientX - startX.current;
    const threshold = 60;

    if (delta > threshold) {
      prev();
    } else if (delta < -threshold) {
      next();
    }

    isDragging.current = false;
  };

  useEffect(() => {
    const highlight = window.document.getElementById("highlight")!;
    if (highlight) {
      animate(highlight, {
        scale: [1, 0.9, 1],
        duration: 600,
        easing: "easeOutExpo",
      });
    }

    if (!containerRef.current) return;

    const from = direction.current === "left" ? 100 : -100;
    const to = 0;

    animate(containerRef.current, {
      translateX: [from + "%", to + "%"],
      opacity: [0.2, 1],
      duration: 300,
      easing: "easeOutCubic",
    });
  }, [index]);

  const slide = slides[index];

  return (
    <section
      className="relative w-full min-h-screen text-white flex flex-col items-center justify-center overflow-hidden px-2 select-none"
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseUp={(e) => handleEnd(e.clientX)}
      onMouseLeave={() => (isDragging.current = false)}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
    >
      <div
        ref={containerRef}
        className="grid grid-cols-1 lg:grid-cols-3 items-center w-full space-y-4 p-4"
      >
        <div className="flex flex-col gap-4 uppercase font-extrabold text-left">
          <h2 className="text-5xl md:text-7xl">{slide.title}</h2>
          <span
            id="highlight"
            className="bg-[#7DFDFF] text-black px-4 w-fit text-5xl md:text-7xl leading-none"
          >
            {slide.highlight}
          </span>
          <h3 className="text-5xl md:text-7xl">{slide.subtitle}</h3>
        </div>

        <div
          className="
    relative mx-auto
    w-[260px]       /* Mobile */
    sm:w-[300px]    /* Tablet */
    md:w-[340px]    /* Desktop */
    lg:w-[380px]    /* Large Desktop */
    xl:w-[420px]    /* Full HD */
  "
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-[#7DFDFF] opacity-25 blur-3xl rounded-[40px] z-[1]" />

          {/* Marco del teléfono */}
          <img
            src="/images/phone-frame2.png"
            className="relative w-full z-[10] pointer-events-none select-none"
          />

          {/* Pantalla REAL dentro del marco */}
          <video
            src={slide.video}
            autoPlay
            loop
            muted
            playsInline
            className="
      absolute
      top-[2.2%]     /* Ajusta según el notch */
      left-[2%]
      w-[95%]
      h-[96%]
      rounded-[38px]
      object-cover
      z-[5]
    "
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="uppercase tracking-wide text-sm text-gray-400">
            Client
          </div>
          <h4 className="text-4xl font-bold uppercase">{slide.client}</h4>
          <p className="text-gray-300 leading-relaxed">{slide.description}</p>
          <button className="mt-4 border border-gray-700 hover:border-white transition px-6 py-3 rounded-full flex items-center gap-2">
            Read more →
          </button>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              direction.current = i > index ? "left" : "right";
              setIndex(i);
            }}
            className={`w-10 h-[3px] rounded-full transition ${
              i === index ? "bg-white" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
