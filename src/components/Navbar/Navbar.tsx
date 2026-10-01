import React, { useState } from 'react';
import { FaBars, FaXmark, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { MagneticButton } from '../UI/MagneticButton';

interface NavbarProps {
  activeSection: string;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const { isScrolled, scrollProgress } = useScrollPosition();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08080a]/85 backdrop-blur-md border-b border-zinc-800/70 py-3.5 shadow-xl shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      {/* Subtle top progress bar */}
      <div
        className="absolute top-0 left-0 h-[1.5px] bg-gradient-to-r from-cyan-500 via-sky-400 to-cyan-300 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div id="navbar-logo">
          <MagneticButton strength={0.2}>
            <button
              onClick={() => scrollToSection('home')}
              className="group flex items-center gap-2 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-lg p-1 cursor-pointer"
              aria-label="Ashwin Kurekar Home"
            >
              <span className="font-display text-xl font-extrabold tracking-tighter text-white transition-colors group-hover:text-cyan-400">
                AK
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/90 transition-transform group-hover:scale-125" />
            </button>
          </MagneticButton>
        </div>

        {/* Zone 2: Navigation links */}
        <nav
          id="navbar-nav"
          className="hidden md:flex items-center gap-1.5 lg:gap-2 px-3 py-1.5 rounded-full border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-sm"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-1 text-xs lg:text-sm font-medium transition-all duration-200 rounded-full group cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-full bg-white/10 -z-10"
                    aria-hidden="true"
                  />
                )}
                <span>{item.label}</span>
                {/* Subtle animated underline on hover */}
                <span className="absolute bottom-0.5 left-3 right-3 h-[1px] bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action (Resume & Mobile Toggle) */}
        <div id="navbar-cta" className="flex items-center gap-3">
          <MagneticButton strength={0.3}>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide uppercase text-white bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 rounded-xl transition-all duration-200 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] active:scale-[0.98]"
            >
              <span>Let's Talk</span>
              <FaArrowUpRightFromSquare className="w-2.5 h-2.5 text-cyan-400" />
            </a>
          </MagneticButton>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg border border-zinc-800 bg-zinc-900/60 focus-visible:ring-1 focus-visible:ring-cyan-400"
            aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FaXmark className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0e]/95 backdrop-blur-xl border-b border-zinc-800 px-6 py-6 transition-all animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-zinc-800/80 text-cyan-400 font-semibold'
                      : 'text-zinc-300 hover:bg-zinc-900/80 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />}
                </button>
              );
            })}

            <div className="pt-4 border-t border-zinc-800/80 flex flex-col gap-2">
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full py-2.5 text-center text-xs uppercase tracking-wider font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
