import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ProfileHeroPhotoProps {
  className?: string;
}

// Authoritative original image asset paths
const PRIMARY_IMAGE_PATH = '/profile%20pic.jpeg';
const FALLBACK_IMAGE_PATHS = [
  '/images/profile%20pic.jpeg',
  '/profile.jpeg',
  '/profile.jpg',
  '/images/profile.jpg',
];

export const ProfileHeroPhoto: React.FC<ProfileHeroPhotoProps> = ({ className = '' }) => {
  const ringRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const [imageSrc, setImageSrc] = useState<string>(() => {
    // Check if user previously dropped their original file in this session
    return localStorage.getItem('ashwin_original_profile_pic') || PRIMARY_IMAGE_PATH;
  });
  const [loadError, setLoadError] = useState(false);
  const [candidateIndex, setCandidateIndex] = useState(0);

  // Fallback progression across canonical paths
  const handleImageError = () => {
    if (candidateIndex < FALLBACK_IMAGE_PATHS.length) {
      const nextPath = FALLBACK_IMAGE_PATHS[candidateIndex];
      setCandidateIndex((prev) => prev + 1);
      setImageSrc(nextPath);
    } else {
      setLoadError(true);
    }
  };

  const handleImageLoad = () => {
    setLoadError(false);
  };

  // Optional direct selection of original photo file
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setImageSrc(base64);
      setLoadError(false);
      try {
        localStorage.setItem('ashwin_original_profile_pic', base64);
        await fetch('/api/upload-profile-pic', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ base64Data: base64, filename: 'profile pic.jpeg' }),
        });
      } catch (err) {
        console.warn('Could not sync original photo to server:', err);
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Only decorative surrounding elements animate; the photo itself remains completely static
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
      {/* 1. Subtle surrounding soft radial ambient glow (decorative only) */}
      <div
        className="absolute -inset-6 sm:-inset-10 rounded-full bg-radial from-cyan-500/20 via-sky-600/8 to-transparent blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* 2. Outer technical cyan orbit ring (animates slowly; separate from photo) */}
      <svg
        ref={ringRef}
        className="absolute -inset-6 sm:-inset-8 w-[calc(100%+3rem)] sm:w-[calc(100%+4rem)] h-[calc(100%+3rem)] sm:h-[calc(100%+4rem)] pointer-events-none -z-5"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Dashed outer orbit */}
        <circle
          cx="200"
          cy="200"
          r="192"
          stroke="rgba(6, 182, 212, 0.28)"
          strokeWidth="1.2"
          strokeDasharray="6 8"
        />

        {/* Secondary faint technical ring */}
        <circle
          cx="200"
          cy="200"
          r="182"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1"
        />

        {/* Accent orbital nodes */}
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

      {/* 4. Circular container for the ORIGINAL UNCHANGED PHOTOGRAPH */}
      <div
        className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[410px] xl:h-[410px] border border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.22)] bg-zinc-950"
        style={{
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        {!loadError ? (
          <img
            src={imageSrc}
            onError={handleImageError}
            onLoad={handleImageLoad}
            alt="Ashwin Kurekar — Original Profile Photograph"
            className="profile-image w-full h-full pointer-events-none select-none"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              borderRadius: '50%',
            }}
            loading="eager"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-zinc-900 transition-colors"
            title="Click to select profile pic.jpeg"
          >
            <div className="w-12 h-12 rounded-full border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-white font-mono">Ashwin Kurekar</p>
            <p className="text-[11px] text-cyan-400/90 mt-1 font-mono">Original Profile Photo</p>
            <span className="text-[10px] text-zinc-400 mt-2 px-3 py-1 bg-zinc-800 rounded-full border border-zinc-700">
              Click to load profile pic.jpeg
            </span>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>
    </div>
  );
};
