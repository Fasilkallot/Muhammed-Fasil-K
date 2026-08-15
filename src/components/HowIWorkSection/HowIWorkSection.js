'use client';
import { useRef, useState, useEffect } from 'react';
import styles from './HowIWorkSection.module.css';

const STEPS = [
  {
    num: '01',
    title: 'Profile First. Optimize Second.',
    desc: 'I never guess where bottlenecks are. I use Unity Profiler, Frame Debugger, and OVR Metrics Tool to find them with data.',
    icon: '📊',
    color: 'var(--cyan)',
    tags: ['Unity Profiler', 'Frame Debugger', 'GPU Tools'],
  },
  {
    num: '02',
    title: 'Build Scalable Systems.',
    desc: 'I design with SOLID principles and proven patterns — Object Pooling, Observer, State Machine — so systems can grow without debt.',
    icon: '🏗',
    color: 'var(--purple)',
    tags: ['SOLID', 'Design Patterns', 'Clean Architecture'],
  },
  {
    num: '03',
    title: 'Optimize for Real Devices.',
    desc: 'Editor performance doesn\'t equal device performance. I always test on actual target hardware — Android, Meta Quest, and WebGL builds.',
    icon: '📱',
    color: 'var(--cyan)',
    tags: ['Android', 'Meta Quest', 'WebGL', 'Thermal Testing'],
  },
  {
    num: '04',
    title: 'Measure Impact. Ship Confidently.',
    desc: 'Every optimization is validated against real KPIs: FPS improvement, memory delta, load time. If I can\'t measure it, I don\'t claim it.',
    icon: '📈',
    color: 'var(--purple)',
    tags: ['FPS Metrics', 'Memory Delta', 'Load Time', 'A/B Testing'],
  },
];

export default function HowIWorkSection() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  return (
    <section id="how-i-work" className={`section ${styles.section}`} ref={ref}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-subtitle">// METHODOLOGY.EXE</p>
          <h2 className="section-title">How I Work</h2>
          <p className={styles.desc}>A performance engineer&apos;s approach to building games.</p>
        </div>

        <div className={styles.steps}>
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`${styles.step} ${vis ? styles.stepVisible : ''}`}
              style={{ '--accent': step.color, animationDelay: `${i * 0.12}s` }}
            >
              <div className={styles.stepNum} style={{ color: step.color }}>{step.num}</div>
              <div className={styles.stepIcon}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
              <div className={styles.stepTags}>
                {step.tags.map(t => (
                  <span key={t} className={styles.stepTag} style={{ color: step.color, borderColor: `${step.color}30`, background: `${step.color}0d` }}>{t}</span>
                ))}
              </div>
              {/* Connector line between steps (not last) */}
              {i < STEPS.length - 1 && <div className={styles.connector} aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
