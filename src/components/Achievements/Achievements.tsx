import React, { useState, useRef, useEffect } from 'react';
import { ACHIEVEMENTS_DATA, AchievementItem } from '../../data/achievements';
import {
  FaTrophy,
  FaMedal,
  FaAward,
  FaStar,
  FaFlag,
  FaXmark,
  FaArrowUpRightFromSquare,
} from 'react-icons/fa6';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MagneticButton } from '../UI/MagneticButton';
import { CertificateButton } from '../UI/CertificateButton';

export const Achievements: React.FC = () => {
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementItem | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Close modal with ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedAchievement) {
        setSelectedAchievement(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAchievement]);

  // GSAP Scroll Animations
  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header text reveal
      gsap.from('.achieve-header-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
        },
        y: 40,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
      });

      // Cards staggered entrance
      const cards = gsap.utils.toArray<HTMLElement>('.achievement-wall-card');
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 55,
            scale: 0.94,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            delay: index * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
            },
          }
        );

        // Ambient number reveal animation
        const numElem = card.querySelector('.achievement-card-number');
        if (numElem) {
          gsap.fromTo(
            numElem,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 0.25,
              scale: 1,
              duration: 0.9,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const renderIcon = (type: AchievementItem['iconType']) => {
    switch (type) {
      case 'medal':
        return <FaMedal className="w-5 h-5 text-amber-300" />;
      case 'trophy':
        return <FaTrophy className="w-5 h-5 text-cyan-400" />;
      case 'award':
        return <FaAward className="w-5 h-5 text-sky-400" />;
      case 'star':
        return <FaStar className="w-5 h-5 text-indigo-300" />;
      case 'flag':
        return <FaFlag className="w-5 h-5 text-emerald-400" />;
      default:
        return <FaAward className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="py-24 sm:py-32 relative border-t border-zinc-800/60 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-20 w-[550px] h-[550px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 -left-20 w-[450px] h-[450px] bg-sky-500/5 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <span className="achieve-header-item text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold mb-2 block">
              05. Recognitions & Honors
            </span>
            <h2 className="achieve-header-item font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase">
              Achievements & Awards
            </h2>
          </div>
          <p className="achieve-header-item text-sm text-zinc-400 max-w-md">
            Verified academic milestones, national hackathon podium finishes, prompt engineering titles, and technical competition presentations.
          </p>
        </div>

        {/* Cinematic Awards Wall Gallery (Asymmetric Layout) */}
        <div
          ref={galleryRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-7"
        >
          {ACHIEVEMENTS_DATA.map((item, idx) => {
            // First 2 cards take 6 cols each on lg, remaining 3 cards take 4 cols each on lg
            const colSpanClass =
              idx < 2
                ? 'lg:col-span-6'
                : 'lg:col-span-4';

            return (
              <article
                key={item.id}
                onClick={() => setSelectedAchievement(item)}
                className={`achievement-wall-card group relative rounded-3xl bg-zinc-950/70 border border-zinc-800/80 hover:border-cyan-500/50 p-7 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(56,189,248,0.12)] cursor-pointer ${colSpanClass}`}
              >
                {/* Subtle animated border gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

                {/* Giant Watermark Background Number */}
                <div className="achievement-card-number absolute -top-4 -right-2 text-7xl sm:text-8xl font-black font-display text-zinc-800/30 group-hover:text-cyan-500/20 transition-all duration-300 pointer-events-none select-none">
                  {item.number}
                </div>

                <div>
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between gap-3 mb-6 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 group-hover:border-cyan-500/40 group-hover:scale-105 group-hover:bg-zinc-800/80 transition-all duration-300 shadow-inner">
                        {renderIcon(item.iconType)}
                      </div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                        {item.category}
                      </span>
                    </div>

                    {item.awardBadge && (
                      <span className="px-2.5 py-1 rounded-md bg-zinc-900/90 border border-zinc-800 text-[10px] font-mono text-zinc-300 group-hover:border-cyan-500/30 transition-colors">
                        {item.awardBadge}
                      </span>
                    )}
                  </div>

                  {/* Title & Organization */}
                  <div className="relative z-10">
                    <div className="text-xs font-mono text-zinc-400 uppercase tracking-wide mb-1.5 flex items-center gap-2">
                      <span className="text-zinc-500">Org:</span>
                      <span className="text-white font-medium group-hover:text-cyan-300 transition-colors">
                        {item.organization}
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-200 transition-all duration-300 group-hover:translate-x-0.5 leading-snug">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-8 pt-5 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-3 text-xs relative z-10">
                  <div
                    className="flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <CertificateButton
                      certificateUrl={item.certificateUrl}
                      itemTitle={item.title}
                    />
                  </div>
                  <div className="flex items-center gap-1.5 text-cyan-400 font-medium group-hover:text-cyan-300 group-hover:translate-x-1 transition-all">
                    <span>Inspect Details</span>
                    <span>→</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Interactive Detail Modal */}
      {selectedAchievement && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="achievement-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedAchievement(null)}
        >
          <div
            className="relative w-full max-w-xl rounded-3xl bg-[#0e0e14] border border-zinc-700/80 p-6 sm:p-8 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedAchievement(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors focus-visible:ring-1 focus-visible:ring-cyan-400 cursor-pointer"
              aria-label="Close details"
            >
              <FaXmark className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                {renderIcon(selectedAchievement.iconType)}
              </div>
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block font-semibold">
                  {selectedAchievement.category}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  Achievement #{selectedAchievement.number}
                </span>
              </div>
            </div>

            <h3
              id="achievement-modal-title"
              className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight mt-2"
            >
              {selectedAchievement.title}
            </h3>

            {/* Metadata Badges */}
            <div className="mt-5 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-mono">Organization / Program:</span>
                <span className="text-white font-semibold">{selectedAchievement.organization}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-mono">Category:</span>
                <span className="text-cyan-300 font-medium">{selectedAchievement.category}</span>
              </div>
              {selectedAchievement.awardBadge && (
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 font-mono">Status / Award:</span>
                  <span className="text-emerald-400 font-semibold">{selectedAchievement.awardBadge}</span>
                </div>
              )}
            </div>

            {/* Verified Description */}
            <div className="mt-6">
              <h4 className="text-xs uppercase font-mono tracking-wider text-zinc-500 font-semibold mb-2">
                Verified Information
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {selectedAchievement.description}
              </p>
            </div>

            {/* Modal action footer with View Certificate and Close triggers */}
            <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <CertificateButton
                certificateUrl={selectedAchievement.certificateUrl}
                itemTitle={selectedAchievement.title}
              />

              <MagneticButton strength={0.2}>
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer w-full sm:w-auto"
                >
                  Close Window
                </button>
              </MagneticButton>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
