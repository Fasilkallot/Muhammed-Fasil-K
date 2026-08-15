'use client';
import { useRef, useState, useEffect } from 'react';
import styles from './ExperienceSection.module.css';

const EXPERIENCE = [
  {
    id: 'smart-age',
    company: 'Smart Age Engineering Consulting',
    role: 'Software Developer',
    period: 'Jan 2026 – Present',
    location: 'Abu Dhabi, UAE',
    type: 'Full-time',
    color: '#00F5D4',
    logo: '◈',
    bullets: [
      { text: 'Enhanced frame stability and visual performance by implementing URP, GPU Instancing, and Draw Call Reduction across mobile and VR platforms', metric: 'Stable FPS' },
      { text: 'Reduced application load times and build size by implementing Addressables, improving runtime memory efficiency and user experience', metric: '−Build Size' },
      { text: 'Resolved critical rendering issues (flickering, aliasing) by developing solutions using Shader Graph and material optimization techniques', metric: 'Visual Fix' },
      { text: 'Optimized VR applications (Meta Quest) by profiling CPU/GPU usage and applying performance tuning, ensuring consistent frame rates', metric: '72 FPS VR' },
      { text: 'Eliminated crashes and performance spikes by debugging production builds with Unity Profiler and enforcing clean architecture using C#, Git workflows, and Agile practices', metric: '0 Crashes' },
    ],
  },
  {
    id: 'kyurius',
    company: 'Kyurius Tech Studios',
    role: 'Game Developer',
    period: 'Nov 2023 – Nov 2025',
    location: 'Bengaluru, India',
    type: 'Full-time',
    color: '#7B61FF',
    logo: '⚡',
    bullets: [
      { text: 'Improved application performance by 40% FPS by profiling bottlenecks with Unity Profiler and implementing Draw Call Reduction and Object Pooling', metric: '+40% FPS' },
      { text: 'Shipped a mobile title to Google Play Store and Apple App Store, contributing gameplay systems and performance optimization from development through release', metric: 'Shipped' },
      { text: 'Implemented core gameplay systems including camera rigs, input handling, and UI logic using C#, Observer and State Machine patterns, and DOTween', metric: 'Core Systems' },
      { text: 'Reduced memory usage by 30% through Memory Profiling, texture compression, and optimized asset workflows using ScriptableObjects', metric: '−30% Memory' },
      { text: 'Architected scalable game systems using C#, SOLID principles, and design patterns (Observer, Singleton), accelerating feature development', metric: 'Scalable' },
      { text: 'Engineered cross-platform builds (Android & WebGL) by optimizing asset compression and handling WebGL constraints for faster load times', metric: 'Cross-Platform' },
      { text: 'Integrated backend services using Firebase and AWS REST APIs, enabling real-time data synchronization and scalable feature delivery', metric: 'Firebase + AWS' },
    ],
  },
];

function ExpCard({ exp, index }) {
  const ref  = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.card} ${vis ? styles.cardVisible : ''}`}
      style={{ '--accent': exp.color, animationDelay: `${index * 0.15}s` }}
    >
      {/* Timeline node */}
      <div className={styles.node}>
        <div className={styles.nodeRing} />
        <div className={styles.nodeDot} style={{ background: exp.color, boxShadow: `0 0 12px ${exp.color}` }} />
      </div>

      {/* Content */}
      <div className={styles.cardInner}>
        <div className={styles.cardTop}>
          <div className={styles.companyRow}>
            <span className={styles.companyIcon} style={{ color: exp.color }}>{exp.logo}</span>
            <div>
              <h3 className={styles.company} style={{ color: exp.color }}>{exp.company}</h3>
              <div className={styles.meta}>
                <span className={styles.role}>{exp.role}</span>
                <span className={styles.metaDot}>·</span>
                <span className={styles.period}>{exp.period}</span>
                <span className={styles.metaDot}>·</span>
                <span className={styles.type}>{exp.type}</span>
                {exp.location && (
                  <>
                    <span className={styles.metaDot}>·</span>
                    <span className={styles.period}>{exp.location}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <ul className={styles.bullets}>
          {exp.bullets.map((b, i) => (
            <li key={i} className={styles.bullet}>
              <span className={styles.bulletArrow} style={{ color: exp.color }}>▸</span>
              <span className={styles.bulletText}>{b.text}</span>
              <span className={styles.bulletMetric} style={{ color: exp.color, borderColor: `${exp.color}40`, background: `${exp.color}12` }}>
                {b.metric}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <section id="experience" className={`section ${styles.experience}`}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-subtitle">// EXPERIENCE.LOG</p>
          <h2 className="section-title">Engineering Impact</h2>
          <p className={styles.headerDesc}>Real production experience. Real metrics. Real results.</p>
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          <div className={styles.timelineLine} aria-hidden="true" />
          {EXPERIENCE.map((exp, i) => (
            <ExpCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
