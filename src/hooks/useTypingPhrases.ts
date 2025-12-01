import { useEffect } from "react";
import { typingAnimation } from "../utils/typingAnimation";

export function useTypingPhrases(phrases: string[]) {
  useEffect(() => {
    const typingSpan = document.querySelector(
      ".data__p span"
    ) as HTMLElement | null;

    if (!typingSpan) {
      console.log("No se encontró el elemento para typing");
      return;
    }

    let index = 0;
    let timeoutId: number | undefined;
    let cleanupTyping: (() => void) | undefined;

    function playTyping() {
      const text = phrases[index];

      if (cleanupTyping) cleanupTyping();

      cleanupTyping = typingAnimation(typingSpan!, text, 40, () => {
        timeoutId = window.setTimeout(() => {
          index = (index + 1) % phrases.length;
          playTyping();
        }, 2000);
      });
    }

    playTyping();

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      if (cleanupTyping) cleanupTyping();
    };
  }, [phrases]);
}
