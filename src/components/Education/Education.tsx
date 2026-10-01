import React, { useRef, useEffect } from 'react';
import { EDUCATION_DATA } from '../../data/education';
import {
  FaGraduationCap,
  FaBuildingColumns,
  FaSchool,
  FaLocationDot,
  FaCircleCheck,
  FaCalendarDays,
  FaBookBookmark,
} from 'react-icons/fa6';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const Education: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineLineRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Section Header reveal
      gsap.from('.edu-header-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
        },
        y: 30,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out',
      });

      // 2. Vertical timeline line grows downward with scroll
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.edu-timeline-container',
              start: 'top 78%',
              end: 'bottom 85%',
              scrub: 0.6,
            },
          }
        );
      }

      // 3. Milestone sequential card & node reveal
      const milestones = gsap.utils.toArray<HTMLElement>('.edu-timeline-milestone');
      milestones.forEach((milestone) => {
        const node = milestone.querySelector('.edu-node-circle');
        const cardBox = milestone.querySelector('.edu-card-box');
        const staggerTexts = milestone.querySelectorAll('.edu-stagger-text');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: milestone,
            start: 'top 85%',
          },
        });

        // Node pops in
        if (node) {
          tl.fromTo(
            node,
            { scale: 0.4, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
          );
        }

        // Card slides in
        if (cardBox) {
          tl.fromTo(
            cardBox,
            { y: 35, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
            node ? '-=0.25' : 0
          );
        }

        // Text stagger inside card
        if (staggerTexts.length) {
          tl.fromTo(
            staggerTexts,
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: 'power2.out' },
            '-=0.35'
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const renderNodeIcon = (iconType: string) => {
    switch (iconType) {
      case 'btech':
        return <FaGraduationCap className="w-5 h-5 text-cyan-300" />;
      case 'secondary':
        return <FaBuildingColumns className="w-4 h-4 text-cyan-400" />;
      case 'school':
      default:
        return <FaSchool className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="education"
      className="py-24 sm:py-32 relative border-t border-zinc-800/60 overflow-hidden"
    >
      {/* Subtle background ambient spotlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[500px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <div className="edu-header-item inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/60 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase mb-3">
            <FaGraduationCap className="w-3.5 h-3.5" />
            <span>Scholastic Timeline</span>
          </div>

          <h2 className="edu-header-item font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase">
            EDUCATION
          </h2>

          <p className="edu-header-item mt-3 text-sm sm:text-base text-zinc-400 max-w-xl text-balance">
            My academic journey from school to pursuing Information Technology.
          </p>
        </div>

        {/* Scholastic Vertical Timeline */}
        <div className="edu-timeline-container relative max-w-3xl mx-auto">
          {/* Continuous vertical timeline line:
              - Mobile (< md): aligned to the left edge at left-5
              - Desktop (md+): centered at left-1/2 */}
          <div
            ref={timelineLineRef}
            className="edu-timeline-line absolute top-4 bottom-8 w-[2px] bg-gradient-to-b from-cyan-500/40 via-cyan-500/60 to-emerald-400 left-5 md:left-1/2 -translate-x-1/2 origin-top pointer-events-none"
            aria-hidden="true"
          />

          <div className="space-y-12 sm:space-y-16">
            {EDUCATION_DATA.map((item) => {
              const isCurrent = item.status === 'Currently Pursuing';

              return (
                <div
                  key={item.id}
                  className="edu-timeline-milestone relative pl-12 sm:pl-14 md:pl-0 flex flex-col md:items-center"
                >
                  {/* Timeline Node Icon:
                      - Mobile (< md): pinned at left-5 on the vertical line
                      - Desktop (md+): centered above card on the central line */}
                  <div
                    className={`edu-node-circle absolute left-5 -translate-x-1/2 top-1.5 md:static md:translate-x-0 md:mb-6 z-20 flex items-center justify-center rounded-full transition-transform duration-300 ${
                      isCurrent
                        ? 'w-12 h-12 sm:w-14 sm:h-14 bg-zinc-950 border-2 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.45)] ring-4 ring-cyan-500/20'
                        : 'w-10 h-10 sm:w-12 sm:h-12 bg-zinc-950 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                    }`}
                  >
                    {renderNodeIcon(item.iconType)}
                  </div>

                  {/* Education Card */}
                  <div
                    className={`edu-card-box w-full md:max-w-2xl relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-md transition-all duration-300 ${
                      isCurrent
                        ? 'bg-[#0b0f17]/90 border border-cyan-500/50 shadow-[0_0_35px_rgba(6,182,212,0.18)] hover:shadow-[0_0_45px_rgba(6,182,212,0.26)] hover:border-cyan-400'
                        : 'bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/60 shadow-lg shadow-black/30'
                    }`}
                  >
                    {/* B.Tech Current Highlight Ambient Layer */}
                    {isCurrent && (
                      <div
                        className="absolute -inset-0.5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-cyan-500/20 via-sky-500/10 to-transparent blur-md -z-10 pointer-events-none"
                        aria-hidden="true"
                      />
                    )}

                    {/* Top Row: Year & Status Badge */}
                    <div className="edu-stagger-text flex flex-wrap items-center justify-between gap-3 mb-4">
                      {/* Year */}
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold text-cyan-400">
                        <FaCalendarDays className="w-3.5 h-3.5 text-cyan-500" />
                        <span>{item.year}</span>
                      </div>

                      {/* Status Indicator */}
                      {isCurrent ? (
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span>Currently Pursuing</span>
                          </span>

                          {item.yearLevel && (
                            <span className="text-xs font-mono font-semibold text-cyan-300 px-2.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60">
                              {item.yearLevel}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-400/90">
                          <FaCircleCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{item.status}</span>
                        </span>
                      )}
                    </div>

                    {/* Main Degree / Certificate Title */}
                    <h3 className="edu-stagger-text font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
                      {item.title}
                    </h3>

                    {/* Institution (Rendered only if defined, no placeholder for HSC) */}
                    {item.institution && (
                      <p className="edu-stagger-text text-sm sm:text-base font-semibold text-zinc-200 mt-2">
                        {item.institution}
                      </p>
                    )}

                    {/* Location */}
                    <div className="edu-stagger-text flex items-center gap-1.5 text-xs sm:text-sm text-zinc-400 font-mono mt-2">
                      <FaLocationDot className="w-3.5 h-3.5 text-cyan-400/80" />
                      <span>{item.location}</span>
                    </div>

                    {/* Academic Narrative */}
                    <p className="edu-stagger-text text-xs sm:text-sm text-zinc-300 leading-relaxed mt-4">
                      {item.description}
                    </p>

                    {/* B.Tech Specific: Branch Callout & Relevant Coursework */}
                    {item.branch && (
                      <div className="edu-stagger-text mt-5 p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-800/50 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm text-zinc-300">
                          Branch:{' '}
                          <strong className="text-white font-bold text-cyan-300">
                            Information Technology (IT)
                          </strong>
                        </span>
                        <span className="text-[11px] font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                          Engineering Undergraduate
                        </span>
                      </div>
                    )}

                    {/* Coursework Topics for B.Tech */}
                    {item.coursework && item.coursework.length > 0 && (
                      <div className="edu-stagger-text mt-5 pt-5 border-t border-zinc-800/80">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-3">
                          <FaBookBookmark className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Core Areas &amp; Coursework</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.coursework.map((course, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 text-[11px] sm:text-xs rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-300 font-mono hover:border-cyan-500/40 transition-colors"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
