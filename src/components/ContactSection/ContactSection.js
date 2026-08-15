'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './ContactSection.module.css';

const CONTACTS = [
  { cmd: 'email', label: 'Email', value: 'fasilkallothofficial@gmail.com', href: 'mailto:fasilkallothofficial@gmail.com', icon: '✉' },
  { cmd: 'phone', label: 'Phone', value: '(+971) 508786818', href: 'tel:+971508786818', icon: '☎' },
  { cmd: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/fasil-kalloth', href: 'https://www.linkedin.com/in/fasil-kalloth/', icon: '◈' },
  { cmd: 'github', label: 'GitHub', value: 'github.com/Fasilkallot', href: 'https://github.com/Fasilkallot', icon: '◉' },
];

const TERMINAL_SEQUENCE = [
  { text: '> Scanning for available channels...', delay: 0, color: 'dim' },
  { text: '> Authentication: SUCCESS', delay: 600, color: 'green' },
  { text: '> Loading contact protocols...', delay: 1100, color: 'dim' },
  { text: '> STATUS: MISSION COMPLETE', delay: 1700, color: 'cyan' },
  { text: '> Contact channels UNLOCKED ▼', delay: 2200, color: 'cyan' },
];

export default function ContactSection() {
  const sectionRef               = useRef(null);
  const [started, setStarted]    = useState(false);
  const [visibleLines, setLines] = useState([]);
  const [showContacts, setShow]  = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const timers = TERMINAL_SEQUENCE.map((line, i) =>
      setTimeout(() => setLines(prev => [...prev, i]), line.delay)
    );
    const contactTimer = setTimeout(() => setShow(true), 2600);
    return () => { timers.forEach(clearTimeout); clearTimeout(contactTimer); };
  }, [started]);

  return (
    <section id="contact" className={`section ${styles.contact}`} ref={sectionRef}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <p className="section-subtitle">// CONTACT.INIT</p>
          <h2 className="section-title">Let&apos;s Connect</h2>
        </div>

        <div className={styles.terminalWrap}>
          {/* Terminal window */}
          <div className={styles.terminal}>
            <div className={styles.terminalHeader}>
              <div className={styles.dots}>
                <span className={styles.dot} style={{ background: 'var(--red)' }} />
                <span className={styles.dot} style={{ background: '#facc15' }} />
                <span className={styles.dot} style={{ background: 'var(--cyan)' }} />
              </div>
              <span className={styles.terminalTitle}>connect.sh — fasil@portfolio</span>
            </div>

            <div className={styles.terminalBody}>
              {TERMINAL_SEQUENCE.map((line, i) => (
                <div
                  key={i}
                  className={`${styles.line} ${styles[`c_${line.color}`]} ${visibleLines.includes(i) ? styles.lineVisible : ''}`}
                >
                  {line.text}
                </div>
              ))}

              {/* Blinking cursor while loading */}
              {!showContacts && started && (
                <span className={styles.cursor}>█</span>
              )}

              {/* Contact links */}
              {showContacts && (
                <div className={styles.contacts}>
                  {CONTACTS.map((c, i) => (
                    <a
                      key={c.cmd}
                      id={`contact-${c.cmd}`}
                      href={c.href}
                      className={styles.contactItem}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    >
                      <div className={styles.contactLeft}>
                        <span className={styles.contactIcon}>{c.icon}</span>
                        <div>
                          <div className={styles.contactLabel}>{c.label}</div>
                          <div className={styles.contactValue}>{c.value}</div>
                        </div>
                      </div>
                      <span className={styles.contactArrow}>→</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Availability badge */}
          <div className={styles.availability}>
            <div className={styles.availDot} />
            <div>
              <div className={styles.availTitle}>Open to Opportunities</div>
              <div className={styles.availDesc}>Currently available for full-time roles and contract work · Abu Dhabi, UAE (Remote/Hybrid)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.footerBrand}>MFK_PORTFOLIO</span>
          <span className={styles.footerText}>Built with ♥ and optimized for performance · {new Date().getFullYear()}</span>
          <span className={styles.footerText}>Unity Developer · Abu Dhabi, UAE</span>
        </div>
      </div>
    </section>
  );
}
