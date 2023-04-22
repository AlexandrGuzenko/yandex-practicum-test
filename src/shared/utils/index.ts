export const isInViewport = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();

  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  const verticalInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
  const horizontalInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

  return verticalInView && horizontalInView;
};
