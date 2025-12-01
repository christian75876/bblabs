import AiProcessor from "./IaProcessor";
import { useTypingPhrases } from "../../hooks/useTypingPhrases";
import { usePrincipalAnimations } from "../../hooks/usePrincipalAnimations";
import type { Dictionary } from "@/i18n/types";

type Props = {
  t: Dictionary;
};

export default function CarrouselHero({ t }: Props) {
  const phrases = t.hero.phrases;

  useTypingPhrases(phrases);
  usePrincipalAnimations();

  const maxLength = Math.max(...phrases.map((p) => p.length));

  return (
    <section
      className="
        w-full 
        min-h-[100vh]
        flex flex-col 
        md:flex-row
        items-center 
        justify-center 
        gap-16
        px-6
        md:px-12
        lg:px-20
        pt-20
      "
    >
      <div
        className="
          data__text 
          w-full 
          md:w-1/2 
          flex flex-col 
          justify-center
          text-white 
          text-center 
          md:text-left
          space-y-6
        "
      >
        <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold">
          {t.hero.title}
        </p>

        <div className="max-w-xl mx-auto md:mx-0 space-y-2">
          <div className="flex justify-center md:justify-start items-center gap-1 text-[#7dfcff] drop-shadow-[0_0_6px_#7dfcffaa] text-xl sm:text-2xl">
            ★★★★★
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight drop-shadow-[0_0_18px_#000]">
            {t.hero.rating.line1}
          </h3>

          <p className="text-base sm:text-lg md:text-xl opacity-90">
            {t.hero.rating.line2}
          </p>

          <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#7dfcff] tracking-wide drop-shadow-[0_0_8px_#7dfcff55]">
            {t.hero.rating.tagline}
          </p>
        </div>
      </div>

      <div
        className="
          data__img__ia 
          w-full 
          md:w-1/2 
          flex flex-col 
          items-center
        "
      >
        {/* MOBILE */}
        <div className="block md:hidden">
          <AiProcessor size={320} loop={true} />
        </div>

        {/* DESKTOP */}
        <div className="hidden md:block">
          <AiProcessor size={520} loop={true} />
        </div>

        <div className="data__p text-white text-2xl sm:text-3xl font-bold text-center h-[2.5em]">
          <span
            style={{
              display: "inline-block",
              width: "100%",
              maxWidth: `${maxLength}ch`,
              overflow: "hidden",
            }}
          ></span>
        </div>
      </div>
    </section>
  );
}
