import React, { useState, useRef, useEffect } from 'react';
import { SKILL_CATEGORIES, SkillItem } from '../../data/skills';
import { SkillCard } from './SkillCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const ALL_SKILLS: SkillItem[] = SKILL_CATEGORIES.flatMap((c) => c.skills);

const CATEGORY_TABS = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'Programming', label: 'Programming' },
  { id: 'Frontend', label: 'Frontend' },
  { id: 'Backend', label: 'Backend' },
  { id: 'AI', label: 'Artificial Intelligence' },
  { id: 'Tools', label: 'Tools & DevOps' },
];

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const filteredSkills =
    selectedCategory === 'all'
      ? ALL_SKILLS
      : ALL_SKILLS.filter((s) => s.category === selectedCategory);

  useEffect(() => {
    if (prefersReducedMotion || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.skill-card-item');
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 28,
        scale: 0.94,
        rotate: -2,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        duration: 0.55,
        stagger: 0.04,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        },
      }
    );
  }, [selectedCategory, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 sm:py-32 relative border-t border-zinc-800/60"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold mb-2 block">
              02. Technical Capabilities
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase">
              Skills & Tools
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            Interactive overview of core languages, modern frontend systems, backend architectures, and AI model workflows.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCategory === tab.id;
            const count =
              tab.id === 'all'
                ? ALL_SKILLS.length
                : ALL_SKILLS.filter((s) => s.category === tab.id).length;

            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-zinc-100 text-black shadow-lg shadow-white/10 scale-[1.02]'
                    : 'bg-zinc-900/70 text-zinc-400 hover:text-white hover:bg-zinc-800/80 border border-zinc-800/80'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                    isActive ? 'bg-zinc-300 text-black font-bold' : 'bg-zinc-800/80 text-zinc-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Subtle Node Constellation Visual Canvas (Non-intrusive background) */}
        <div className="relative">
          <div
            className="absolute inset-0 pointer-events-none opacity-20 -z-10 overflow-hidden"
            aria-hidden="true"
          >
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="skill-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#38bdf8" fillOpacity="0.4" />
                </pattern>
                <linearGradient id="line-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#skill-grid)" />
              <line x1="10%" y1="20%" x2="40%" y2="60%" stroke="url(#line-glow)" strokeWidth="1" />
              <line x1="60%" y1="30%" x2="90%" y2="70%" stroke="url(#line-glow)" strokeWidth="1" />
              <circle cx="10%" cy="20%" r="3" fill="#38bdf8" fillOpacity="0.4" />
              <circle cx="40%" cy="60%" r="3" fill="#06b6d4" fillOpacity="0.4" />
              <circle cx="60%" cy="30%" r="3" fill="#38bdf8" fillOpacity="0.4" />
              <circle cx="90%" cy="70%" r="3" fill="#06b6d4" fillOpacity="0.4" />
            </svg>
          </div>

          {/* Interactive Skills Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
