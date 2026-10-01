import React, { useRef, useEffect } from 'react';
import { PROFILE_DATA } from '../../data/profile';
import { FaGraduationCap, FaLocationDot, FaCode, FaMicrochip } from 'react-icons/fa6';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const decorativeRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Heading reveal
      gsap.from('.about-heading-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      });

      // 2. Paragraph reveal
      gsap.from('.about-text-paragraph', {
        scrollTrigger: {
          trigger: '.about-bio-container',
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // 3. Stats reveal
      gsap.from('.about-stat-card', {
        scrollTrigger: {
          trigger: '.about-stats-grid',
          start: 'top 85%',
        },
        scale: 0.92,
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'back.out(1.4)',
      });

      // 4. Decorative visual reveal
      if (decorativeRef.current) {
        gsap.from(decorativeRef.current, {
          scrollTrigger: {
            trigger: decorativeRef.current,
            start: 'top 88%',
          },
          scale: 0.95,
          opacity: 0,
          y: 30,
          duration: 0.9,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 sm:py-32 relative border-t border-zinc-800/60 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <span className="about-heading-item text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold mb-2">
            01. Background & Profile
          </span>
          <h2 className="about-heading-item font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase">
            About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Bio text block */}
          <div className="about-bio-container lg:col-span-7 space-y-6 text-zinc-300 leading-relaxed text-base sm:text-lg">
            {/* Exact paragraph requested by user */}
            <p className="about-text-paragraph text-xl sm:text-2xl font-medium text-white tracking-tight leading-relaxed text-balance">
              "I am a third-year Information Technology student passionate about software development, artificial intelligence, modern web technologies and building practical digital products."
            </p>

            <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-zinc-400">
              <div className="flex items-center gap-3">
                <FaGraduationCap className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{PROFILE_DATA.institution}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaLocationDot className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{PROFILE_DATA.location}</span>
              </div>
            </div>

            {/* Decorative Interactive Terminal Visual */}
            <div
              ref={decorativeRef}
              className="mt-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 p-5 font-mono text-xs text-zinc-400 shadow-xl relative overflow-hidden group"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-900">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] text-zinc-600">ashwin@tgpcet:~</span>
              </div>
              <div className="space-y-1.5">
                <p className="text-zinc-500">
                  <span className="text-cyan-400">$</span> whoami --profile
                </p>
                <p className="text-zinc-300">
                  <span className="text-cyan-400">Ashwin Kurekar</span> — Information Technology Student • Developer • AI Enthusiast
                </p>
                <p className="text-zinc-500">
                  <span className="text-cyan-400">$</span> cat interests.json
                </p>
                <p className="text-zinc-400">
                  ['Artificial Intelligence', 'Full-Stack Web Dev', 'Gemini Models', 'Computer Vision']
                </p>
              </div>
            </div>
          </div>

          {/* Four Statistics */}
          <div className="about-stats-grid lg:col-span-5 grid grid-cols-2 gap-4">
            {PROFILE_DATA.stats.map((stat, idx) => (
              <div
                key={idx}
                className="about-stat-card p-6 sm:p-7 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-cyan-500/40 transition-all duration-300 hover:bg-zinc-900/70 hover:-translate-y-1 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 blur-2xl rounded-full group-hover:bg-cyan-500/10 transition-colors pointer-events-none" />
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  {stat.sublabel}
                </div>
                <div className="text-[11px] text-zinc-500 mt-1 font-mono">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
