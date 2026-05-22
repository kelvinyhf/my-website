// tsParticles
if (window.tsParticles) {
  tsParticles.load({
    id: "tsParticles",
    options: {
      fullScreen: { enable: false },
      particles: {
        number: { value: 15 },
        shape: { type: "square" },
        color: { value: "#ffffff" },
        opacity: { value: 0.75 },
        size: { value: { min: 3, max: 6 } },
        move: {
          enable: true,
          speed: 2,
          direction: "bottom",
          outModes: { default: "out" }
        }
      }
    }
  });
}
