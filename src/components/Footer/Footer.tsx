import React from 'react';
import { siteConfig } from '../../config/site';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa6';
import { MagneticButton } from '../UI/MagneticButton';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    const homeEl = document.getElementById('home');
    if (homeEl) {
      homeEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="relative border-t border-zinc-800/80 bg-[#060608] py-14 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand & Slogan */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <span className="font-display text-xl font-extrabold text-white tracking-tight">
                {siteConfig.name}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </div>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-medium">
              "Built with code, creativity &amp; AI."
            </p>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-3">
            <MagneticButton strength={0.3}>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                aria-label="Ashwin Kurekar GitHub"
                className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors inline-block"
              >
                <FaGithub className="w-4 h-4" />
              </a>
            </MagneticButton>

            <MagneticButton strength={0.3}>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="Visit Ashwin Kurekar's LinkedIn"
                className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
            </MagneticButton>

            <MagneticButton strength={0.3}>
              <a
                href={siteConfig.links.email}
                aria-label="Email Ashwin Kurekar"
                className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <FaEnvelope className="w-4 h-4" />
              </a>
            </MagneticButton>

            <MagneticButton strength={0.3}>
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white hover:border-cyan-500/50 transition-colors ml-2 cursor-pointer text-xs font-mono"
                aria-label="Back to top of page"
              >
                <span>Top</span>
                <FaArrowUp className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </MagneticButton>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-10 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>© 2026 Ashwin Kurekar. All rights reserved.</div>
          <div className="flex items-center gap-3">
            <span>Nagpur, Maharashtra, India</span>
            <span>·</span>
            <span>Portfolio v1.0 Foundation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
