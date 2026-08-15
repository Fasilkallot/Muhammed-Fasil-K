'use client';
import { useRef, useState, useEffect } from 'react';
import styles from './SkillsSection.module.css';

const SKILL_CATEGORIES = [
  {
    id: 'programming',
    label: 'Programming',
    icon: '⌨',
    skills: [
      { name: 'C#', level: 95, detail: '3+ years · Unity scripting, design patterns, SOLID' },
      { name: 'JavaScript', level: 65, detail: 'Web development, tooling, and scripting' },
      { name: 'HLSL/Shaders', level: 70, detail: 'Custom URP shader graphs & HLSL for GPU effects' },
      { name: 'Blender', level: 60, detail: '3D modeling, asset creation & optimization' },
    ],
  },
  {
    id: 'engine',
    label: 'Unity Engine',
    icon: '◈',
    skills: [
      { name: 'Unity 2D/3D', level: 95, detail: 'Advanced · Full project lifecycle, editor tools, custom inspectors' },
      { name: 'URP', level: 88, detail: 'Universal Render Pipeline — custom passes & post-processing' },
      { name: 'Addressables', level: 85, detail: 'Asset management, remote content delivery, bundle strategy' },
      { name: 'Unity XR / VR', level: 80, detail: 'Meta Quest development, XR Interaction Toolkit' },
      { name: 'DOTween', level: 82, detail: 'Animated UI/gameplay transitions, sequencing & callbacks' },
    ],
  },
  {
    id: 'gameplay',
    label: 'Gameplay',
    icon: '🎮',
    skills: [
      { name: 'Camera Systems', level: 88, detail: 'Camera rigs, follow systems, cinematic transitions' },
      { name: 'Input Handling', level: 85, detail: 'New Input System, touch, gamepad, VR controllers' },
      { name: 'UI Systems', level: 85, detail: 'Responsive UI layouts, DOTween animations, HUD design' },
      { name: 'State Machine', level: 82, detail: 'Finite state machines for AI, gameplay flow & animation' },
      { name: 'Design Patterns', level: 85, detail: 'Observer, Singleton, Event-Driven Systems, OOP & SOLID' },
    ],
  },
  {
    id: 'optimization',
    label: 'Optimization',
    icon: '⚡',
    skills: [
      { name: 'GPU Profiling', level: 90, detail: 'Unity Profiler, Frame Debugger, Xcode GPU tools' },
      { name: 'GPU Instancing', level: 88, detail: 'Batch rendering for repeated geometry — massive draw call cuts' },
      { name: 'Object Pooling', level: 92, detail: 'Generic pool systems eliminating GC pressure' },
      { name: 'Memory Profiling', level: 85, detail: 'Texture compression, asset unloading, memory budgets' },
      { name: 'Draw Call Reduction', level: 90, detail: 'Batching, atlasing, material merging strategies' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Backend',
    icon: '🔧',
    skills: [
      { name: 'Firebase', level: 80, detail: 'Auth, Firestore, Remote Config, Analytics, REST APIs' },
      { name: 'AWS', level: 65, detail: 'S3, Lambda, REST API integration for scalable backends' },
      { name: 'Git / GitHub', level: 88, detail: 'Branching strategy, PR reviews, CI pipelines' },
      { name: 'Shader Graph', level: 75, detail: 'Material creation, visual effects, rendering fixes' },
    ],
  },
  {
    id: 'platforms',
    label: 'Platforms',
    icon: '🌐',
    skills: [
      { name: 'Android', level: 92, detail: 'Google Play Store delivery, IL2CPP builds, profiling' },
      { name: 'iOS', level: 85, detail: 'Apple App Store delivery, Xcode builds & optimization' },
      { name: 'WebGL', level: 85, detail: 'Browser builds, Addressables CDN, compression tuning' },
      { name: 'VR (Meta Quest)', level: 80, detail: 'Quest 2 & 3, XR SDK, foveated rendering' },
      { name: 'PC / Editor', level: 90, detail: 'Windows standalone builds, editor tools & extensions' },
    ],
  },
];

function SkillBar({ skill, color, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={styles.skillRow}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.skillHeader}>
        <span className={styles.skillName}>{skill.name}</span>
        <span className={styles.skillLevel} style={{ color }}>{skill.level}%</span>
      </div>
      <div className={styles.barBg}>
        <div
          className={styles.barFill}
          style={{
            width: visible ? `${skill.level}%` : '0%',
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            boxShadow: `0 0 10px ${color}44`,
            transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>
      {hovered && (
        <div className={styles.tooltip}>{skill.detail}</div>
      )}
    </div>
  );
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('optimization');
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const current = SKILL_CATEGORIES.find(c => c.id === activeCategory);
  const colors = { programming: '#7B61FF', engine: '#00F5D4', gameplay: '#FF4D6D', optimization: '#FF4D6D', tools: '#00F5D4', platforms: '#7B61FF' };
  const color = colors[activeCategory] || '#00F5D4';

  return (
    <section id="skills" className={`section ${styles.skills}`} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-subtitle">// SKILLS.LOADOUT</p>
          <h2 className="section-title">Skill Loadout</h2>
          <p className={styles.headerDesc}>Select a category to inspect the loadout</p>
        </div>

        <div className={styles.layout}>
          {/* Category tabs — loadout slot style */}
          <div className={styles.categories}>
            {SKILL_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                id={`skill-tab-${cat.id}`}
                className={`${styles.catBtn} ${activeCategory === cat.id ? styles.catActive : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                style={{ '--cat-color': colors[cat.id] }}
              >
                <span className={styles.catIcon}>{cat.icon}</span>
                <span className={styles.catLabel}>{cat.label}</span>
                {activeCategory === cat.id && (
                  <span className={styles.catIndicator} style={{ background: colors[cat.id] }} />
                )}
              </button>
            ))}
          </div>

          {/* Skills panel */}
          <div className={styles.panel}>
            <div className={styles.panelHeader} style={{ borderColor: color }}>
              <span className={styles.panelIcon} style={{ color }}>{current?.icon}</span>
              <span className={styles.panelTitle} style={{ color }}>{current?.label}</span>
              <span className={styles.panelCount} style={{ color: color + '80' }}>{current?.skills.length} skills</span>
            </div>
            <div className={styles.skillsList}>
              {current?.skills.map(skill => (
                <SkillBar key={skill.name} skill={skill} color={color} visible={visible} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
