import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGsapContext(scopeRef: React.RefObject<HTMLElement | null>, animationFn: (ctx: gsap.Context) => void, deps: React.DependencyList = []) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!scopeRef.current) return;

    // Create GSAP context for automatic scoping and garbage collection
    const ctx = gsap.context((self) => {
      if (!prefersReducedMotion) {
        animationFn(self);
      }
    }, scopeRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion, ...deps]);
}
