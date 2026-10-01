import React, { useState, useRef, useEffect } from 'react';
import { EXPERIENCE_DATA, ExperienceItem } from '../../data/experience';
import {
  FaCalendarDays,
  FaLocationDot,
  FaBriefcase,
  FaBuilding,
  FaClock,
  FaXmark,
  FaCheck,
} from 'react-icons/fa6';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MagneticButton } from '../UI/MagneticButton';
import { CertificateButton, OfferLetterButton } from '../UI/CertificateButton';

export const Experience: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineLineRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedExperience) {
        setSelectedExperience(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedExperience]);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from('.experience-header-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      });

      // Growing vertical timeline line with ScrollTrigger scrub
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.experience-timeline-container',
              start: 'top 75%',
              end: 'bottom 80%',
              scrub: 0.8,
            },
          }
        );
      }

      // Experience cards sequential animation
      const cards = gsap.utils.toArray<HTMLElement>('.experience-timeline-card');
      cards.forEach((card) => {
        const node = card.querySelector('.timeline-node-circle');
        const company = card.querySelector('.exp-company-title');
        const role = card.querySelector('.exp-role-title');
        const dates = card.querySelector('.exp-dates-badge');
        const items = card.querySelectorAll('.exp-resp-item');
        const tags = card.querySelectorAll('.exp-tech-tag');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        });

        // 1. Card entry
        tl.fromTo(
          card,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
        );

        // 2. Node appears
        if (node) {
          tl.fromTo(
            node,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' },
            '-=0.5'
          );
        }

        // 3. Company & Role
        if (company && role) {
          tl.from(
            [company, role],
            { x: -15, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
            '-=0.3'
          );
        }

        // 4. Dates
        if (dates) {
          tl.from(dates, { opacity: 0, y: -5, duration: 0.3 }, '-=0.2');
        }

        // 5. Responsibilities stagger
        if (items.length) {
          tl.from(
            items,
            { opacity: 0, x: -10, duration: 0.4, stagger: 0.07, ease: 'power2.out' },
            '-=0.2'
          );
        }

        // 6. Technology tags
        if (tags.length) {
          tl.from(
            tags,
            { opacity: 0, y: 10, duration: 0.35, stagger: 0.04, ease: 'power2.out' },
            '-=0.2'
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-24 sm:py-32 relative border-t border-zinc-800/60 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <span className="experience-header-item text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold mb-2 block">
              04. Career & Industry Foundations
            </span>
            <h2 className="experience-header-item font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase">
              Internship Experience
            </h2>
          </div>
          <p className="experience-header-item text-sm text-zinc-400 max-w-md">
            Hands-on technical internships engineering web applications, collaborating on real-world team deliverables, and adhering to clean development practices.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="experience-timeline-container relative pl-6 sm:pl-10 md:pl-12 lg:pl-16 space-y-12">
          {/* Base inactive spine */}
          <div className="absolute top-0 bottom-0 left-2.5 sm:left-4 md:left-5 w-[2px] bg-zinc-800 -translate-x-1/2" />

          {/* Active growing gradient spine */}
          <div
            ref={timelineLineRef}
            className="absolute top-0 bottom-0 left-2.5 sm:left-4 md:left-5 w-[2px] bg-gradient-to-b from-cyan-400 via-sky-400 to-cyan-500 origin-top -translate-x-1/2 shadow-[0_0_12px_rgba(56,189,248,0.6)]"
          />

          {EXPERIENCE_DATA.map((item) => (
            <div key={item.id} className="experience-timeline-card relative group">
              {/* Timeline glowing node marker ● */}
              <div className="timeline-node-circle absolute -left-[27px] sm:-left-[39px] md:-left-[43px] top-2.5 w-6 h-6 rounded-full bg-[#08080a] border-2 border-zinc-700 group-hover:border-cyan-400 transition-all duration-300 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(56,189,248,0.7)]">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400/80 group-hover:bg-cyan-300 transition-colors group-hover:scale-125" />
              </div>

              {/* Experience Card: Clickable to open details modal */}
              <article
                onClick={() => setSelectedExperience(item)}
                className="p-7 sm:p-9 rounded-3xl bg-zinc-950/70 border border-zinc-800/80 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(56,189,248,0.12)] hover:-translate-y-1 relative overflow-hidden cursor-pointer"
              >
                {/* Ambient glow accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

                {/* Header Row: Company, Role & Meta */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 relative z-10">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                        EXPERIENCE {item.number}
                      </span>
                      <span className="text-zinc-600 text-xs">·</span>
                      <span className="text-xs font-mono text-zinc-400">
                        {item.mode}
                      </span>
                    </div>

                    <h3 className="exp-company-title font-display text-2xl sm:text-3xl font-extrabold text-white group-hover:text-cyan-200 transition-colors tracking-tight flex items-center gap-2.5">
                      <FaBuilding className="w-5 h-5 text-zinc-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                      <span>{item.company}</span>
                    </h3>

                    <div className="exp-role-title mt-1.5 flex items-center gap-2 text-base sm:text-lg font-semibold text-zinc-300">
                      <FaBriefcase className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{item.position}</span>
                    </div>
                  </div>

                  {/* Dates, Location & Duration Badges */}
                  <div className="exp-dates-badge flex flex-wrap lg:flex-col lg:items-end gap-2 text-xs font-mono text-zinc-400">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                      <FaCalendarDays className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.dates}</span>
                    </span>

                    <div className="flex items-center gap-2">
                      {item.duration && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-400">
                          <FaClock className="w-3 h-3 text-zinc-500" />
                          <span>{item.duration}</span>
                        </span>
                      )}

                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-400">
                        <FaLocationDot className="w-3 h-3 text-zinc-500" />
                        <span>{item.location}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Responsibilities List */}
                <div className="mt-6 pt-5 border-t border-zinc-900 relative z-10">
                  <h4 className="text-xs uppercase font-mono tracking-wider text-zinc-500 font-semibold mb-3">
                    Key Responsibilities & Deliverables
                  </h4>
                  <ul className="space-y-2.5">
                    {item.responsibilities.map((resp, rIdx) => (
                      <li
                        key={rIdx}
                        className="exp-resp-item flex items-start gap-3 text-xs sm:text-sm text-zinc-300 leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2 group-hover:scale-125 transition-transform" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Skills Tags & Direct Document Actions */}
                <div className="mt-6 pt-5 border-t border-zinc-900/90 flex flex-col xl:flex-row xl:items-center justify-between gap-4 relative z-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mr-2 font-semibold">
                      Core Technologies:
                    </span>
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="exp-tech-tag px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-zinc-300 group-hover:border-zinc-700 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div
                    className="flex flex-wrap items-center gap-2.5 shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <CertificateButton
                      certificateUrl={item.certificateUrl}
                      itemTitle={`${item.company} — ${item.position}`}
                    />
                    <OfferLetterButton
                      offerLetterUrl={item.offerLetterUrl}
                      itemTitle={`${item.company} — ${item.position}`}
                    />
                    <button
                      type="button"
                      onClick={() => setSelectedExperience(item)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer"
                    >
                      <span>Details</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Details Modal: Card -> Details -> View Certificate */}
      {selectedExperience && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="experience-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedExperience(null)}
        >
          <div
            className="relative w-full max-w-xl rounded-3xl bg-[#0e0e14] border border-zinc-700/80 p-6 sm:p-8 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedExperience(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors focus-visible:ring-1 focus-visible:ring-cyan-400 cursor-pointer"
              aria-label="Close details"
            >
              <FaXmark className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <FaBriefcase className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block font-semibold">
                  Internship #{selectedExperience.number}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {selectedExperience.mode}
                </span>
              </div>
            </div>

            <h3
              id="experience-modal-title"
              className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight mt-1"
            >
              {selectedExperience.company}
            </h3>

            <div className="mt-2 text-base font-semibold text-cyan-300 flex items-center gap-2">
              <FaBriefcase className="w-4 h-4 text-cyan-400" />
              <span>{selectedExperience.position}</span>
            </div>

            {/* Metadata Info Panel */}
            <div className="mt-5 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-mono">Duration & Dates:</span>
                <span className="text-white font-medium">{selectedExperience.dates}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-mono">Location & Mode:</span>
                <span className="text-zinc-300 font-medium">{selectedExperience.location}</span>
              </div>
              {selectedExperience.duration && (
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 font-mono">Tenure:</span>
                  <span className="text-cyan-300 font-medium">{selectedExperience.duration}</span>
                </div>
              )}
            </div>

            {/* Responsibilities list */}
            <div className="mt-6">
              <h4 className="text-xs uppercase font-mono tracking-wider text-zinc-500 font-semibold mb-3">
                Key Responsibilities & Deliverables
              </h4>
              <ul className="space-y-2.5">
                {selectedExperience.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Technologies */}
            <div className="mt-6 pt-4 border-t border-zinc-900">
              <h4 className="text-xs uppercase font-mono tracking-wider text-zinc-500 font-semibold mb-2">
                Technologies & Practices
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedExperience.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal action footer with View Certificate, View Offer Letter and Close triggers */}
            <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <CertificateButton
                  certificateUrl={selectedExperience.certificateUrl}
                  itemTitle={`${selectedExperience.company} — ${selectedExperience.position}`}
                />
                <OfferLetterButton
                  offerLetterUrl={selectedExperience.offerLetterUrl}
                  itemTitle={`${selectedExperience.company} — ${selectedExperience.position}`}
                />
              </div>

              <MagneticButton strength={0.2}>
                <button
                  onClick={() => setSelectedExperience(null)}
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
