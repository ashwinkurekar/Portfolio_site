export interface AchievementItem {
  id: string;
  number: string;
  title: string;
  organization: string;
  category: string;
  description: string;
  awardBadge?: string;
  iconType: 'medal' | 'trophy' | 'award' | 'star' | 'flag';
  certificateUrl?: string;
}

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: 'nptel-java-silver',
    number: '01',
    title: 'Silver Certification — Programming in Java',
    organization: 'NPTEL',
    category: 'Programming & Academic Excellence',
    awardBadge: 'Silver Certification',
    description:
      'Awarded the prestigious Silver Certification in Programming in Java by NPTEL, validating advanced object-oriented programming, multithreading, abstract data models, and core Java architecture through national examination.',
    iconType: 'medal',
    certificateUrl:
      'https://drive.google.com/file/d/11F8v3YQ9vXmhvgr07V9I3fnsIjon3lNA/view?usp=sharing',
  },
  {
    id: 'google-top-prompt-creator',
    number: '02',
    title: 'Winner — Top Prompt Creator',
    organization: 'Google Student Ambassador Program',
    category: 'Generative AI & Prompt Engineering',
    awardBadge: 'Winner',
    description:
      'Recognized as Winner for Top Prompt Creator in the Google Student Ambassador Program, demonstrating exceptional prompt crafting, few-shot conditioning, and innovative generative AI problem solving.',
    iconType: 'trophy',
    certificateUrl:
      'https://drive.google.com/file/d/1y7bWbtr3LIUaj7PMbqvLmGHOyrO3jfHg/view?usp=sharing',
  },
  {
    id: 'tgpcet-national-hackathon',
    number: '03',
    title: '2nd Rank — National Level Hackathon',
    organization: 'TGPCET',
    category: 'Rapid Prototyping & Hackathons',
    awardBadge: '2nd Rank',
    description:
      'Secured 2nd Rank at the National Level Hackathon organized by Tulsiramji Gaikwad-Patil College of Engineering and Technology, engineering a full-stack technical solution within demanding hackathon timeframes.',
    iconType: 'award',
    certificateUrl:
      'https://drive.google.com/file/d/1SwmtrbBCN_Bbl6J8PYhCpLRe6EyXKame/view?usp=sharing',
  },
  {
    id: 'scivision-poster-competition',
    number: '04',
    title: 'SciVision — National Level Poster Competition',
    organization: 'National Level Academic Forum',
    category: 'Research & Technical Presentation',
    awardBadge: 'National Finalist',
    description:
      'Presented technical and scientific research at SciVision, a National Level Poster Competition, articulating complex engineering concepts and architectural solutions before a panel of academic and industry adjudicators.',
    iconType: 'star',
    certificateUrl:
      'https://drive.google.com/file/d/14aQGRaB4jrWXE2oC2EhIA3cLb5MuxBIT/view?usp=sharing',
  },
  {
    id: 'advertising-arena-2nd-rank',
    number: '05',
    title: '2nd Rank — Advertising Arena',
    organization: 'TGPCET',
    category: 'Technical Pitching & Innovation Marketing',
    awardBadge: '2nd Rank',
    description:
      'Achieved 2nd Rank in the Advertising Arena competition held at TGPCET, demonstrating strategic product positioning, creative messaging, and persuasive technical presentation delivery.',
    iconType: 'flag',
    certificateUrl:
      'https://drive.google.com/file/d/1ZTL14_eLbacuEVzp8N9oxndrgkD5QPtj/view?usp=sharing',
  },
];
