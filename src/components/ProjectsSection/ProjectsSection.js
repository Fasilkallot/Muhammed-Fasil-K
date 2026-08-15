'use client';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './ProjectsSection.module.css';

export const PROJECTS = [
  {
    id: 'ibees',
    title: 'iBees – Fun Learning',
    subtitle: 'Educational Mobile Game',
    platforms: ['Android', 'iOS'],
    tags: ['Unity', 'C#', 'Mobile', 'URP'],
    color: '#00F5D4',
    accentColor: '#7B61FF',
    metrics: ['+40% FPS', '−30% Memory', '50K+ Downloads'],
    overview: 'An interactive educational game for children that gamifies learning through engaging bee-themed challenges. Shipped on Android & iOS.',
    gradient: 'linear-gradient(135deg, rgba(0,245,212,0.12) 0%, rgba(123,97,255,0.08) 100%)',
    icon: '🐝',
  },
  {
    id: 'cutovia',
    title: 'Cutovia',
    subtitle: 'Narrative Mobile Experience',
    platforms: ['Android', 'WebGL'],
    tags: ['Unity', 'C#', 'WebGL', 'Addressables'],
    color: '#7B61FF',
    accentColor: '#FF4D6D',
    metrics: ['WebGL Optimized', 'Addressables Pipeline', 'Object Pooling'],
    overview: 'A story-driven mobile experience with rich visual effects. Implemented Addressable asset system for on-demand content loading and significant draw call reduction.',
    gradient: 'linear-gradient(135deg, rgba(123,97,255,0.12) 0%, rgba(255,77,109,0.08) 100%)',
    icon: '✨',
  },
  {
    id: 'jungle-safari',
    title: 'Jungle Safari',
    subtitle: 'Immersive VR Experience',
    platforms: ['VR', 'Meta Quest'],
    tags: ['Unity', 'VR', 'Meta Quest', 'XR Toolkit'],
    color: '#FF4D6D',
    accentColor: '#00F5D4',
    metrics: ['72 FPS Stable VR', 'Foveated Rendering', '−40% GPU Load'],
    overview: 'A fully immersive jungle safari experience for Meta Quest. Achieved smooth 72FPS VR target through advanced GPU optimization, foveated rendering, and occlusion culling.',
    gradient: 'linear-gradient(135deg, rgba(255,77,109,0.12) 0%, rgba(0,245,212,0.08) 100%)',
    icon: '🌿',
  },
  {
    id: 'faazz-parking',
    title: 'FaazZ-Parking',
    subtitle: 'Car Parking / Driving Game',
    platforms: ['PC'],
    tags: ['Unity', 'C#', 'Vehicle Physics', 'WheelCollider'],
    color: '#facc15',
    accentColor: '#7B61FF',
    metrics: ['Vehicle Physics', 'Camera Follow', 'Input Handling'],
    overview: 'Personal proof-of-concept car parking/driving game built to explore vehicle physics and handling. Implemented WheelCollider-based car control, camera follow, and input handling.',
    gradient: 'linear-gradient(135deg, rgba(250,204,21,0.12) 0%, rgba(123,97,255,0.08) 100%)',
    icon: '🚗',
  },
];

function ProjectCard({ project, index }) {
  const cardRef  = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -10;
    card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = '';
  };

  return (
    <Link href={`/projects/${project.id}`} style={{ textDecoration: 'none' }}>
      <div
        id={`project-card-${project.id}`}
        ref={cardRef}
        className={`${styles.card} ${visible ? styles.cardVisible : ''}`}
        style={{ '--card-color': project.color, '--card-gradient': project.gradient, animationDelay: `${index * 0.12}s` }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        role="article"
        aria-label={project.title}
      >
        {/* Gradient background */}
        <div className={styles.cardBg} style={{ background: project.gradient }} />

        {/* Header */}
        <div className={styles.cardHeader}>
          <span className={styles.cardIcon}>{project.icon}</span>
          <div className={styles.platforms}>
            {project.platforms.map(p => (
              <span key={p} className={styles.platform} style={{ color: project.color, borderColor: project.color, background: `${project.color}14` }}>
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Title */}
        <h3 className={styles.cardTitle} style={{ color: project.color }}>{project.title}</h3>
        <p className={styles.cardSubtitle}>{project.subtitle}</p>

        {/* Metrics */}
        <div className={styles.cardMetrics}>
          {project.metrics.map(m => (
            <span key={m} className={styles.metricTag}>{m}</span>
          ))}
        </div>

        {/* Tags */}
        <div className={styles.tags}>
          {project.tags.map(t => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>

        {/* CTA arrow */}
        <div className={styles.cardCta}>
          <span>View Case Study</span>
          <span className={styles.ctaArrow}>→</span>
        </div>

        {/* Glow border on hover */}
        <div className={styles.cardGlow} style={{ boxShadow: `0 0 40px ${project.color}25` }} />
      </div>
    </Link>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-subtitle">// PROJECTS.SELECT</p>
          <h2 className="section-title">Projects</h2>
          <p className={styles.headerDesc}>
            Each project is a showcase of performance engineering, optimized architecture, and real-world delivery.
          </p>
        </div>

        <div className={styles.grid}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
