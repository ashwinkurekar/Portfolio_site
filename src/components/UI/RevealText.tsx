import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export const RevealText: React.FC<RevealTextProps> = ({
  text,
  className = '',
  delay = 0,
  as: Component = 'span',
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReducedMotion) return;

    const chars = el.querySelectorAll('.reveal-char');
    if (!chars.length) return;

    gsap.fromTo(
      chars,
      {
        y: '110%',
        opacity: 0,
        rotateX: -30,
      },
      {
        y: '0%',
        opacity: 1,
        rotateX: 0,
        duration: 0.9,
        stagger: 0.035,
        delay,
        ease: 'power3.out',
      }
    );
  }, [text, delay, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <Component className={className}>{text}</Component>;
  }

  const words = text.split(' ');

  return (
    // @ts-expect-error dynamic component type
    <Component ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap overflow-hidden mr-[0.28em] py-1">
          {Array.from(word).map((char, charIndex) => (
            <span
              key={charIndex}
              className="reveal-char inline-block will-change-transform transform-gpu"
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </Component>
  );
};
