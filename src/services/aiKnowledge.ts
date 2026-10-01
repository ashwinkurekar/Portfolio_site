import { PROFILE_DATA } from '../data/profile';
import { PROJECTS_DATA } from '../data/projects';
import { SKILL_CATEGORIES } from '../data/skills';
import { EXPERIENCE_DATA } from '../data/experience';
import { CERTIFICATIONS_DATA } from '../data/certifications';
import { ACHIEVEMENTS_DATA } from '../data/achievements';
import { siteConfig } from '../config/site';

export function getSystemPrompt(): string {
  const projectsSummary = PROJECTS_DATA.map(
    (p) =>
      `• ${p.name} (${p.category}): ${p.description}. Tech: ${p.technologies.join(', ')}. Highlights: ${p.highlights.join('; ')}`
  ).join('\n');

  const skillsSummary = SKILL_CATEGORIES.map(
    (c) =>
      `• ${c.title}: ${c.skills.map((s) => `${s.name} [${s.tag} - ${s.description}]`).join('; ')}`
  ).join('\n');

  const experienceSummary = EXPERIENCE_DATA.map(
    (e) =>
      `• ${e.company} — ${e.position} (${e.dates}, ${e.location}, ${e.duration || 'Virtual'}): ${e.responsibilities.join('; ')}`
  ).join('\n');

  const certsSummary = CERTIFICATIONS_DATA.map(
    (c) => `• ${c.number}. ${c.title} by ${c.organization} (${c.type || 'Certification'}) — ${c.description}`
  ).join('\n');

  const achievementsSummary = ACHIEVEMENTS_DATA.map(
    (a) => `• ${a.number}. ${a.title} (${a.organization}) — ${a.category}. Details: ${a.description}`
  ).join('\n');

  return `You are "Ashwin AI" (or "AK AI"), the personal AI portfolio assistant for Ashwin Kurekar.
Your role is to answer questions from visitors, recruiters, and collaborators about Ashwin's background, branch, projects, skills, education, internship experience, achievements, and contact information.

IMPORTANT GUIDELINES:
1. ONLY use the verified facts provided below. NEVER invent skills, degrees, companies, projects, awards, or statistics.
2. Maintain a professional, articulate, helpful, and technically proficient persona.
3. Keep responses concise, clear, and easy to read using markdown bullet points and formatting where appropriate.
4. Ashwin's branch is Information Technology (IT). If someone asks what Ashwin studies, state that Ashwin is a third-year B.Tech Information Technology student at Tulsiramji Gaikwad-Patil College of Engineering and Technology in Nagpur, Maharashtra. If asked for his branch, answer "Information Technology (IT)." NEVER refer to Computer Science Engineering or CSE.
5. If asked something outside Ashwin's portfolio (e.g. general trivia, unrelated tasks), politely guide the user back to asking about Ashwin's work, projects, skills, or collaboration opportunities.
6. If asked how to contact Ashwin, provide his verified email (${siteConfig.email}) and mention the Contact section or LinkedIn link.

VERIFIED FACTS ABOUT ASHWIN KUREKAR:
- Full Name: ${PROFILE_DATA.name}
- Title / Role: ${PROFILE_DATA.role}
- Branch: Information Technology (IT)
- Status: Third Year
- Location: ${PROFILE_DATA.location}
- College: ${PROFILE_DATA.institution}
- Degree: ${PROFILE_DATA.degree} (${PROFILE_DATA.currentYear}, ${PROFILE_DATA.period})
- Bio: ${PROFILE_DATA.bio}
- Email: ${siteConfig.email}
- GitHub: ${siteConfig.links.github}
- LinkedIn: ${siteConfig.links.linkedin}

PROJECTS:
${projectsSummary}

SKILLS & TECHNOLOGIES:
${skillsSummary}

INTERNSHIP EXPERIENCE:
${experienceSummary}

ACHIEVEMENTS & AWARDS:
${achievementsSummary}

CERTIFICATIONS:
${certsSummary}
`;
}

