'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './AboutSection.module.css';

function useCountUp(target, duration = 1500, startOnVisible = true) {
  const [count, setCount]         = useState(0);
  const [started, setStarted]     = useState(false);
  const ref                        = useRef(null);

  useEffect(() => {
    if (!startOnVisible) { setCount(target); return; }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
}

const STATS = [
  { prefix: '+', value: 40, suffix: '%', label: 'FPS Improvement', desc: 'via GPU profiling & draw call optimization' },
  { prefix: '−', value: 30, suffix: '%', label: 'Memory Saved', desc: 'through asset bundling & texture compression' },
  { prefix: '',  value: 5,  suffix: '+', label: 'Platforms', desc: 'Android · iOS · WebGL · VR (Meta Quest) · PC' },
];

const SKILLS_QUICK = ['C#', 'Unity', 'URP', 'GPU Instancing', 'Addressables', 'Object Pooling', 'SOLID Principles', 'DOTween', 'Blender', 'JavaScript', 'Firebase', 'AWS', 'Git'];

export default function AboutSection() {
  const fpsC  = useCountUp(40);
  const memC  = useCountUp(30);
  const platC = useCountUp(5);
  const counts = [fpsC, memC, platC];

  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className={`container ${styles.inner}`}>
        {/* Left: Visual */}
        <div className={styles.visual}>
          <div className={styles.avatarWrap}>
            <div className={styles.avatarRing} />
            <div className={styles.avatarRingOuter} />
            <div className={styles.avatar}>
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.avatarSvg}>
                {/* Abstract tech figure */}
                <circle cx="100" cy="70" r="28" stroke="#00F5D4" strokeWidth="1.5" fill="rgba(0,245,212,0.05)" />
                <circle cx="100" cy="70" r="18" stroke="#7B61FF" strokeWidth="1" fill="rgba(123,97,255,0.05)" />
                <path d="M60 130 Q100 108 140 130 L148 170 Q100 155 52 170 Z" stroke="#00F5D4" strokeWidth="1.5" fill="rgba(0,245,212,0.06)" />
                {/* Circuit lines */}
                <line x1="30" y1="60" x2="68" y2="60" stroke="#00F5D4" strokeWidth="0.8" opacity="0.4" />
                <line x1="30" y1="60" x2="30" y2="100" stroke="#00F5D4" strokeWidth="0.8" opacity="0.4" />
                <circle cx="30" cy="100" r="3" fill="#00F5D4" opacity="0.6" />
                <line x1="170" y1="60" x2="132" y2="60" stroke="#7B61FF" strokeWidth="0.8" opacity="0.4" />
                <line x1="170" y1="60" x2="170" y2="110" stroke="#7B61FF" strokeWidth="0.8" opacity="0.4" />
                <circle cx="170" cy="110" r="3" fill="#7B61FF" opacity="0.6" />
                {/* FPS label */}
                <text x="24" y="118" fontFamily="monospace" fontSize="8" fill="#00F5D4" opacity="0.7">FPS:60+</text>
                <text x="142" y="128" fontFamily="monospace" fontSize="8" fill="#7B61FF" opacity="0.7">OPT</text>
              </svg>
            </div>
            <div className={styles.orbitDot} />
            <div className={styles.orbitDot2} />
          </div>

          {/* Quick skill chips */}
          <div className={styles.chips}>
            {SKILLS_QUICK.map(s => (
              <span key={s} className={styles.chip}>{s}</span>
            ))}
          </div>
        </div>

        {/* Right: Text */}
        <div className={styles.text}>
          <p className="section-subtitle">// ABOUT.EXE</p>
          <h2 className="section-title">Not just a developer.<br />A performance engineer.</h2>

          <p className={styles.para}>
            I&apos;m Muhammed Fasil K — a Unity Developer with
            <span className={styles.accent}> 3+ years of experience</span> shipping optimized, production-ready mobile applications across Android and iOS.
            Skilled in gameplay programming (camera systems, input handling, UI), performance profiling, and vehicle/physics-based mechanics.
          </p>
          <p className={styles.para}>
            I approach every project like an optimization challenge. Before writing a single line of code,
            I ask: <em className={styles.quote}>"Where are the bottlenecks, and how do I eliminate them?"</em>
            Whether it&apos;s reducing draw calls, profiling GPU pipelines, or designing scalable architectures with
            <span className={styles.accent}> SOLID principles and design patterns</span> — I build systems that scale.
          </p>
          <p className={styles.para}>
            With a track record of <span className={styles.accent}>measurable frame rate and memory improvements</span> under real
            device constraints, my work spans educational games, narrative experiences, and fully immersive VR environments —
            each shipped with a relentless focus on performance, stability, and player experience.
          </p>

          {/* Stat counters */}
          <div className={styles.stats}>
            {STATS.map((stat, i) => (
              <div key={stat.label} className={styles.stat} ref={counts[i].ref}>
                <div className={styles.statVal}>
                  {stat.prefix}
                  <span>{counts[i].count}</span>
                  {stat.suffix}
                </div>
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.statDesc}>{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
