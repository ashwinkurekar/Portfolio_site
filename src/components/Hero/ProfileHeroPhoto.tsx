import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { PROFILE_IMAGE_URL, PROFILE_IMAGE_FALLBACKS } from '../../config/profileImage';

interface ProfileHeroPhotoProps {
  className?: string;
}

export const ProfileHeroPhoto: React.FC<ProfileHeroPhotoProps> = ({ className = '' }) => {
  const ringRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Permanent image URL derived from Google Drive direct CDN with robust fallbacks
  const [currentSrc, setCurrentSrc] = useState<string>(PROFILE_IMAGE_URL);
  const [fallbackIndex, setFallbackIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (fallbackIndex < PROFILE_IMAGE_FALLBACKS.length) {
      setCurrentSrc(PROFILE_IMAGE_FALLBACKS[fallbackIndex]);
      setFallbackIndex((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  };

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Slow ambient rotation of decorative technical orbit ring
    let tween: gsap.core.Tween | null = null;
    if (ringRef.current) {
      tween = gsap.to(ringRef.current, {
        rotation: 360,
        duration: 70,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      });
    }

    return () => {
      tween?.kill();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${className}`}
    >
      {/* 1. Subtle surrounding soft radial ambient glow */}
      <div
        className="absolute -inset-6 sm:-inset-10 rounded-full bg-radial from-cyan-500/20 via-sky-600/8 to-transparent blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* 2. Outer technical cyan orbit ring (decorative SVG) */}
      <svg
        ref={ringRef}
        className="absolute -inset-6 sm:-inset-8 w-[calc(100%+3rem)] sm:w-[calc(100%+4rem)] h-[calc(100%+3rem)] sm:h-[calc(100%+4rem)] pointer-events-none -z-5"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="200"
          cy="200"
          r="192"
          stroke="rgba(6, 182, 212, 0.28)"
          strokeWidth="1.2"
          strokeDasharray="6 8"
        />
        <circle
          cx="200"
          cy="200"
          r="182"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1"
        />
        <circle cx="200" cy="8" r="3.5" fill="#38bdf8" />
        <circle cx="392" cy="200" r="3" fill="#06b6d4" />
        <circle cx="200" cy="392" r="3.5" fill="#38bdf8" />
        <circle cx="8" cy="200" r="3" fill="#06b6d4" />
      </svg>

      {/* 3. Static thin cyan border ring */}
      <div
        className="absolute -inset-2.5 sm:-inset-3 rounded-full border border-cyan-500/30 pointer-events-none -z-5"
        aria-hidden="true"
      />

      {/* 4. Circular container for permanent profile photograph */}
      <div
        className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[410px] xl:h-[410px] border border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.22)] bg-zinc-950 overflow-hidden rounded-full"
      >
        {!hasError ? (
          <img
            src={currentSrc}
            onError={handleImageError}
            alt="Ashwin Kurekar — Profile Photograph"
            className="profile-image w-full h-full object-cover object-center pointer-events-none select-none rounded-full"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-zinc-950 rounded-full">
            <div className="w-20 h-20 rounded-full bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center text-cyan-300 font-display text-2xl font-black mb-2 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              AK
            </div>
            <p className="text-sm font-bold text-white font-display">Ashwin Kurekar</p>
            <p className="text-xs text-cyan-400 font-mono mt-1">Information Technology</p>
          </div>
        )}
      </div>
    </div>
  );
};