export function getLocalFallbackAnswer(query: string): string {
  const q = query.toLowerCase().trim();

  // Branch & Study questions
  if (
    q.includes('branch') ||
    q.includes('which branch') ||
    q.includes('what branch') ||
    q.includes('specialization') ||
    q.includes('stream')
  ) {
    return `Information Technology (IT).`;
  }

  if (
    q.includes('what does ashwin study') ||
    q.includes('what does he study') ||
    q.includes('what is he studying') ||
    q.includes('what do you study') ||
    q.includes('field of study')
  ) {
    return `Ashwin is a third-year B.Tech Information Technology student at Tulsiramji Gaikwad-Patil College of Engineering and Technology in Nagpur, Maharashtra.`;
  }

  // About / Who is Ashwin
  if (
    q.includes('who is') ||
    q.includes('about') ||
    q.includes('background') ||
    q.includes('introduce') ||
    q.includes('bio') ||
    q === 'hi' ||
    q === 'hello' ||
    q === 'hey'
  ) {
    return `**Ashwin Kurekar** is a third-year B.Tech Information Technology student, developer, and AI enthusiast at **${PROFILE_DATA.institution}** in Nagpur, Maharashtra.\n\nHe is passionate about software development, artificial intelligence, modern web technologies and building practical digital products. He has engineered multiple production-ready prototypes including **NutriPlus AI**, **Deepfake Video & Image Detector**, **Nirbhay Navigator**, and **Smart Drainage Management System**.`;
  }

  // Education
  if (
    q.includes('education') ||
    q.includes('college') ||
    q.includes('university') ||
    q.includes('degree') ||
    q.includes('study') ||
    q.includes('ssc') ||
    q.includes('hsc') ||
    q.includes('school')
  ) {
    return `**Scholastic Education Timeline:**\n\n1. **B.Tech in Information Technology (Currently Pursuing | 3rd Year)**\n   • **Institution:** ${PROFILE_DATA.institution} (TGPCET)\n   • **Timeline:** 2024 – Present\n   • **Location:** Nagpur, Maharashtra\n   • **Branch:** Information Technology (IT)\n\n2. **HSC (Higher Secondary Certificate)**\n   • **Timeline:** 2024\n   • **Location:** Chandrapur, Maharashtra\n\n3. **SSC (Secondary School Certificate)**\n   • **Institution:** Vidya Vihar Convent High School\n   • **Timeline:** 2022\n   • **Location:** Chandrapur, Maharashtra`;
  }

  // Projects
  if (q.includes('nutriplus')) {
    const p = PROJECTS_DATA.find((item) => item.id === 'nutriplus-ai')!;
    return `**${p.name}** (${p.tagline})\n\n${p.description}\n\n• **Tech Stack:** ${p.technologies.join(', ')}\n• **Key Highlights:**\n${p.highlights.map((h) => `  - ${h}`).join('\n')}`;
  }

  if (q.includes('deepfake')) {
    const p = PROJECTS_DATA.find((item) => item.id === 'deepfake-detector')!;
    return `**${p.name}** (${p.tagline})\n\n${p.description}\n\n• **Category:** ${p.category}\n• **Tech Stack:** ${p.technologies.join(', ')}\n• **Key Highlights:**\n${p.highlights.map((h) => `  - ${h}`).join('\n')}`;
  }

  if (q.includes('nirbhay') || q.includes('safety') || q.includes('safe route')) {
    const p = PROJECTS_DATA.find((item) => item.id === 'nirbhay-navigator')!;
    return `**${p.name}** (${p.tagline})\n\n${p.description}\n\n• **Tech Stack:** ${p.technologies.join(', ')}\n• **Key Highlights:**\n${p.highlights.map((h) => `  - ${h}`).join('\n')}`;
  }

  if (q.includes('drainage') || q.includes('flood') || q.includes('smart city')) {
    const p = PROJECTS_DATA.find((item) => item.id === 'smart-drainage')!;
    return `**${p.name}** (${p.tagline})\n\n${p.description}\n\n• **Tech Stack:** ${p.technologies.join(', ')}\n• **Key Highlights:**\n${p.highlights.map((h) => `  - ${h}`).join('\n')}`;
  }

  if (q.includes('project') || q.includes('work') || q.includes('portfolio')) {
    return `Here are Ashwin's primary featured projects:\n\n1. **NutriPlus AI:** Intelligent AI-assisted nutrition advisory engine built with React, TypeScript & Gemini API.\n2. **Deepfake Video & Image Detector:** Forensic authenticity analysis platform for image and video integrity.\n3. **Nirbhay Navigator:** Women-safety urban transit and safe routing application with risk-tier analytics.\n4. **Smart Drainage Management System:** Municipal hydrological sensing and waterlogging risk visualization system.\n\nYou can explore each project with full details in the **Projects** section!`;
  }

  // Skills
  if (
    q.includes('skill') ||
    q.includes('tech') ||
    q.includes('language') ||
    q.includes('stack') ||
    q.includes('python') ||
    q.includes('java') ||
    q.includes('react')
  ) {
    return `Ashwin's core technical toolkit includes:\n\n• **Languages:** C, Java, Python, JavaScript\n• **Frontend Development:** HTML5, CSS3, React.js, Next.js\n• **Backend & Database:** Node.js, Supabase, REST APIs, Local Storage\n• **AI & GenAI:** Google Gemini API, Google AI Studio, Prompt Engineering, AI App Development\n• **Tools & Technologies:** OpenStreetMap, MapMyIndia, Git, GitHub, Vercel, Leaflet.js`;
  }

  // Internship Experience
  if (q.includes('experience') || q.includes('intern') || q.includes('job') || q.includes('company') || q.includes('work experience')) {
    return `**Internship Experience:**\n\n1. **Codec Technologies Pvt. Ltd.** — Project Intern\n   • **Location:** Mumbai, Maharashtra (Virtual)\n   • **Duration:** 2 Months (7 Nov 2025 – 7 Jan 2026)\n   • **Responsibilities:**\n     - Worked on practical web development projects as part of a team, assisting with task completion.\n     - Contributed to web-based projects, gaining hands-on experience in HTML, CSS, and JavaScript.\n     - Strengthened teamwork, communication, and web development skills through collaborative project work.\n\n2. **Alfido Tech** — Web Development Intern\n   • **Location:** India (Virtual)\n   • **Dates:** 01 Oct – 30 Oct 2025\n   • **Responsibilities:**\n     - Worked on real-world web development tasks, understanding requirements and delivering assigned tasks.\n     - Created and improved web pages using HTML, CSS, and basic JavaScript.\n     - Built a stronger understanding of website design, coding practices, and teamwork.`;
  }

  // Certifications
  if (q.includes('certification') || q.includes('certificate') || q.includes('credential')) {
    return `**Verified Certifications:**\n\n1. **Intro to AI Fundamentals** — IBM\n2. **Intro to Generative AI** — Simplilearn by Google Cloud\n3. **Software Engineering Job Simulation** — JPMorgan Chase & Co.\n4. **Google Gemini Certificate** — Google\n5. **Java Full Stack** — Eduskill\n6. **AI in Cyber Security** — Eduskill (Virtual Internship)`;
  }

  // Achievements & Awards
  if (q.includes('achievement') || q.includes('award') || q.includes('competition') || q.includes('prize') || q.includes('hackathon')) {
    return `**Achievements & Awards:**\n\n1. **Silver Certification — Programming in Java** | NPTEL\n2. **Winner — Top Prompt Creator** | Google Student Ambassador Program\n3. **2nd Rank — National Level Hackathon** | TGPCET\n4. **SciVision — National Level Poster Competition**\n5. **2nd Rank — Advertising Arena** | TGPCET`;
  }

  // Contact
  if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('message')) {
    return `You can connect with Ashwin through the following channels:\n\n• **Email:** [${siteConfig.email}](mailto:${siteConfig.email})\n• **LinkedIn:** [LinkedIn Profile](${siteConfig.links.linkedin})\n• **GitHub:** [GitHub Profile](${siteConfig.links.github})\n• **Contact Form:** You can also send a direct message via the **Contact** section at the bottom of the page!`;
  }

  // Fallback guidance
  return `I am Ashwin's Portfolio AI Assistant. You can ask me anything about:\n\n• **Ashwin's branch & education** (B.Tech Information Technology at ${PROFILE_DATA.institution})\n• **Internship Experience** (Codec Technologies Pvt. Ltd., Alfido Tech)\n• **Achievements & Awards** (NPTEL Silver Certification, Google Student Ambassador Winner, TGPCET Hackathon 2nd Rank, SciVision, Advertising Arena)\n• **Certifications** (IBM, Google Cloud, JPMorgan Chase, Gemini, Eduskill)\n• **Key Projects** (NutriPlus AI, Deepfake Detector, Nirbhay Navigator, Smart Drainage)\n• **Technical Skills & Tools**\n• **Contact & Collaboration Details**\n\nWhat would you like to know?`;
}
