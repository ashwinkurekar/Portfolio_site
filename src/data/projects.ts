export interface Project {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveDemoUrl: string;
  imageUrl: string;
  highlights: string[];
  category: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 'nutriplus-ai',
    number: '01',
    name: 'NutriPlus AI',
    tagline: 'Intelligent Nutrition & Wellness Advisory Engine',
    description:
      'An AI-powered nutrition and wellness platform providing personalized recommendations based on lifestyle, dietary preferences and user inputs.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Gemini API', 'Vite', 'Local Storage'],
    githubUrl: 'https://github.com/ashwinkurekar',
    liveDemoUrl: '#',
    imageUrl: '/images/project_nutriplus_ai_1790240976398.jpg',
    highlights: [
      'Tailored dietary regimens adapted dynamically to individual caloric goals',
      'Context-aware Gemini API prompting for nutritional ingredient breakdown',
      'Client-side persistence with responsive meal planning dashboards',
    ],
    category: 'Artificial Intelligence / Healthcare',
  },
  {
    id: 'deepfake-detector',
    number: '02',
    name: 'Deepfake Video & Image Detector',
    tagline: 'Forensic Authenticity Assessment & Media Verification',
    description:
      'An AI-assisted forensic platform designed to analyze images and videos and provide understandable authenticity assessments and forensic reports.',
    technologies: ['React', 'TypeScript', 'AI', 'Computer Vision', 'Generative AI'],
    githubUrl: 'https://github.com/ashwinkurekar',
    liveDemoUrl: '#',
    imageUrl: '/images/project_deepfake_detector_1790240987749.jpg',
    highlights: [
      'Awarded 2nd Prize at the National Vibe Coding Competition',
      'Multi-layer forensic scoring detecting subtle facial artifact distortions',
      'Structured diagnostic reports highlighting confidence indices and anomalies',
    ],
    category: 'Computer Vision / Security',
  },
  {
    id: 'nirbhay-navigator',
    number: '03',
    name: 'Nirbhay Navigator',
    tagline: 'Safeguard Urban Routing & Emergency Transit Assistant',
    description:
      'A women-safety navigation concept designed to help users identify safer routes using location-based safety information and provide rapid emergency assistance.',
    technologies: ['React', 'TypeScript', 'Maps', 'Supabase', 'Geolocation'],
    githubUrl: 'https://github.com/ashwinkurekar',
    liveDemoUrl: '#',
    imageUrl: '/images/project_nirbhay_navigator_1790241000395.jpg',
    highlights: [
      'Crowdsourced route illumination indexing and real-time transit telemetry',
      'One-tap SOS dispatch with precise geolocation coordinates broadcasting',
      'Interactive risk-tier route computation avoiding poorly-lit corridors',
    ],
    category: 'Civic Tech / Geolocation',
  },
  {
    id: 'smart-drainage',
    number: '04',
    name: 'Smart Drainage Management System',
    tagline: 'Urban Hydrological Monitoring & Flood Hazard Mitigation',
    description:
      'A smart-city concept designed to identify waterlogging-prone areas and improve drainage monitoring and response.',
    technologies: ['Web Development', 'Maps', 'Data Visualization', 'AI/Analytics'],
    githubUrl: 'https://github.com/ashwinkurekar',
    liveDemoUrl: '#',
    imageUrl: '/images/project_smart_drainage_1790241019967.jpg',
    highlights: [
      'Real-time municipal sensor mapping for low-lying urban choke points',
      'Predictive waterlogging risk analytics based on precipitation forecasts',
      'Clear municipal command dashboards for rapid civic maintenance routing',
    ],
    category: 'Smart Cities / IoT Analytics',
  },
];
