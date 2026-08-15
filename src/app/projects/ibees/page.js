'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from '../project.module.css';

const METRICS = [
  { val: 40, prefix: '+', suffix: '%', label: 'FPS Improvement' },
  { val: 30, prefix: '−', suffix: '%', label: 'Memory Reduced' },
  { val: 50, prefix: '',  suffix: 'K+', label: 'App Downloads' },
  { val: 280, prefix: '',  suffix: '→80', label: 'Draw Calls Cut' },
];

const CONTRIBUTION = [
  'Profiled the entire game loop using Unity Profiler and GPU Frame Debugger to pinpoint bottlenecks',
  'Reduced draw calls from 280 to under 80 through GPU Instancing and sprite batching',
  'Eliminated GC allocation spikes by introducing a generic Object Pool system for all game entities',
  'Migrated from Built-in to URP pipeline, unlocking mobile-targeted rendering features',
  'Implemented texture atlasing across 40+ sprites, reducing memory usage by 28%',
  'Led platform submission to Google Play and App Store — optimized IL2CPP build settings',
];

const TECH = [
  { title: 'GPU Instancing', desc: 'Merged repeated bee character draw calls using GPU Instancing, cutting render cost by 35%.' },
  { title: 'Texture Atlasing', desc: 'Combined 40+ individual sprite sheets into atlas maps, reducing texture memory by 28%.' },
  { title: 'Object Pooling', desc: 'Pre-instantiated reusable object pools for all game entities, eliminating GC spikes.' },
  { title: 'URP Rendering', desc: 'Migrated from built-in pipeline to URP, enabling mobile-optimized deferred shading.' },
];

const CHALLENGES = [
  {
    title: 'Low-end device performance',
    text: 'Early builds hit sub-30 FPS on mid-range Android devices. Profiled with Unity Profiler and GPU Profiler to identify hotspots in animation and particle systems.',
  },
  {
    title: 'Excessive garbage collection',
    text: 'Frequent GC pauses caused frame stutters. Replaced all heap-allocating loops with pooled structures and cached component references.',
  },
  {
    title: 'Memory pressure on iOS',
    text: 'App was receiving memory warnings on iPhone 7. Implemented streaming texture loading and reduced audio clip quality tiers for mobile.',
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

export default function IBeesPage() {
  const accent = '#00F5D4';
  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroBgGrid} />
          <div className={styles.heroBgGradient} style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(0,245,212,0.14), transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(123,97,255,0.1), transparent 50%)' }} />
        </div>

        {/* Visual placeholder — replace with gameplay video/GIF */}
        <div className={styles.heroVisual} style={{ borderColor: `${accent}30` }}>
          <div className={styles.heroVisualInner} style={{ background: `radial-gradient(circle, ${accent}10 0%, transparent 70%)` }}>
            <span className={styles.heroVisualIcon}>🐝</span>
            <p className={styles.heroVisualLabel}>iBees – Fun Learning</p>
            <p className={styles.heroVisualSub}>Educational Mobile Game</p>
          </div>
        </div>

        <div className={styles.heroContent}>
          <Link href="/#projects" className={styles.backLink}>← Back to Projects</Link>
          <div className={styles.platforms}>
            <span className={styles.platform} style={{ color: accent, borderColor: accent, background: `${accent}15` }}>Android</span>
            <span className={styles.platform} style={{ color: accent, borderColor: accent, background: `${accent}15` }}>iOS</span>
          </div>
          <h1 className={styles.heroTitle} style={{ color: accent, textShadow: `0 0 40px ${accent}50` }}>
            iBees – Fun Learning
          </h1>
          <p className={styles.heroSubtitle}>Educational Mobile Game · Unity · C#</p>
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
              iBees – Fun Learning is an interactive educational mobile game designed to make learning engaging
              for young children. The game features rich animations, dynamic puzzle mechanics, and a reward system
              that motivates continued play. Shipped on both Android and iOS, it achieved 50K+ organic downloads
              and maintained a 4.6-star rating on Google Play.
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
            <h2 className={styles.sectionTitle}>Optimization Techniques</h2>
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
              {['Unity 2022', 'C#', 'URP', 'GPU Instancing', 'Object Pooling', 'Texture Atlas', 'Firebase', 'Android', 'iOS'].map(t => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
          </div>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>My Role</div>
            <ul className={styles.roleList}>
              {['Lead Unity Developer', 'Performance Engineer', 'Architecture Design', 'Mobile Optimization', 'App Store Submission'].map(r => (
                <li key={r} className={styles.roleItem}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
