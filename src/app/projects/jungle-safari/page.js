'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from '../project.module.css';

const METRICS = [
  { val: 72, prefix: '',  suffix: ' FPS', label: 'Stable VR Frame Rate' },
  { val: 40, prefix: '−', suffix: '%',   label: 'GPU Load Reduced' },
  { val: 25, prefix: '−', suffix: '%',   label: 'GPU Budget via Foveation' },
  { val: 4,  prefix: '',  suffix: 'x LOD', label: 'Vegetation LOD Levels' },
];

const CONTRIBUTION = [
  'Profiled VR frame timing on Meta Quest using OVR Metrics Tool to achieve stable 72 FPS target',
  'Enabled Fixed Foveated Rendering, freeing ~25% GPU budget for scene complexity',
  'Baked occlusion culling data for the full jungle environment — eliminated invisible geometry cost',
  'Designed 4-tier LOD system for all vegetation and fauna, cutting vertex count at distance by 70%',
  'Implemented adaptive quality scaling to handle thermal throttling during extended play sessions',
  'Optimized all vegetation using GPU Instancing + custom wind shader — zero per-object draw overhead',
];

const TECH = [
  { title: 'Foveated Rendering', desc: 'Enabled Fixed Foveated Rendering on Quest to render peripheral vision at lower resolution, saving ~25% GPU budget.' },
  { title: 'Occlusion Culling', desc: 'Baked occlusion data for the jungle environment, preventing invisible geometry from consuming GPU cycles.' },
  { title: 'LOD System', desc: 'Implemented 4-level LOD groups for all vegetation and fauna assets, dramatically reducing vertex count at distance.' },
  { title: 'XR Interaction Toolkit', desc: 'Built all VR interactions using Unity XR Interaction Toolkit with custom gesture recognizers for natural gameplay.' },
];

const CHALLENGES = [
  {
    title: 'Achieving stable 72 FPS in VR',
    text: 'VR demands unwavering frame rate — any drop below 72 FPS on Quest causes discomfort. Used Unity Profiler and OVR Metrics Tool to identify and eliminate GPU bottlenecks frame by frame.',
  },
  {
    title: 'High-density vegetation rendering',
    text: 'The jungle environment had thousands of foliage instances. Combined GPU Instancing with a custom wind shader and LOD system to render the full scene within VR GPU budget.',
  },
  {
    title: 'Thermal throttling on device',
    text: 'Extended play sessions triggered thermal throttling, dropping performance. Implemented dynamic quality scaling that reduces shadow resolution and particle density when temperature rises.',
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
        setCount(Math.round((1 - Math.pow(1 - p, 3)) * val));
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

export default function JungleSafariPage() {
  const accent = '#FF4D6D';
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroBgGrid} />
          <div className={styles.heroBgGradient} style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(255,77,109,0.14), transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0,245,212,0.1), transparent 50%)' }} />
        </div>

        <div className={styles.heroVisual} style={{ borderColor: `${accent}30` }}>
          <div className={styles.heroVisualInner} style={{ background: `radial-gradient(circle, ${accent}10 0%, transparent 70%)` }}>
            <span className={styles.heroVisualIcon}>🌿</span>
            <p className={styles.heroVisualLabel}>Jungle Safari VR</p>
            <p className={styles.heroVisualSub}>Immersive Meta Quest Experience</p>
          </div>
        </div>

        <div className={styles.heroContent}>
          <Link href="/#projects" className={styles.backLink}>← Back to Projects</Link>
          <div className={styles.platforms}>
            <span className={styles.platform} style={{ color: accent, borderColor: accent, background: `${accent}15` }}>VR</span>
            <span className={styles.platform} style={{ color: accent, borderColor: accent, background: `${accent}15` }}>Meta Quest</span>
          </div>
          <h1 className={styles.heroTitle} style={{ color: accent, textShadow: `0 0 40px ${accent}50` }}>
            Jungle Safari
          </h1>
          <p className={styles.heroSubtitle}>Immersive VR Experience · Unity · Meta Quest · XR Toolkit</p>
        </div>
      </div>

      <div className={styles.metricsStrip}>
        {METRICS.map(m => <CountMetric key={m.label} {...m} accent={accent} />)}
      </div>

      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.section}>
            <span className={styles.sectionLabel}>// OVERVIEW</span>
            <h2 className={styles.sectionTitle}>Project Overview</h2>
            <p className={styles.sectionText}>
              Jungle Safari is a fully immersive virtual reality experience built for Meta Quest 2 and Quest 3.
              Players explore a richly detailed jungle environment, interact with wildlife, and experience guided
              safari tours in full stereoscopic 3D. Achieving stable 72 FPS on standalone Quest hardware was the
              central engineering challenge of this project.
            </p>
          </div>

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

        <div className={styles.sidebar}>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Tech Stack</div>
            <div className={styles.tagList}>
              {['Unity 2022', 'C#', 'Meta XR SDK', 'XR Toolkit', 'Foveated Rendering', 'LOD System', 'GPU Instancing', 'URP'].map(t => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
          </div>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>My Role</div>
            <ul className={styles.roleList}>
              {['VR Developer', 'GPU Optimization', 'XR Interaction Design', 'Performance Engineering', 'Scene Optimization'].map(r => (
                <li key={r} className={styles.roleItem}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
