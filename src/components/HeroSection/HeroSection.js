'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './HeroSection.module.css';
import ParticleBackground from '../ParticleBackground/ParticleBackground';
import PerformanceHUD from '../PerformanceHUD/PerformanceHUD';

export default function HeroSection() {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const handleMouse = (e) => {
      if (!textRef.current || !heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      textRef.current.style.transform = `translate(${dx * 18}px, ${dy * 12}px)`;
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className={styles.hero} ref={heroRef}>
      <ParticleBackground />

      <div className={styles.overlay} />

      {/* Animated grid lines */}
      <div className={styles.gridLines} aria-hidden="true" />

      {/* Content layer with parallax */}
      <div className={styles.content} ref={textRef}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          <span>Available for opportunities · Abu Dhabi, UAE</span>
        </div>

        <h1 className={styles.name}>
          <span className={styles.nameFirst}>Muhammed</span>
          <span className={styles.nameLast}>Fasil</span>
        </h1>

        <div className={styles.titleRow}>
          <span className={styles.titleItem}>Software Developer</span>
          <span className={styles.titleSep}>//</span>
          <span className={styles.titleItem}>Unity & Performance Engineer</span>
        </div>

        <p className={styles.tagline}>
          3+ years shipping optimized, production-ready applications<br />
          across <span className={styles.taglineAccent}>Android</span>,{' '}
          <span className={styles.taglineAccent}>iOS</span>,{' '}
          <span className={styles.taglineAccent}>WebGL</span>, and{' '}
          <span className={styles.taglineAccent}>VR</span>
        </p>

        <div className={styles.metrics}>
          <div className={styles.metric}>
            <span className={styles.metricVal}>3+</span>
            <span className={styles.metricLabel}>Years Experience</span>
          </div>
          <div className={styles.metricDiv} />
          <div className={styles.metric}>
            <span className={styles.metricVal}>+40%</span>
            <span className={styles.metricLabel}>FPS Boost</span>
          </div>
          <div className={styles.metricDiv} />
          <div className={styles.metric}>
            <span className={styles.metricVal}>−30%</span>
            <span className={styles.metricLabel}>Memory Saved</span>
          </div>
          <div className={styles.metricDiv} />
          <div className={styles.metric}>
            <span className={styles.metricVal}>5+</span>
            <span className={styles.metricLabel}>Platforms</span>
          </div>
        </div>

        <div className={styles.buttons}>
          <button
            id="hero-view-projects"
            className={styles.btnPrimary}
            onClick={() => scrollTo('projects')}
          >
            <span>View Projects</span>
            <span className={styles.btnArrow}>→</span>
          </button>
          <button
            id="hero-contact"
            className={styles.btnSecondary}
            onClick={() => scrollTo('contact')}
          >
            Contact
          </button>
        </div>
      </div>

      {/* Performance HUD */}
      <PerformanceHUD />

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <div className={styles.scrollLine} />
        <span>Scroll</span>
      </div>
    </section>
  );
}
