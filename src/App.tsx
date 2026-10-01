import React from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Skills } from './components/Skills/Skills';
import { Projects } from './components/Projects/Projects';
import { Experience } from './components/Experience/Experience';
import { Certifications } from './components/Certifications/Certifications';
import { Achievements } from './components/Achievements/Achievements';
import { Education } from './components/Education/Education';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { CustomCursor } from './components/UI/CustomCursor';
import { PageIntro } from './components/UI/PageIntro';
import { AIAssistant } from './components/AI/AIAssistant';
import { ErrorBoundary } from './components/UI/ErrorBoundary';
import { useActiveSection } from './hooks/useActiveSection';

const SECTION_IDS = [
  'home',
  'about',
  'skills',
  'projects',
  'experience',
  'certifications',
  'achievements',
  'education',
  'contact',
];

export default function App() {
  const activeSection = useActiveSection(SECTION_IDS, 'home');

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Cinematic Page Intro Sequence with Fallback */}
      <PageIntro />

      {/* State-aware Custom Cursor */}
      <CustomCursor />

      {/* Fixed/sticky Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Ashwin AI - Floating AI Portfolio Assistant on Home/Portfolio */}
      <ErrorBoundary>
        <AIAssistant />
      </ErrorBoundary>

      {/* Main Content Sections */}
      <main className="flex-1 w-full overflow-x-hidden">
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Achievements />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
