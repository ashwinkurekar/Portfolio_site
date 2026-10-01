export interface CertificationItem {
  id: string;
  number: string;
  name: string;
  title: string;
  organization: string;
  type?: string;
  description: string;
  certificateUrl?: string;
  tag: string;
  credentialBadge?: string;
}

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: 'ibm-ai-fundamentals',
    number: '01',
    name: 'Intro to AI Fundamentals',
    title: 'Intro to AI Fundamentals',
    organization: 'IBM',
    type: 'Professional Certification',
    description:
      'Foundational credential covering principles of Artificial Intelligence, cognitive computing systems, natural language processing, machine learning architectures, and neural foundations.',
    certificateUrl: '',
    tag: 'Artificial Intelligence',
    credentialBadge: 'IBM Verified',
  },
  {
    id: 'intro-generative-ai',
    number: '02',
    name: 'Intro to Generative AI',
    title: 'Intro to Generative AI',
    organization: 'Simplilearn by Google Cloud',
    type: 'Google Cloud Track',
    description:
      'Practical engineering curriculum on generative foundation models, transformer architectures, prompt engineering methodology, and multimodal AI application design backed by Google Cloud.',
    certificateUrl: '',
    tag: 'Generative AI',
    credentialBadge: 'Google Cloud Program',
  },
  {
    id: 'jpmorgan-software-engineering',
    number: '03',
    name: 'Software Engineering Job Simulation',
    title: 'Software Engineering Job Simulation',
    organization: 'JPMorgan Chase & Co.',
    type: 'Industry Simulation',
    description:
      'Completed practical engineering modules simulating financial technologies, interactive interface data streaming, perspective data feeds, and enterprise software reliability practices.',
    certificateUrl: '',
    tag: 'Software Engineering',
    credentialBadge: 'Job Simulation',
  },
  {
    id: 'google-gemini-certificate',
    number: '04',
    name: 'Google Gemini Certificate',
    title: 'Google Gemini Certificate',
    organization: 'Google',
    type: 'Specialized AI Credential',
    description:
      'Certified proficiency in utilizing Google Gemini models, multimodal prompting, API integration patterns, reasoning workflows, and context window orchestration.',
    certificateUrl: '',
    tag: 'Google AI',
    credentialBadge: 'Google Certified',
  },
  {
    id: 'eduskill-java-full-stack',
    number: '05',
    name: 'Java Full Stack',
    title: 'Java Full Stack',
    organization: 'Eduskill',
    type: 'Full-Stack Development',
    description:
      'Comprehensive full stack engineering program covering core and advanced Java, backend web services, relational database connectivity, and modern frontend client integration.',
    certificateUrl: '',
    tag: 'Full-Stack',
    credentialBadge: 'Verified Certification',
  },
  {
    id: 'eduskill-ai-cyber-security',
    number: '06',
    name: 'AI in Cyber Security',
    title: 'AI in Cyber Security',
    organization: 'Eduskill',
    type: 'Virtual Internship',
    description:
      'Hands-on virtual internship program focusing on application of machine learning in threat detection, vulnerability analysis, automated security anomaly classification, and defense strategies.',
    certificateUrl: '',
    tag: 'Cybersecurity & AI',
    credentialBadge: 'Virtual Internship',
  },
];
