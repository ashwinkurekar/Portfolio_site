export interface Project {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveDemoUrl: string;
  highlights?: string[];
  accentColor?: string;
  category?: string;
}

export interface SkillItem {
  name: string;
  category: string;
  iconName: string;
  level?: string;
  description?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  type: string;
  period: string;
  skills: string[];
  summary: string;
  responsibilities: string[];
  certificateUrl?: string;
  offerLetterUrl?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  organization: string;
  year: string;
  description: string;
  certificateUrl: string;
  skillsGained: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  event: string;
  award: string;
  project?: string;
  description: string;
  year: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  currentStatus: string;
  location: string;
  highlights: string[];
}

export interface ProfileInfo {
  name: string;
  initials: string;
  role: string;
  location: string;
  institution: string;
  degree: string;
  period: string;
  currentYear: string;
  bio: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
  stats: {
    label: string;
    value: string;
    sublabel: string;
  }[];
}
