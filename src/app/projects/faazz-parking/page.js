'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from '../project.module.css';

const METRICS = [
  { val: 4, prefix: '', suffix: '', label: 'WheelColliders Simulated' },
  { val: 100, prefix: '', suffix: '%', label: 'Custom Input Handling' },
  { val: 60, prefix: '',  suffix: '+ FPS', label: 'Stable Performance' },
  { val: 1, prefix: '',  suffix: 'ms', label: 'Physics Step Time' },
];

const CONTRIBUTION = [
  'Engineered vehicle physics and handling mechanics using Unity\'s built-in WheelCollider component',
  'Implemented a smooth, dynamic camera follow system that tracks the vehicle\'s speed and rotation without jitter',
  'Developed robust input handling for steering, acceleration, and braking controls across PC peripherals',
  'Optimized physics calculations to ensure stable performance and predictable vehicle behavior',
];

const TECH = [
  { title: 'WheelCollider Integration', desc: 'Configured suspension springs, friction curves, and motor torque for realistic driving feel and weight transfer.' },
  { title: 'Input System', desc: 'Handled continuous analog inputs for smooth acceleration and precise steering angles.' },
  { title: 'Camera Rig', desc: 'Built a responsive camera script in LateUpdate that interpolates position and rotation, avoiding physics jitter.' },
];

const CHALLENGES = [
  {
    title: 'Tuning Vehicle Physics',
    text: 'Balancing suspension and friction values so the car doesn\'t flip easily while maintaining a realistic drift/slide. Solved by iteratively tweaking the WheelCollider\'s forward and sideways friction curves.',
  },
  {
    title: 'Camera Jitter',
    text: 'Physics updates and camera updates happening out of sync caused visual stuttering during high-speed movement. Solved by moving camera logic to LateUpdate() after physics calculations complete.',
  },
];

function CountMetric({ val, prefix, suffix, label, accent }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      ob.disconnect();
      const dur = 1200;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setCount(Math.round(ease * val));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, [val]);

  return (
    <div className={styles.metricItem} ref={ref}>
      <span className={styles.metricVal} style={{ color: accent, textShadow: `0 0 30px ${accent}70` }}>
        {prefix}{count}{suffix}
      </span>
      <span className={styles.metricLabel}>{label}</span>
    </div>
  );
}

export default function FaazzParkingPage() {
  const accent = '#facc15';
  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroBgGrid} />
          <div className={styles.heroBgGradient} style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(250,204,21,0.14), transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(123,97,255,0.1), transparent 50%)' }} />
        </div>

        {/* Visual placeholder */}
        <div className={styles.heroVisual} style={{ borderColor: `${accent}30` }}>
          <div className={styles.heroVisualInner} style={{ background: `radial-gradient(circle, ${accent}10 0%, transparent 70%)` }}>
            <span className={styles.heroVisualIcon}>🚗</span>
            <p className={styles.heroVisualLabel}>FaazZ-Parking</p>
            <p className={styles.heroVisualSub}>Car Parking / Driving Game</p>
          </div>
        </div>

        <div className={styles.heroContent}>
          <Link href="/#projects" className={styles.backLink}>← Back to Projects</Link>
          <div className={styles.platforms}>
            <span className={styles.platform} style={{ color: accent, borderColor: accent, background: `${accent}15` }}>PC</span>
            <span className={styles.platform} style={{ color: accent, borderColor: accent, background: `${accent}15` }}>Unity</span>
          </div>
          <h1 className={styles.heroTitle} style={{ color: accent, textShadow: `0 0 40px ${accent}50` }}>
            FaazZ-Parking
          </h1>
          <p className={styles.heroSubtitle}>Car Parking / Driving Game · Unity · C#</p>
          
          <div style={{ marginTop: '2rem' }}>
            <a 
              href="https://github.com/Fasilkallot/FaazZ-Parking" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.backLink}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: `${accent}15`, padding: '0.5rem 1rem', borderRadius: '4px', border: `1px solid ${accent}40`, color: accent, textDecoration: 'none' }}
            >
              <span style={{ fontSize: '1.2rem' }}>◉</span> View Source on GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Metrics strip */}
      <div className={styles.metricsStrip}>
        {METRICS.map(m => (
          <CountMetric key={m.label} {...m} accent={accent} />
        ))}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.main}>
          {/* Overview */}
          <div className={styles.section}>
            <span className={styles.sectionLabel}>// OVERVIEW</span>
            <h2 className={styles.sectionTitle}>Project Overview</h2>
            <p className={styles.sectionText}>
              FaazZ-Parking is a personal proof-of-concept project demonstrating proficiency in gameplay programming and physics simulation. 
              The project focuses on delivering a realistic driving and parking experience by leveraging Unity's physics engine and custom control scripts, providing a solid foundation for vehicle-based games.
            </p>
          </div>

          {/* My Contribution */}
          <div className={styles.section}>
            <span className={styles.sectionLabel} style={{ color: accent }}>// MY_CONTRIBUTION</span>
            <h2 className={styles.sectionTitle}>My Contribution</h2>
            <ul className={styles.contributionList}>
              {CONTRIBUTION.map((c, i) => (
                <li key={i} className={styles.contributionItem}>
                  <span className={styles.contributionArrow} style={{ color: accent }}>▸</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Breakdown */}
          <div className={styles.section}>
            <span className={styles.sectionLabel}>// TECH_BREAKDOWN</span>
            <h2 className={styles.sectionTitle}>Implementation Techniques</h2>
            <div className={styles.techGrid}>
              {TECH.map(t => (
                <div key={t.title} className={styles.techItem}>
                  <div className={styles.techItemTitle} style={{ color: accent }}>{t.title}</div>
                  <div className={styles.techItemDesc}>{t.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div className={styles.section}>
            <span className={styles.sectionLabel}>// CHALLENGES {'&'} SOLUTIONS</span>
            <h2 className={styles.sectionTitle}>Engineering Challenges</h2>
            <div className={styles.challengesList}>
              {CHALLENGES.map(c => (
                <div key={c.title} className={styles.challengeItem} style={{ borderLeftColor: accent }}>
                  <div className={styles.challengeTitle}>{c.title}</div>
                  <div className={styles.challengeText}>{c.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Tech Stack</div>
            <div className={styles.tagList}>
              {['Unity', 'C#', 'WheelCollider', 'Physics Engine', 'Input System', 'PC'].map(t => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
          </div>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>My Role</div>
            <ul className={styles.roleList}>
              {['Gameplay Programmer', 'Physics Engineer', 'Systems Design', 'UI Integration'].map(r => (
                <li key={r} className={styles.roleItem}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
