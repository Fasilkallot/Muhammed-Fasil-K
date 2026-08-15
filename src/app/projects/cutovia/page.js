'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from '../project.module.css';

const METRICS = [
  { val: 45, prefix: '−', suffix: '%', label: 'Load Time Reduced' },
  { val: 60, prefix: '−', suffix: '%', label: 'Draw Calls Cut' },
  { val: 80, prefix: '',  suffix: 'ms', label: 'Target Frame Budget' },
  { val: 2,  prefix: '',  suffix: ' Platforms', label: 'Android + WebGL' },
];

const CONTRIBUTION = [
  'Architected and implemented the Addressable asset pipeline from scratch — replacing all direct references',
  'Reduced initial game download size by 45% through bundle restructuring and Brotli WebGL compression',
  'Cut draw calls from 280 to under 80 per frame using sprite batching and material merging',
  'Designed a cross-platform input abstraction layer using the Strategy pattern (touch, mouse, keyboard)',
  'Optimized WebGL build size by stripping unused engine modules and enabling custom compression',
  'Built a content streaming system allowing background asset loading without frame hitching',
];

const TECH = [
  { title: 'Addressable Assets', desc: 'Replaced direct asset references with Addressable system for on-demand content streaming, cutting initial load by 45%.' },
  { title: 'Draw Call Reduction', desc: 'Implemented sprite batching and material merging, reducing draw calls from 280 to under 80 per frame.' },
  { title: 'WebGL Optimization', desc: 'Tuned compression settings, enabled Brotli compression, and stripped unused engine modules for minimal bundle size.' },
  { title: 'State Machine Refactor', desc: 'Redesigned character state machine using SOLID principles, reducing coupling and enabling cleaner animation blending.' },
];

const CHALLENGES = [
  {
    title: 'WebGL memory constraints',
    text: 'Browser-based play has hard memory limits. Implemented aggressive texture streaming and reduced audio to compressed formats to stay within budget.',
  },
  {
    title: 'Cross-platform input handling',
    text: 'Touch, mouse, and keyboard needed unified handling. Built an input abstraction layer using the strategy pattern, supporting all platforms from a single codebase.',
  },
  {
    title: 'Addressable bundle fragmentation',
    text: 'Over-granular asset grouping caused too many small HTTP requests. Reworked the bundle topology to balance bundle count and size for optimal CDN delivery.',
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

export default function CutoviaPage() {
  const accent = '#7B61FF';
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroBgGrid} />
          <div className={styles.heroBgGradient} style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(123,97,255,0.14), transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,77,109,0.1), transparent 50%)' }} />
        </div>

        <div className={styles.heroVisual} style={{ borderColor: `${accent}30` }}>
          <div className={styles.heroVisualInner} style={{ background: `radial-gradient(circle, ${accent}10 0%, transparent 70%)` }}>
            <span className={styles.heroVisualIcon}>✨</span>
            <p className={styles.heroVisualLabel}>Cutovia</p>
            <p className={styles.heroVisualSub}>Narrative Mobile Experience</p>
          </div>
        </div>

        <div className={styles.heroContent}>
          <Link href="/#projects" className={styles.backLink}>← Back to Projects</Link>
          <div className={styles.platforms}>
            <span className={styles.platform} style={{ color: accent, borderColor: accent, background: `${accent}15` }}>Android</span>
            <span className={styles.platform} style={{ color: accent, borderColor: accent, background: `${accent}15` }}>WebGL</span>
          </div>
          <h1 className={styles.heroTitle} style={{ color: accent, textShadow: `0 0 40px ${accent}50` }}>
            Cutovia
          </h1>
          <p className={styles.heroSubtitle}>Narrative Mobile Experience · Unity · C# · WebGL</p>
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
              Cutovia is a narrative-driven mobile experience that blends storytelling with light gameplay mechanics.
              Available on Android and as a WebGL browser build, the project required significant architectural work
              to support both native and web deployment from a single codebase.
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
              {['Unity 2022', 'C#', 'Addressables', 'WebGL', 'Object Pooling', 'URP', 'SOLID', 'Android'].map(t => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
          </div>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>My Role</div>
            <ul className={styles.roleList}>
              {['Unity Developer', 'WebGL Engineer', 'Addressables Architect', 'Performance Optimization', 'Input System Design'].map(r => (
                <li key={r} className={styles.roleItem}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
