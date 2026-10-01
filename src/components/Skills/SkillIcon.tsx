import React from 'react';
import {
  SiC,
  SiPython,
  SiJavascript,
  SiHtml5,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiSupabase,
  SiGoogle,
  SiGit,
  SiGithub,
  SiVercel,
  SiOpenstreetmap,
  SiLeaflet,
} from 'react-icons/si';
import {
  FaJava,
  FaTerminal,
  FaBrain,
  FaWrench,
  FaCss3Alt,
  FaDatabase,
  FaMapPin,
  FaCode,
} from 'react-icons/fa6';
import { HiSparkles, HiCpuChip } from 'react-icons/hi2';

interface SkillIconProps {
  name: string;
  className?: string;
}

export const SkillIcon: React.FC<SkillIconProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'C':
      return <SiC className={className} />;
    case 'Java':
      return <FaJava className={className} />;
    case 'Python':
      return <SiPython className={className} />;
    case 'JavaScript':
      return <SiJavascript className={className} />;
    case 'HTML5':
    case 'HTML':
      return <SiHtml5 className={className} />;
    case 'CSS3':
    case 'CSS':
      return <FaCss3Alt className={className} />;
    case 'React.js':
    case 'React':
      return <SiReact className={className} />;
    case 'Next.js':
      return <SiNextdotjs className={className} />;
    case 'Node.js':
      return <SiNodedotjs className={className} />;
    case 'Supabase':
      return <SiSupabase className={className} />;
    case 'REST APIs':
      return <FaTerminal className={className} />;
    case 'Local Storage':
      return <FaDatabase className={className} />;
    case 'Google Gemini API':
      return <SiGoogle className={className} />;
    case 'Google AI Studio':
      return <HiSparkles className={className} />;
    case 'Prompt Engineering':
      return <FaBrain className={className} />;
    case 'AI App Development':
    case 'AI Application Development':
      return <HiCpuChip className={className} />;
    case 'OpenStreetMap':
      return <SiOpenstreetmap className={className} />;
    case 'MapMyIndia':
      return <FaMapPin className={className} />;
    case 'Git':
      return <SiGit className={className} />;
    case 'GitHub':
      return <SiGithub className={className} />;
    case 'Vercel':
      return <SiVercel className={className} />;
    case 'Leaflet.js':
      return <SiLeaflet className={className} />;
    case 'VS Code':
      return <FaCode className={className} />;
    default:
      return <FaWrench className={className} />;
  }
};

