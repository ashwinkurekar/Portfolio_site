export interface ExperienceItem {
  id: string;
  number: string;
  company: string;
  role: string;
  position: string;
  location: string;
  duration?: string;
  dates: string;
  period: string;
  mode: string;
  skills: string[];
  responsibilities: string[];
  highlights: string[];
  description: string;
  certificateUrl?: string;
  offerLetterUrl?: string;
}

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'codec-technologies',
    number: '01',
    company: 'Codec Technologies Pvt. Ltd.',
    role: 'Project Intern',
    position: 'Project Intern',
    location: 'Mumbai, Maharashtra (Virtual)',
    duration: '2 Months',
    dates: '7 Nov 2025 – 7 Jan 2026',
    period: '7 Nov 2025 – 7 Jan 2026',
    mode: 'Virtual Internship',
    skills: ['HTML', 'CSS', 'JavaScript', 'Web Development', 'Team Collaboration'],
    responsibilities: [
      'Worked on practical web development projects as part of a team, assisting with task completion.',
      'Contributed to web-based projects, gaining hands-on experience in HTML, CSS, and JavaScript.',
      'Strengthened teamwork, communication, and web development skills through collaborative project work.',
    ],
    highlights: [
      'Worked on practical web development projects as part of a team, assisting with task completion.',
      'Contributed to web-based projects, gaining hands-on experience in HTML, CSS, and JavaScript.',
      'Strengthened teamwork, communication, and web development skills through collaborative project work.',
    ],
    description:
      'Worked on practical web development projects as part of a collaborative team at Codec Technologies Pvt. Ltd., gaining hands-on experience in HTML, CSS, and JavaScript.',
    certificateUrl:
      'https://drive.google.com/file/d/1Wkpcfj6-Bn2-CUxI_raHQ4FimtC_yjMr/view?usp=sharing',
    offerLetterUrl:
      'https://drive.google.com/file/d/1ZhR_MzldXje3PwgynfTTeaIUWjr-jTqs/view?usp=sharing',
  },
  {
    id: 'alfido-tech',
    number: '02',
    company: 'Alfido Tech',
    role: 'Web Development Intern',
    position: 'Web Development Intern',
    location: 'India (Virtual)',
    duration: '1 Month',
    dates: '01 Oct – 30 Oct 2025',
    period: '01 Oct – 30 Oct 2025',
    mode: 'Virtual Internship',
    skills: ['HTML', 'CSS', 'JavaScript', 'Website Design', 'Coding Practices'],
    responsibilities: [
      'Worked on real-world web development tasks, understanding requirements and delivering assigned tasks.',
      'Created and improved web pages using HTML, CSS, and basic JavaScript.',
      'Built a stronger understanding of website design, coding practices, and teamwork.',
    ],
    highlights: [
      'Worked on real-world web development tasks, understanding requirements and delivering assigned tasks.',
      'Created and improved web pages using HTML, CSS, and basic JavaScript.',
      'Built a stronger understanding of website design, coding practices, and teamwork.',
    ],
    description:
      'Worked on real-world web development tasks at Alfido Tech, creating and enhancing web pages with HTML, CSS, and JavaScript while adhering to clean coding practices.',
    certificateUrl:
      'https://drive.google.com/file/d/1EEq3-0s16ybjS3A9PVV0LxVY4A5yiuoV/view?usp=sharing',
    offerLetterUrl:
      'https://drive.google.com/file/d/1S3t1Tq3Jkp0ViclezKeyjn2JmzUJm1Ic/view?usp=sharing',
  },
];
