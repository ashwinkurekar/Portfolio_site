import React, { useState } from 'react';
import { SkillItem } from '../../data/skills';
import { SkillIcon } from './SkillIcon';

interface SkillCardProps {
  skill: SkillItem;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  isExpanded = false,
  onToggleExpand,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const activeExpanded = onToggleExpand ? isExpanded : internalExpanded;

  const handleToggle = () => {
    if (onToggleExpand) {
      onToggleExpand();
    } else {
      setInternalExpanded((prev) => !prev);
    }
  };

  return (
    <div
      onClick={handleToggle}
      className={`skill-card-item group relative p-4 sm:p-5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900/95 border transition-all duration-300 flex flex-col justify-between cursor-pointer select-none transform-gpu ${
        activeExpanded
          ? 'border-cyan-400/80 shadow-[0_0_30px_rgba(6,182,212,0.18)] bg-zinc-900/95 -translate-y-1'
          : 'border-zinc-800/80 hover:border-cyan-500/50 hover:shadow-[0_12px_28px_rgba(6,182,212,0.12)] hover:-translate-y-1 hover:scale-[1.015]'
      }`}
    >
      {/* Background ambient radial highlight */}
      <div
        className="absolute inset-0 rounded-2xl bg-radial from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="p-2.5 rounded-xl bg-zinc-800/80 text-zinc-300 group-hover:text-cyan-300 group-hover:bg-cyan-500/15 border border-zinc-700/50 group-hover:border-cyan-500/40 transition-all duration-300 group-hover:scale-105">
          <SkillIcon name={skill.name} className="w-5 h-5 transition-transform duration-300" />
        </div>
        <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 group-hover:text-cyan-400/90 transition-colors">
          {skill.tag}
        </span>
      </div>

      <div className="relative z-10 mt-4">
        <div className="flex items-center justify-between">
          <h4 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-cyan-100 transition-colors">
            {skill.name}
          </h4>
          <span className="text-[11px] text-zinc-500 group-hover:text-zinc-400 font-mono transition-colors">
            {activeExpanded ? '− Close' : '+ Info'}
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between text-xs text-zinc-400">
          <span className="text-[11px] font-medium text-zinc-400 font-mono">
            {skill.category}
          </span>
        </div>

        {/* Expandable context drawer */}
        <div
          className={`grid transition-all duration-300 ease-out overflow-hidden ${
            activeExpanded
              ? 'grid-rows-[1fr] opacity-100 mt-3 pt-3 border-t border-zinc-800/80'
              : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {skill.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

