import React, { useState, useRef, useEffect } from 'react';
import { PROJECTS_DATA, Project } from '../../data/projects';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from('.projects-header-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      });

      const cards = gsap.utils.toArray<HTMLElement>('.project-showcase-card');

      cards.forEach((card, i) => {
        const image = card.querySelector<HTMLElement>('.project-card-image');
        const tags = card.querySelectorAll<HTMLElement>('.project-tech-tag');

        // Card entrance animation
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            scale: 0.94,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
            },
          }
        );

        // Subtle image parallax
        if (image) {
          gsap.fromTo(
            image,
            { yPercent: -6, scale: 1.05 },
            {
              yPercent: 6,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }

        // Tech tags entrance
        if (tags.length) {
          gsap.fromTo(
            tags,
            { opacity: 0, x: -10 },
            {
              opacity: 1,
              x: 0,
              duration: 0.4,
              stagger: 0.04,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 78%',
              },
            }
          );
        }

        // Active project prominence effect on desktop
        if (window.innerWidth >= 1024) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 40%',
            end: 'bottom 20%',
            onEnter: () => {
              gsap.to(card, {
                scale: 1.015,
                opacity: 1,
                duration: 0.4,
                boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(56,189,248,0.12)',
              });
            },
            onLeave: () => {
              gsap.to(card, {
                scale: 0.98,
                opacity: 0.85,
                duration: 0.4,
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
              });
            },
            onEnterBack: () => {
              gsap.to(card, {
                scale: 1.015,
                opacity: 1,
                duration: 0.4,
                boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(56,189,248,0.12)',
              });
            },
            onLeaveBack: () => {
              gsap.to(card, {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                boxShadow: 'none',
              });
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-24 sm:py-32 relative border-t border-zinc-800/60"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <span className="projects-header-item text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold mb-2 block">
              03. Selected Work
            </span>
            <h2 className="projects-header-item font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase">
              Featured Projects
            </h2>
          </div>
          <p className="projects-header-item text-sm text-zinc-400 max-w-md">
            Architected digital products spanning generative AI, forensic computer vision, emergency transit systems, and urban sensor analytics.
          </p>
        </div>

        {/* 2x2 Grid of Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PROJECTS_DATA.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onOpenDetails={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </div>

      {/* Interactive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
