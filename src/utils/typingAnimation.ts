export function typingAnimation(
  element: HTMLElement,
  text: string,
  speed = 40,
  onComplete?: () => void
) {
  let i = 0;
  element.textContent = "";

  const intervalId = window.setInterval(() => {
    element.textContent = text.slice(0, i);
    i++;

    if (i > text.length) {
      window.clearInterval(intervalId);
      if (onComplete) onComplete();
    }
  }, speed);

  return () => window.clearInterval(intervalId);
}
