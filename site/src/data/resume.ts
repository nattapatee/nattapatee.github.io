export interface SkillGroup {
  category: string
  items: string[]
}

export interface Experience {
  company: string
  role: string
  period: string
  bullets: string[]
}

export interface Education {
  degree: string
  faculty: string
  university: string
  period: string
  gpa: string
}

export interface Resume {
  name: string
  nickname: string
  role: string
  summary: string
  contact: { email: string; phone: string; line: string }
  links: { github: string; linkedin: string }
  skills: SkillGroup[]
  experience: Experience[]
  education: Education
  personal: { nationality: string; languages: string; dateOfBirth: string }
}

export const resume: Resume = {
  name: 'Nattapat Ekapobyothin',
  nickname: 'Tee',
  role: 'Software Developer',
  // TODO(tee): confirm summary — drafted from old resume objective
  summary:
    'Software developer focused on frontend and document-management systems. ' +
    'Building web applications with React, TypeScript and .NET for enterprise clients.',
  contact: {
    email: 'nattapat.ek@gmail.com',
    phone: '087-549-5690',
    line: 'neogonn',
  },
  links: {
    github: 'https://github.com/nattapatee',
    linkedin: 'https://www.linkedin.com/in/nattapat-ekapobyothin-4967a3200/',
  },
  skills: [
    {
      category: 'Languages',
      items: ['TypeScript', 'JavaScript', 'C#', 'SQL', 'VB.NET'],
    },
    {
      category: 'Frameworks',
      // TODO(tee): add newer frameworks if any (e.g. Next.js?)
      items: ['React', 'Vue.js', 'ASP.NET Core', 'Entity Framework', 'SignalR', 'jQuery'],
    },
    {
      category: 'Technologies',
      items: ['Docker', 'Node.js', 'Keycloak', 'Alfresco', 'PDF.js', 'WebTwain'],
    },
    {
      category: 'Tools',
      items: ['Git', 'GitHub Actions', 'Azure DevOps', 'Figma', 'Jira', 'IIS', 'VS Code'],
    },
  ],
  experience: [
    {
      company: 'B Circle Co., Ltd.',
      role: 'Software Developer',
      // TODO(tee): confirm still current, or add end date + newer jobs above this one
      period: 'Mar 2019 — Present',
      bullets: [
        'Built frontend and UI design for E-Document (Sarabun) system for Kasetsart University.',
        'Built frontend and UI design for the document and records management system of the Civil Aviation Authority of Thailand.',
        'Developed scan-service report web apps for DHL, Isuzu and TIP Insure.',
        'Developed Alfresco custom UI for Ngern Tid Lor and Kasikorn Securities.',
        'Developed Alfresco workflow reports, mass-approve app and Keycloak login page for PTT OR.',
        'Developed a knowledge-management web app for Apollo (oil industry).',
        'Designed web applications in Figma for custom projects; mentored interns.',
      ],
    },
  ],
  education: {
    degree: 'B.B.A. Business Information Technology',
    faculty: 'Faculty of Business Administration',
    university: 'Rajamangala University of Technology Rattanakosin',
    period: '2015 — 2019',
    gpa: '2.76',
  },
  personal: {
    nationality: 'Thai',
    languages: 'Thai (native), English (upper-intermediate)',
    dateOfBirth: '11 October 1996',
  },
}
