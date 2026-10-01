import React from 'react';
import { Project } from '../../data/projects';
import { FaXmark, FaGithub, FaArrowUpRightFromSquare, FaCheck } from 'react-icons/fa6';
import { MagneticButton } from '../UI/MagneticButton';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-3xl bg-[#0e0e14] border border-zinc-700/80 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors focus-visible:ring-1 focus-visible:ring-cyan-400"
          aria-label="Close project modal"
        >
          <FaXmark className="w-4 h-4" />
        </button>

        {/* Project Header */}
        <div className="flex items-center gap-3 text-xs text-cyan-400 font-mono">
          <span>PROJECT {project.number}</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-400">{project.category}</span>
        </div>

        <h3 id="modal-title" className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-2">
          {project.name}
        </h3>
        <p className="text-sm font-medium text-zinc-300 mt-1">{project.tagline}</p>

        {/* Image Preview */}
        <div className="mt-6 aspect-video rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 relative">
          <img
            src={project.imageUrl}
            alt={`${project.name} interface preview`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Description & Highlights */}
        <div className="mt-6 space-y-4">
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-zinc-500 font-semibold mb-1">
              Overview
            </h4>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-zinc-500 font-semibold mb-2">
              Key Engineering Highlights
            </h4>
            <ul className="space-y-2">
              {project.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                  <FaCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies without pill enclosure */}
          <div className="pt-4 border-t border-zinc-800">
            <h4 className="text-xs uppercase tracking-wider font-mono text-zinc-500 font-semibold mb-2">
              Technology Stack
            </h4>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm text-zinc-300">
              {project.technologies.map((tech, idx) => (
                <React.Fragment key={tech}>
                  <span className="text-white font-medium">{tech}</span>
                  {idx < project.technologies.length - 1 && (
                    <span className="text-zinc-600 select-none">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-wrap items-center gap-4">
          {project.liveDemoUrl && project.liveDemoUrl !== '#' ? (
            <MagneticButton strength={0.25}>
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <span>Live Demo</span>
                <FaArrowUpRightFromSquare className="w-3 h-3" />
              </a>
            </MagneticButton>
          ) : (
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono uppercase tracking-wider">
              <span>Live Demo Coming Soon</span>
            </div>
          )}

          {project.githubUrl && project.githubUrl !== '#' ? (
            <MagneticButton strength={0.25}>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors border border-zinc-700"
              >
                <FaGithub className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
            </MagneticButton>
          ) : (
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono uppercase tracking-wider">
              <FaGithub className="w-3.5 h-3.5" />
              <span>Repository Coming Soon</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
