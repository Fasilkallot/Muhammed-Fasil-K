'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { id: 'about',      label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects' },
  { id: 'skills',     label: 'Skills' },
  { id: 'contact',    label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = NAV_ITEMS.map(n => document.getElementById(n.id));
      let current = '';
      sections.forEach(sec => {
        if (sec && window.scrollY >= sec.offsetTop - 120) {
          current = sec.id;
        }
      });
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} role="navigation" aria-label="Main navigation">
      <div className={styles.inner}>
        <button className={styles.brand} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Go to top">
          <span className={styles.brandMono}>{'</>'}</span>
          <span className={styles.brandName}>MFK</span>
        </button>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`} role="list">
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <button
                id={`nav-${item.id}`}
                className={`${styles.link} ${active === item.id ? styles.activeLink : ''}`}
                onClick={() => scrollTo(item.id)}
              >
                <span className={styles.linkNum}>0{NAV_ITEMS.indexOf(item) + 1}.</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <a
          href="mailto:fasilkallothofficial@gmail.com"
          className={styles.ctaBtn}
          id="nav-hire-btn"
        >
          Let&apos;s Connect
        </a>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
        </button>
      </div>
    </nav>
  );
}
