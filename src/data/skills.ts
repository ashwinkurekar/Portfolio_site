export interface SkillItem {
  name: string;
  category: 'Programming' | 'Frontend' | 'Backend' | 'AI' | 'Tools';
  tag: string;
  description: string;
  icon: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'Programming',
    title: 'Programming',
    description: 'Foundational languages for algorithmic problem-solving and software development.',
    skills: [
      {
        name: 'C',
        category: 'Programming',
        tag: 'Systems & Logic',
        description: 'Memory management, pointers, and foundational data structures.',
        icon: 'SiC',
      },
      {
        name: 'Java',
        category: 'Programming',
        tag: 'NPTEL Silver Elite',
        description: 'Object-oriented architecture, collection frameworks, and concurrent execution.',
        icon: 'FaJava',
      },
      {
        name: 'Python',
        category: 'Programming',
        tag: 'AI & Scripting',
        description: 'Data manipulation, algorithmic scripting, and AI model orchestration.',
        icon: 'SiPython',
      },
      {
        name: 'JavaScript',
        category: 'Programming',
        tag: 'Modern ESNext',
        description: 'Asynchronous event-driven development, DOM interaction, and modern web logic.',
        icon: 'SiJavascript',
      },
    ],
  },
  {
    id: 'Frontend',
    title: 'Frontend',
    description: 'Modern component-driven interfaces, responsive design, and fluid user experiences.',
    skills: [
      {
        name: 'HTML5',
        category: 'Frontend',
        tag: 'Semantic Web',
        description: 'Accessible DOM structures, SEO semantic elements, and modern web standards.',
        icon: 'SiHtml5',
      },
      {
        name: 'CSS3',
        category: 'Frontend',
        tag: 'Modern Layouts',
        description: 'Advanced responsive layouts, CSS grid, flexbox, transitions, and keyframe animations.',
        icon: 'SiCss3',
      },
      {
        name: 'React.js',
        category: 'Frontend',
        tag: 'Components & Hooks',
        description: 'Functional component architecture, custom reactive hooks, and state management.',
        icon: 'SiReact',
      },
      {
        name: 'Next.js',
        category: 'Frontend',
        tag: 'React Framework',
        description: 'Modern full-stack routing, optimized rendering patterns, and client-side transitions.',
        icon: 'SiNextdotjs',
      },
    ],
  },
  {
    id: 'Backend',
    title: 'Backend',
    description: 'Application services, API communication, and persistent storage solutions.',
    skills: [
      {
        name: 'Node.js',
        category: 'Backend',
        tag: 'Async Runtime',
        description: 'Event-loop execution, HTTP service handling, and server-side utilities.',
        icon: 'SiNodedotjs',
      },
      {
        name: 'Supabase',
        category: 'Backend',
        tag: 'BaaS & Database',
        description: 'Cloud storage, real-time data sync, and managed database integrations.',
        icon: 'SiSupabase',
      },
      {
        name: 'REST APIs',
        category: 'Backend',
        tag: 'Architecture & Endpoints',
        description: 'Standardized HTTP methods, JSON data exchange, and endpoint integration.',
        icon: 'TbApi',
      },
      {
        name: 'Local Storage',
        category: 'Backend',
        tag: 'Browser Persistence',
        description: 'Client-side data caching, offline state handling, and session persistence.',
        icon: 'FaDatabase',
      },
    ],
  },
  {
    id: 'AI',
    title: 'AI & GenAI',
    description: 'Multimodal foundation models, prompt engineering, and intelligent application layers.',
    skills: [
      {
        name: 'Google Gemini API',
        category: 'AI',
        tag: 'Multimodal SDK',
        description: 'Integration of Gemini models for multimodal perception, reasoning, and synthesis.',
        icon: 'SiGoogle',
      },
      {
        name: 'Google AI Studio',
        category: 'AI',
        tag: 'Prototyping & System Prompts',
        description: 'Fast prototyping, structured system instruction testing, and temperature calibration.',
        icon: 'HiSparkles',
      },
      {
        name: 'Prompt Engineering',
        category: 'AI',
        tag: 'Context & Guardrails',
        description: 'Winner: Top Prompt Creator in Google Student Ambassador Program; systematic instruction design.',
        icon: 'TbPrompt',
      },
      {
        name: 'AI App Development',
        category: 'AI',
        tag: 'Applied Solutions',
        description: 'Designing end-to-end applications powered by conversational and analytical AI.',
        icon: 'HiCpuChip',
      },
    ],
  },
  {
    id: 'Tools',
    title: 'Tools & Technologies',
    description: 'Geospatial mapping platforms, version control, and modern developer tooling.',
    skills: [
      {
        name: 'OpenStreetMap',
        category: 'Tools',
        tag: 'Geospatial Data',
        description: 'Open collaborative mapping data, geospatial tiles, and open geographic coordinates.',
        icon: 'SiOpenstreetmap',
      },
      {
        name: 'MapMyIndia',
        category: 'Tools',
        tag: 'Location APIs',
        description: 'Indian geospatial APIs, reverse geocoding, route optimization, and navigation layers.',
        icon: 'FaMapPin',
      },
      {
        name: 'Git',
        category: 'Tools',
        tag: 'Version Control',
        description: 'Distributed version control, branching models, and collaborative merge workflows.',
        icon: 'SiGit',
      },
      {
        name: 'GitHub',
        category: 'Tools',
        tag: 'Repositories & CI',
        description: 'Remote repository management, code reviews, issues, and project releases.',
        icon: 'SiGithub',
      },
      {
        name: 'Vercel',
        category: 'Tools',
        tag: 'Cloud Deployment',
        description: 'Continuous integration, instant previews, edge delivery, and web app hosting.',
        icon: 'SiVercel',
      },
      {
        name: 'Leaflet.js',
        category: 'Tools',
        tag: 'Interactive Maps',
        description: 'Mobile-friendly interactive map controls, custom marker pins, and polyline routing.',
        icon: 'SiLeaflet',
      },
    ],
  },
];
