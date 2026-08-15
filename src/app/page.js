'use client';
import { useState, useEffect } from 'react';
import StartScreen from '@/components/StartScreen/StartScreen';
import Navbar from '@/components/Navbar/Navbar';
import HeroSection from '@/components/HeroSection/HeroSection';
import ImpactStrip from '@/components/ImpactStrip/ImpactStrip';
import AboutSection from '@/components/AboutSection/AboutSection';
import ExperienceSection from '@/components/ExperienceSection/ExperienceSection';
import HowIWorkSection from '@/components/HowIWorkSection/HowIWorkSection';
import ProjectsSection from '@/components/ProjectsSection/ProjectsSection';
import SkillsSection from '@/components/SkillsSection/SkillsSection';
import ContactSection from '@/components/ContactSection/ContactSection';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [skipIntro, setSkipIntro] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('introPlayed')) {
      setSkipIntro(true);
      setStarted(true);
    }
  }, []);

  const handleStart = () => {
    setStarted(true);
    sessionStorage.setItem('introPlayed', 'true');
  };

  return (
    <>
      {/* StartScreen always renders as an overlay; opacity transition reveals main content */}
      <StartScreen onStart={handleStart} started={started} skipIntro={skipIntro} />

      {/* Main content always mounted — avoids content blocking */}
      <main
        style={{
          opacity: started ? 1 : 0,
          visibility: started ? 'visible' : 'hidden',
          transition: skipIntro ? 'none' : 'opacity 0.5s ease 0.1s',
          pointerEvents: started ? 'all' : 'none',
        }}
        aria-hidden={!started}
      >
        <Navbar />
        <HeroSection />
        <ImpactStrip />
        <AboutSection />
        <ExperienceSection />
        <HowIWorkSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </>
  );
}
