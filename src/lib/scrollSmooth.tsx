export const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
  if (ref.current) {
    if (
      "scrollBehavior" in document.documentElement.style &&
      window.innerWidth > 768
    ) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    } else {
      ref.current.scrollIntoView();
    }
  }
};
