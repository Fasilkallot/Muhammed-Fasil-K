'use client';
import { useState, useEffect } from 'react';
import styles from './StartScreen.module.css';

const BOOT_LINES = [
  { text: 'SYSTEM INIT...', delay: 0, color: 'cyan' },
  { text: 'Loading render pipeline...', delay: 400, color: 'white' },
  { text: 'Compiling shaders...', delay: 800, color: 'white' },
  { text: 'Initializing asset manager...', delay: 1200, color: 'white' },
  { text: 'Profiling GPU performance...', delay: 1600, color: 'purple' },
  { text: 'Optimizing draw calls... [DONE]', delay: 2000, color: 'cyan' },
  { text: 'Loading project data...', delay: 2400, color: 'white' },
  { text: 'Enabling cross-platform support...', delay: 2800, color: 'white' },
  { text: 'Target FPS: 60+ [ACHIEVED]', delay: 3200, color: 'green' },
  { text: 'Memory usage: OPTIMIZED', delay: 3600, color: 'green' },
  { text: '-----------------------------------', delay: 4000, color: 'dim' },
  { text: 'STATUS: READY', delay: 4400, color: 'cyan' },
];

export default function StartScreen({ onStart, started, skipIntro }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [showStart, setShowStart]       = useState(false);
  const [isExiting, setIsExiting]       = useState(false);
  const [hidden, setHidden]             = useState(false);

  useEffect(() => {
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => setVisibleLines(prev => [...prev, i]), line.delay)
    );
    const startTimer = setTimeout(() => setShowStart(true), 4800);
    return () => { timers.forEach(clearTimeout); clearTimeout(startTimer); };
  }, []);

  // When parent signals started, begin exit animation then fully hide
  useEffect(() => {
    if (started) {
      setIsExiting(true);
      const t = setTimeout(() => setHidden(true), 750);
      return () => clearTimeout(t);
    }
  }, [started]);

  const handleStart = () => {
    setIsExiting(true);
    setTimeout(onStart, 700);
  };

  if (skipIntro || hidden) return null;

  return (
    <div
      className={`${styles.screen} ${isExiting ? styles.exiting : ''}`}
      aria-modal="true"
      role="dialog"
      aria-label="Portfolio boot sequence"
    >
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.content}>
        <div className={styles.logo}>
          <span className={styles.logoText}>MFK</span>
          <span className={styles.logoSub}>PORTFOLIO_SYS v2.0</span>
        </div>

        <div className={styles.terminal} role="log" aria-label="Boot sequence">
          <div className={styles.terminalHeader}>
            <span className={styles.dot} />
            <span className={styles.dot} style={{ background: 'var(--cyan)' }} />
            <span className={styles.dot} style={{ background: 'var(--purple)' }} />
            <span className={styles.terminalTitle}>boot_sequence.sh</span>
          </div>
          <div className={styles.terminalBody}>
            {BOOT_LINES.map((line, i) => (
              <div
                key={i}
                className={`${styles.line} ${styles[`color_${line.color}`]} ${visibleLines.includes(i) ? styles.lineVisible : ''}`}
              >
                <span className={styles.prompt}>{'>'}</span>
                <span>{line.text}</span>
              </div>
            ))}
          </div>
        </div>

        {showStart && (
          <button
            id="start-btn"
            className={styles.startBtn}
            onClick={handleStart}
            aria-label="Enter portfolio"
          >
            <span className={styles.startBracket}>[</span>
            <span className={styles.startText}>PRESS START</span>
            <span className={styles.startBracket}>]</span>
          </button>
        )}
      </div>

      <div className={styles.corners} aria-hidden="true">
        <div className={`${styles.corner} ${styles.tl}`} />
        <div className={`${styles.corner} ${styles.tr}`} />
        <div className={`${styles.corner} ${styles.bl}`} />
        <div className={`${styles.corner} ${styles.br}`} />
      </div>
    </div>
  );
}
