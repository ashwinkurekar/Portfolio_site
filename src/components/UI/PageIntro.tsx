import React, { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface PageIntroProps {
  onComplete?: () => void;
}

export const PageIntro: React.FC<PageIntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'logo' | 'name' | 'role' | 'exit' | 'done'>('logo');
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // If reduced motion is preferred, immediately dismiss
    if (prefersReducedMotion) {
      setStage('done');
      onComplete?.();
      return;
    }

    // Sequence stages under ~1.8 seconds total
    const t1 = setTimeout(() => setStage('name'), 350);
    const t2 = setTimeout(() => setStage('role'), 850);
    const t3 = setTimeout(() => setStage('exit'), 1350);
    const t4 = setTimeout(() => {
      setStage('done');
      onComplete?.();
    }, 1800);

    // Guaranteed fallback: Absolute safety timer ensures website reveals no matter what
    const safetyTimer = setTimeout(() => {
      setStage('done');
      onComplete?.();
    }, 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(safetyTimer);
    };
  }, [prefersReducedMotion, onComplete]);

  if (stage === 'done') return null;

  return (
    <div
      role="status"
      aria-label="Loading Ashwin Kurekar Portfolio"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#070709] transition-all duration-500 ease-out select-none ${
        stage === 'exit' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient background glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      {/* Cyber grid lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Step 1: AK Emblem */}
        <div
          className={`relative mb-6 w-20 h-20 rounded-2xl bg-zinc-900/90 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_40px_rgba(56,189,248,0.25)] transition-all duration-500 transform ${
            stage !== 'logo' ? 'scale-100 opacity-100' : 'scale-90 opacity-90'
          }`}
        >
          <span className="font-display text-2xl font-black tracking-tighter text-white">
            AK
          </span>
          <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
          <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-cyan-400" />
        </div>

        {/* Step 2: ASHWIN KUREKAR Name Reveal */}
        <div className="overflow-hidden mb-2">
          <h1
            className={`font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase text-white transition-all duration-500 transform ${
              stage === 'logo'
                ? 'translate-y-full opacity-0'
                : 'translate-y-0 opacity-100'
            }`}
          >
            Ashwin Kurekar
          </h1>
        </div>

        {/* Step 3: Developer / AI Enthusiast Subtitle */}
        <div className="overflow-hidden mb-8">
          <p
            className={`text-xs sm:text-sm font-mono tracking-widest uppercase text-cyan-400 transition-all duration-500 transform ${
              stage === 'logo' || stage === 'name'
                ? 'translate-y-full opacity-0'
                : 'translate-y-0 opacity-100'
            }`}
          >
            Developer • AI Enthusiast
          </p>
        </div>

        {/* High-speed progress line */}
        <div className="w-48 sm:w-64 h-[2px] bg-zinc-800 rounded-full overflow-hidden relative">
          <div
            className={`h-full bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-500 transition-all duration-700 ease-out ${
              stage === 'logo'
                ? 'w-1/4'
                : stage === 'name'
                ? 'w-2/3'
                : 'w-full shadow-[0_0_15px_rgba(56,189,248,0.8)]'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
