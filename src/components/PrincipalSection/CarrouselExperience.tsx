import { useRef } from "react";
import type { Dictionary } from "@/i18n/types";
import { useCarrouserExperience } from "@/hooks/useCarrouserExperience";

interface Props {
  t: Dictionary;
}

const CarrouselExperience = ({ t }: Props) => {
  const {
    testimonials,
    containerRef,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onMouseMove,
  } = useCarrouserExperience({ t });

  return (
    <section className="w-full py-16 text-white bg-transparent">
      <h2 className="text-3xl md:text-4xl mb-10 text-center px-1">
        <span className="font-extrabold text-4xl md:text-8xl">
          {t.experience.headerTop}
        </span>
        <br />
        {t.experience.headerBottom}
      </h2>

      <div
        ref={containerRef}
        className="
          flex gap-6 overflow-x-auto no-scrollbar
          px-4 sm:px-6 md:px-10 lg:px-20 py-4
          cursor-grab select-none
        "
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {testimonials.map((tItem, i) => (
          <div
            key={i}
            className="
              flex-shrink-0
              w-[260px] sm:w-[300px] md:w-[340px] lg:w-[380px]
              px-6 py-6 
              bg-white/5 backdrop-blur-md 
              border border-white/10 rounded-2xl
              shadow-[0_0_20px_rgba(0,0,0,0.25)]
              hover:bg-white/10 transition-all duration-300
            "
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className="
                  w-12 h-12 rounded-full 
                  bg-gradient-to-br from-indigo-500 to-purple-700 
                  flex items-center justify-center 
                  text-lg font-bold
                "
              >
                {tItem.avatar}
              </div>

              <div className="max-w-[65%]">
                <p className="font-semibold text-base sm:text-lg">
                  {tItem.name}
                </p>
                <p className="text-xs sm:text-sm opacity-70">
                  {tItem.role} · {tItem.company}
                </p>
              </div>
            </div>

            <p className="text-sm opacity-90 leading-relaxed">“{tItem.text}”</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarrouselExperience;
