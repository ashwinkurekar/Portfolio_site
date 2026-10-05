import React, { useRef, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from 'react-icons/fa6';
import { ProfileHeroPhoto } from './ProfileHeroPhoto';
import { siteConfig } from '../../config/site';
import { MagneticButton } from '../UI/MagneticButton';
import { gsap } from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    // Elegant GSAP Page Load Sequence
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      const navElements = document.querySelectorAll('#navbar-logo, #navbar-nav, #navbar-cta');

      // Initial state
      if (navElements.length) {
        gsap.set(navElements, { y: -20, opacity: 0 });
      }
      gsap.set('.hero-badge', { y: 20, opacity: 0 });
      gsap.set('.hero-intro-prefix', { y: 16, opacity: 0 });
      gsap.set(['.hero-first-name', '.hero-last-name'], { y: 24, opacity: 0 });
      gsap.set(['.hero-tagline', '.hero-main-statement', '.hero-desc', '.hero-cta-btn', '.hero-social-item'], {
        y: 20,
        opacity: 0,
      });

      // Timeline sequence:
      // 1. Navbar elements reveal
      if (navElements.length) {
        tl.to(navElements, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
        });
      }

      // 2. Location & status marker
      tl.to(
        '.hero-badge',
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
        },
        navElements.length ? '-=0.35' : undefined
      )
        // 3. "I'm" prefix
        .to(
          '.hero-intro-prefix',
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
          },
          '-=0.3'
        )
        // 4. "Ashwin" first name
        .to(
          '.hero-first-name',
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
          },
          '-=0.25'
        )
        // 5. "Kurekar" surname on separate line directly below
        .to(
          '.hero-last-name',
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
          },
          '-=0.4'
        )
        // 6. Professional Tagline
        .to(
          '.hero-tagline',
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
          },
          '-=0.4'
        )
        // 6. Main Hero Statement
        .to(
          '.hero-main-statement',
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          },
          '-=0.4'
        )
        // 7. Passion statement / supporting description
        .to(
          '.hero-desc',
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          },
          '-=0.4'
        )
        // 8. CTA buttons reveal
        .to(
          '.hero-cta-btn',
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
          },
          '-=0.45'
        )
        // 9. Social links reveal
        .to(
          '.hero-social-item',
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.06,
          },
          '-=0.3'
        );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-grid-pattern"
    >
      {/* Subtle radial ambient spotlight */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/5 blur-[130px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Typography, Tagline, Statements & CTAs (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col text-left">
            {/* Location & Status Marker */}
            <div className="hero-badge inline-flex items-center gap-2.5 mb-5 text-xs text-zinc-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Nagpur, Maharashtra, India</span>
              <span className="text-zinc-600">·</span>
              <span className="text-cyan-400/90 font-mono text-[11px]">3rd Year IT Engineering</span>
            </div>

            {/* Main Introduction: "I'm", "Ashwin", and "Kurekar" each on their own separate line */}
            <div className="mb-3">
              <h1
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.04]"
                aria-label="I'm Ashwin Kurekar"
              >
                {/* Line 1: I'm */}
                <span className="hero-intro-prefix block text-lg sm:text-xl md:text-2xl font-medium tracking-wide text-zinc-400 font-sans mb-1.5 sm:mb-2">
                  I'm
                </span>

                {/* Line 2: Ashwin */}
                <span className="hero-first-name block text-white">
                  Ashwin
                </span>

                {/* Line 3: Kurekar directly below */}
                <span className="hero-last-name block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-white mt-1 sm:mt-1.5">
                  Kurekar
                </span>
              </h1>
            </div>

            {/* Professional Tagline directly below name */}
            <div className="hero-tagline mt-2 sm:mt-3">
              <p className="text-sm sm:text-base md:text-lg font-semibold text-cyan-400/95 tracking-wide font-mono">
                Information Technology Student • Developer • AI Enthusiast
              </p>
            </div>

            {/* Main Hero Statement: Prominently styled and visually distinct */}
            <div className="hero-main-statement mt-5 p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 border-l-4 border-l-cyan-400 backdrop-blur-sm max-w-2xl shadow-lg shadow-black/20">
              <p className="text-base sm:text-lg md:text-xl font-medium text-zinc-100 leading-snug tracking-tight text-balance">
                "Passionate about turning complex problems into clean, intelligent and meaningful digital solutions."
              </p>
            </div>

            {/* Passion Statement / Supporting Paragraph */}
            <p className="hero-desc mt-4 text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
              Passionate about software development, artificial intelligence, modern web technologies and building practical digital products.
            </p>

            {/* Mobile-Only Profile Photo Placement (between Description and Buttons) */}
            <div className="flex lg:hidden my-8 hero-photo-wrapper justify-center items-center w-full">
              <ProfileHeroPhoto />
            </div>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton strength={0.25} className="hero-cta-btn">
                <button
                  onClick={handleScrollToProjects}
                  className="px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-black bg-zinc-100 hover:bg-white rounded-xl transition-all duration-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  View My Work
                </button>
              </MagneticButton>

              <MagneticButton strength={0.25} className="hero-cta-btn">
                <a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download or View Ashwin Kurekar's Resume"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-zinc-200 hover:text-white bg-zinc-900/90 hover:bg-zinc-800/90 border border-zinc-700/80 hover:border-cyan-400/80 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] rounded-xl transition-all duration-200 active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <FaDownload className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download Resume</span>
                </a>
              </MagneticButton>
            </div>

            {/* Social / Contact Links */}
            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-zinc-800/80 flex items-center gap-6">
              <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold font-mono">
                Connect
              </span>

              <div className="flex items-center gap-3">
                <MagneticButton strength={0.4} className="hero-social-item">
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Visit Ashwin Kurekar's GitHub"
                    className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-xl border border-zinc-800/80 hover:border-zinc-600 transition-all duration-200 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <FaGithub className="w-4 h-4" />
                  </a>
                </MagneticButton>

                <MagneticButton strength={0.4} className="hero-social-item">
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Visit Ashwin Kurekar's LinkedIn"
                    className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-xl border border-zinc-800/80 hover:border-zinc-600 transition-all duration-200 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <FaLinkedin className="w-4 h-4" />
                  </a>
                </MagneticButton>

                <MagneticButton strength={0.4} className="hero-social-item">
                  <a
                    href={siteConfig.links.email}
                    aria-label="Email Ashwin Kurekar"
                    className="p-2.5 text-zinc-400 hover:text-cyan-400 hover:bg-zinc-800/80 rounded-xl border border-zinc-800/80 hover:border-cyan-500/50 transition-all duration-200 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <FaEnvelope className="w-4 h-4" />
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Right Column: Desktop Profile Photo Presentation (starts from the line where the name Ashwin is written) */}
          <div className="hidden lg:flex lg:col-span-5 justify-center items-start lg:pt-[70px] xl:pt-[74px] px-4">
            <ProfileHeroPhoto />
          </div>
        </div>
      </div>
    </section>
  );
};
