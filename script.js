window.addEventListener("scroll", () => {
  const scrollThreshold = 500;
  const ratio = Math.max(0, Math.min(window.scrollY / scrollThreshold, 1));
  document.documentElement.style.setProperty("--nav-opacity", ratio);
});
