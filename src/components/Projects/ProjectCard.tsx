import React, { useRef } from 'react';
import { Project } from '../../data/projects';
import { FaGithub, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { MagneticButton } from '../UI/MagneticButton';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onOpenDetails }) => {
  const cardRef = useRef<HTMLElement | null>(null);

  return (
    <article
      ref={cardRef}
      data-cursor-project="true"
      data-project-index={index}
      className="project-showcase-card group relative rounded-3xl bg-zinc-950/70 border border-zinc-800/90 hover:border-cyan-500/50 overflow-hidden flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(56,189,248,0.12)] hover:-translate-y-1.5"
    >
      {/* Dynamic ambient hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

      {/* Project Visual Container with parallax image */}
      <div
        onClick={() => onOpenDetails(project)}
        className="relative aspect-video w-full overflow-hidden bg-zinc-900 cursor-pointer"
      >
        <img
          src={project.imageUrl}
          alt={`${project.name} preview thumbnail`}
          referrerPolicy="no-referrer"
          className="project-card-image w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
        />

        {/* Ambient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />

        {/* Project Number badge */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-mono font-semibold text-cyan-400 shadow-sm">
          PROJECT {project.number}
        </div>

        {/* Inspect tooltip */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md text-[11px] font-mono text-cyan-300 border border-cyan-500/30">
          Click to View Case Study
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between relative z-10">
        <div>
          {/* Unboxed category metadata */}
          <div className="text-xs font-mono text-cyan-400/90 mb-2.5">
            {project.category}
          </div>

          <h3
            onClick={() => onOpenDetails(project)}
            className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-all duration-300 group-hover:translate-x-1 cursor-pointer"
          >
            {project.name}
          </h3>

          <p className="mt-3 text-sm text-zinc-400 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Technologies unboxed list */}
          <div className="mt-6 pt-4 border-t border-zinc-900 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-zinc-400 font-mono">
            {project.technologies.map((tech, idx) => (
              <React.Fragment key={tech}>
                <span className="project-tech-tag text-zinc-300 transition-colors group-hover:text-cyan-200">
                  {tech}
                </span>
                {idx < project.technologies.length - 1 && (
                  <span className="text-zinc-700 select-none">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Actions (GitHub & Live Demo & Details) */}
        <div className="mt-7 pt-5 border-t border-zinc-900/90 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onOpenDetails(project)}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer group-hover:translate-x-0.5 flex items-center gap-1.5"
          >
            <span>Case Details</span>
            <span>→</span>
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && project.githubUrl !== '#' ? (
              <MagneticButton strength={0.3}>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${project.name} on GitHub`}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-xl border border-zinc-800 transition-colors inline-block"
                >
                  <FaGithub className="w-4 h-4" />
                </a>
              </MagneticButton>
            ) : (
              <span
                className="p-2 text-zinc-600 rounded-xl border border-zinc-800/60 inline-block cursor-not-allowed text-xs font-mono"
                title="GitHub repository coming soon"
              >
                <FaGithub className="w-4 h-4" />
              </span>
            )}

            {project.liveDemoUrl && project.liveDemoUrl !== '#' ? (
              <MagneticButton strength={0.3}>
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Launch ${project.name} live demo`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-800/50 rounded-xl transition-all hover:border-cyan-500/60 shadow-sm"
                >
                  <span>Live Demo</span>
                  <FaArrowUpRightFromSquare className="w-2.5 h-2.5" />
                </a>
              </MagneticButton>
            ) : (
              <button
                onClick={() => onOpenDetails(project)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 bg-zinc-900/60 hover:bg-zinc-800/60 border border-zinc-800 rounded-xl transition-all cursor-pointer"
              >
                <span>Demo Soon</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
