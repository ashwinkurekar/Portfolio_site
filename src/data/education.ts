export interface EducationItem {
  id: string;
  year: string;
  title: string;
  institution?: string;
  location: string;
  status: 'Completed' | 'Currently Pursuing';
  yearLevel?: string;
  branch?: string;
  degree?: string;
  description: string;
  coursework?: string[];
  iconType: 'school' | 'secondary' | 'btech';
}

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'ssc-2022',
    year: '2022',
    title: 'SSC (Secondary School Certificate)',
    institution: 'Vidya Vihar Convent High School',
    location: 'Chandrapur, Maharashtra',
    status: 'Completed',
    description:
      'Completed secondary education with a strong analytical foundation in mathematics, general science, English, and preliminary computing concepts.',
    iconType: 'school',
  },
  {
    id: 'hsc-2024',
    year: '2024',
    title: 'HSC (Higher Secondary Certificate)',
    location: 'Chandrapur, Maharashtra',
    status: 'Completed',
    description:
      'Completed higher secondary education in the science discipline, building analytical rigor across physics, chemistry, mathematics, and computational reasoning.',
    iconType: 'secondary',
  },
  {
    id: 'btech-2024-present',
    year: '2024 – Present',
    title: 'B.Tech in Information Technology',
    institution: 'Tulsiramji Gaikwad-Patil College of Engineering and Technology (TGPCET)',
    location: 'Nagpur, Maharashtra',
    status: 'Currently Pursuing',
    yearLevel: '3rd Year',
    branch: 'Information Technology',
    degree: 'B.Tech',
    description:
      'Pursuing Bachelor of Technology in Information Technology, focusing on modern web engineering, database architecture, network systems, and artificial intelligence applications.',
    coursework: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming (Java/Python)',
      'Database Management Systems',
      'Web Technologies & Full-Stack Systems',
      'Operating Systems & Computer Networks',
      'Artificial Intelligence & Cloud Computing',
    ],
    iconType: 'btech',
  },
];
