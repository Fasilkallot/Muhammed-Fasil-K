'use client';
import { useState, useEffect } from 'react';
import styles from './PerformanceHUD.module.css';

export default function PerformanceHUD() {
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let frames = 0;
    let last = performance.now();
    let raf;
    const count = () => {
      frames++;
      const now = performance.now();
      if (now - last >= 1000) {
        setFps(Math.min(frames, 60));
        frames = 0;
        last   = now;
      }
      raf = requestAnimationFrame(count);
    };
    raf = requestAnimationFrame(count);
    return () => cancelAnimationFrame(raf);
  }, []);

  const fpsColor = fps >= 55 ? 'var(--cyan)' : fps >= 30 ? '#facc15' : 'var(--red)';

  return (
    <div className={styles.hud} role="status" aria-label="Performance metrics">
      <div className={styles.hudTitle}>// PERF_MONITOR</div>
      <div className={styles.row}>
        <span className={styles.label}>FPS</span>
        <span className={styles.val} style={{ color: fpsColor }}>{fps}</span>
        <span className={styles.badge} style={{ background: fps >= 55 ? 'rgba(0,245,212,0.12)' : 'rgba(250,204,21,0.12)', color: fps >= 55 ? 'var(--cyan)' : '#facc15' }}>
          {fps >= 55 ? 'STABLE' : 'LOADING'}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>MEM</span>
        <span className={styles.val} style={{ color: 'var(--cyan)' }}>OPT</span>
        <span className={styles.badge} style={{ background: 'rgba(0,245,212,0.12)', color: 'var(--cyan)' }}>−30%</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>PLAT</span>
        <span className={styles.platforms}>
          <span className={styles.platform}>Mobile</span>
          <span className={styles.platform}>WebGL</span>
          <span className={styles.platform}>VR</span>
        </span>
      </div>
    </div>
  );
}
