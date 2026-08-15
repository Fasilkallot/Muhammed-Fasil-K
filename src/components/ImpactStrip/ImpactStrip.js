'use client';
import { useRef, useState, useEffect } from 'react';
import styles from './ImpactStrip.module.css';

const STATS = [
  { prefix: '+', end: 40, suffix: '%', label: 'FPS Improved', color: 'var(--cyan)', icon: '⚡' },
  { prefix: '−', end: 30, suffix: '%', label: 'Memory Reduced', color: 'var(--cyan)', icon: '🧠' },
  { prefix: '',  end: 72, suffix: 'FPS', label: 'VR Stable Target', color: 'var(--purple)', icon: '◈' },
  { prefix: '',  end: 5,  suffix: '+',  label: 'Platforms Shipped', color: 'var(--cyan)', icon: '🌐' },
  { prefix: '',  end: 50, suffix: 'K+', label: 'App Downloads', color: 'var(--purple)', icon: '★' },
];

function CountUp({ end, prefix, suffix, color, started }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    let frame;
    const duration = 1400;
    const startTime = performance.now();
    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * end));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, end]);

  return (
    <span className={styles.statVal} style={{ color }}>
      {prefix}{val}{suffix}
    </span>
  );
}

export default function ImpactStrip() {
  const ref     = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.strip} ref={ref} aria-label="Performance impact metrics">
      <div className={styles.inner}>
        {STATS.map((s, i) => (
          <div key={s.label} className={styles.stat} style={{ animationDelay: `${i * 0.08}s` }}>
            <span className={styles.icon}>{s.icon}</span>
            <CountUp {...s} started={on} />
            <span className={styles.label}>{s.label}</span>
          </div>
        ))}
      </div>
      {/* Moving shimmer */}
      <div className={styles.shimmer} aria-hidden="true" />
    </div>
  );
}
