import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Disable on touch devices or reduced motion
    if (prefersReducedMotion) return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Fast tracking for center dot, smooth lerp for outer ring
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };

    const setPos = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Instantly position the dot
      gsap.set(dot, { x: mouse.x, y: mouse.y });
    };

    const updateRing = () => {
      // Linear interpolation for smooth trailing
      pos.x += (mouse.x - pos.x) * 0.18;
      pos.y += (mouse.y - pos.y) * 0.18;

      gsap.set(ring, { x: pos.x, y: pos.y });
    };

    gsap.ticker.add(updateRing);
    window.addEventListener('mousemove', setPos);

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    // Global listener for interactive hover targets
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, input, textarea, select, [data-cursor-hover], [role="button"]');
      const projectCard = target.closest('[data-cursor-project]');

      if (projectCard) {
        setIsHovered(true);
        setCursorText('VIEW');
      } else if (interactive) {
        setIsHovered(true);
        setCursorText(null);
      } else {
        setIsHovered(false);
        setCursorText(null);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      gsap.ticker.remove(updateRing);
      window.removeEventListener('mousemove', setPos);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [prefersReducedMotion, isVisible]);

  if (prefersReducedMotion) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Central pinpoint dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isHovered ? 'bg-cyan-300 scale-150' : 'bg-white'}`}
      />

      {/* Smooth outer ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/60 flex items-center justify-center transition-all duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isClicking
            ? 'w-7 h-7 bg-cyan-500/20 border-cyan-300 scale-90'
            : cursorText
            ? 'w-16 h-16 bg-cyan-950/80 border-cyan-400 backdrop-blur-sm'
            : isHovered
            ? 'w-12 h-12 bg-cyan-400/10 border-cyan-400 scale-110'
            : 'w-9 h-9 bg-transparent border-zinc-500/40'
        }`}
      >
        {cursorText && (
          <span className="font-mono text-[10px] font-bold text-cyan-300 tracking-wider animate-in fade-in">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
