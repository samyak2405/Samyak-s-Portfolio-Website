import { useEffect, useRef } from 'react';

const SYMBOLS = [
  '{', '}', '[', ']', '(', ')', '<', '>', '/', ';', '=', '!', '&', '|',
  '+', '-', '*', '%', '0', '1', '=>', '//', '&&', '||', '??', '/**', '*/',
];

/**
 * Canvas-based animation: developer symbols float upward, gently swaying.
 * Throttled to ~20 fps. Respects prefers-reduced-motion.
 */
function CodeRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let rafId;
    let lastTime = 0;
    const INTERVAL = 1000 / 20; // 20 fps cap

    let particles = [];

    const isDark = () =>
      document.documentElement.getAttribute('data-theme') !== 'light';

    const makeParticle = (spreadY = false) => ({
      x:          Math.random() * (canvas.width || 800),
      y:          spreadY
                    ? Math.random() * (canvas.height || 600)
                    : (canvas.height || 600) + Math.random() * 300,
      char:       SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      speed:      0.22 + Math.random() * 0.52,
      opacity:    0.045 + Math.random() * 0.085,
      size:       10 + Math.floor(Math.random() * 5),
      swayAmp:    3 + Math.random() * 9,
      swayFreq:   0.0015 + Math.random() * 0.003,
      swayOffset: Math.random() * Math.PI * 2,
    });

    const buildParticles = () => {
      const count = Math.max(20, Math.floor((canvas.width * canvas.height) / 13000));
      particles   = Array.from({ length: count }, () => makeParticle(true));
    };

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      buildParticles();
    };

    const draw = (ts) => {
      rafId = requestAnimationFrame(draw);
      if (ts - lastTime < INTERVAL) return;
      lastTime = ts;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const colorRGB = isDark() ? '200, 169, 110' : '26, 22, 18';

      for (const p of particles) {
        const sway = Math.sin(p.y * p.swayFreq + p.swayOffset) * p.swayAmp;
        ctx.font      = `${p.size}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = `rgba(${colorRGB}, ${p.opacity})`;
        ctx.fillText(p.char, p.x + sway, p.y);

        p.y -= p.speed; // float upward

        if (p.y < -30) {
          Object.assign(p, makeParticle(false)); // re-enter from bottom
        }
      }
    };

    resize();
    rafId = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      'absolute',
        inset:         0,
        width:         '100%',
        height:        '100%',
        pointerEvents: 'none',
        zIndex:        0,
      }}
    />
  );
}

export default CodeRain;
