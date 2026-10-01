import React, { useState, useRef, useEffect } from 'react';
import { CERTIFICATIONS_DATA, CertificationItem } from '../../data/certifications';
import {
  FaCertificate,
  FaArrowUpRightFromSquare,
  FaXmark,
  FaCheck,
  FaBuildingColumns,
} from 'react-icons/fa6';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MagneticButton } from '../UI/MagneticButton';
import { CertificateButton } from '../UI/CertificateButton';

export const Certifications: React.FC = () => {
  const [activeCert, setActiveCert] = useState<CertificationItem | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeCert) {
        setActiveCert(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCert]);

  // GSAP scroll entrance stagger
  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from('.cert-header-item', {
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

      // Staggered reveal of certification cards
      const cards = gsap.utils.toArray<HTMLElement>('.cert-showcase-card');
      cards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: (idx % 3) * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="py-24 sm:py-32 relative border-t border-zinc-800/60 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[500px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <span className="cert-header-item text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold mb-2 block">
              05. Credentials & Qualifications
            </span>
            <h2 className="cert-header-item font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase">
              Certifications
            </h2>
          </div>
          <p className="cert-header-item text-sm text-zinc-400 max-w-md">
            Verified credentials across IBM AI, Google Cloud Generative AI, JPMorgan Chase Software Engineering, Google Gemini, and Full-Stack Engineering.
          </p>
        </div>

        {/* Certification Cards Grid (Horizontally balanced 3x2 on desktop) */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CERTIFICATIONS_DATA.map((cert) => {
            const hasValidLink = cert.certificateUrl && cert.certificateUrl !== '#';

            return (
              <article
                key={cert.id}
                onClick={() => setActiveCert(cert)}
                className="cert-showcase-card group relative rounded-3xl bg-zinc-950/70 border border-zinc-800/80 hover:border-cyan-500/50 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(56,189,248,0.12)] cursor-pointer overflow-hidden"
              >
                {/* Ambient glow accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Top Bar with Number and Type */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="flex items-center gap-2">
                      <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-cyan-400 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/40 group-hover:rotate-6 transition-all duration-300 shadow-inner">
                        <FaCertificate className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-mono text-zinc-500 font-semibold">
                        CERT {cert.number}
                      </span>
                    </div>

                    {cert.type && (
                      <span className="px-2.5 py-1 rounded-md bg-zinc-900/90 border border-zinc-800 text-[10px] font-mono text-cyan-400 font-medium group-hover:border-cyan-500/30 transition-colors">
                        {cert.type}
                      </span>
                    )}
                  </div>

                  {/* Organization name with highlight on hover */}
                  <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 mb-2">
                    <FaBuildingColumns className="w-3 h-3 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
                    <span className="group-hover:text-white transition-colors font-medium">
                      {cert.organization}
                    </span>
                  </div>

                  {/* Certificate Title */}
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-cyan-200 transition-colors leading-snug">
                    {cert.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3">
                    {cert.description}
                  </p>
                </div>

                {/* Footer Action: Card -> Details -> View Certificate */}
                <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between gap-2 relative z-10">
                  <span className="text-[11px] font-mono text-zinc-500">
                    {cert.tag}
                  </span>

                  <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-medium group-hover:text-cyan-300 group-hover:translate-x-1 transition-all">
                    <span>View Details</span>
                    <span>→</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Interactive Detail Modal */}
      {activeCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveCert(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-[#0e0e14] border border-zinc-700/80 p-6 sm:p-8 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveCert(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors focus-visible:ring-1 focus-visible:ring-cyan-400 cursor-pointer"
              aria-label="Close dialog"
            >
              <FaXmark className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <FaCertificate className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold block">
                  Credential #{activeCert.number}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {activeCert.organization}
                </span>
              </div>
            </div>

            <h3 id="cert-modal-title" className="font-display text-2xl font-bold text-white leading-tight">
              {activeCert.name}
            </h3>

            {/* Metadata */}
            <div className="mt-5 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-mono">Issuing Body:</span>
                <span className="text-white font-medium">{activeCert.organization}</span>
              </div>
              {activeCert.type && (
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 font-mono">Program Type:</span>
                  <span className="text-cyan-400 font-medium">{activeCert.type}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-mono">Domain:</span>
                <span className="text-zinc-300 font-medium">{activeCert.tag}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-5">
              <h4 className="text-xs uppercase font-mono tracking-wider text-zinc-500 font-semibold mb-2">
                Program Scope
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {activeCert.description}
              </p>
            </div>

            {/* Action Bar */}
            <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <CertificateButton
                certificateUrl={activeCert.certificateUrl}
                itemTitle={activeCert.name}
              />

              <MagneticButton strength={0.2}>
                <button
                  onClick={() => setActiveCert(null)}
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
