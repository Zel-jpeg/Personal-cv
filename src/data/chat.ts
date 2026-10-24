import knowledge from './chatKnowledge.json' with { type: 'json' };

export type ChatMessage = { role: 'user' | 'assistant'; content: string };
export type ChatLink = { label: string; href: string };
export type ChatReply = {
  text: string;
  source: 'portfolio' | 'ai';
  links?: ChatLink[];
  contact?: boolean;
};

export const chatGreeting =
  "Hi! I'm Zel — feel free to ask about my projects, the stack I work with, or anything else on the site.";
export const chatSuggestions = [
  'Show me your projects',
  'What is your tech stack?',
  'Tell me about yourself',
] as const;

export const chatSuggestionLabels: Record<
  (typeof chatSuggestions)[number],
  string
> = {
  'Show me your projects': 'Projects',
  'What is your tech stack?': 'Tech stack',
  'Tell me about yourself': 'About me',
};

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function isContactQuestion(text: string) {
  return (
    /\b(contact|email|message|reach you|hire|hiring|collaborat\w*|work together|available|availability|rates|pricing)\b/i.test(
      text,
    ) || /[^\s@]+@[^\s@]+\.[^\s@]+/.test(text)
  );
}

// Deterministic, public-data-only replies also work when all APIs are offline.
export function getPreparedReply(
  question: string,
  history: ChatMessage[] = [],
): ChatReply {
  const text = normalize(question);
  const base = { source: 'portfolio' as const };
  if (
    /^(hi|hello|hey|yo|good (morning|afternoon|evening))[!.\s]*$/.test(text)
  ) {
    return { ...base, text: chatGreeting };
  }
  if (/^(thanks|thank you|salamat)[!.\s]*$/.test(text)) {
    return {
      ...base,
      text: "You're welcome! Anything else you'd like to know about my work?",
    };
  }
  if (isContactQuestion(text)) {
    return {
      ...base,
      text: "Have something in mind? Leave your email and message using Send a message below. I'll reply by email. My availability and project details are best confirmed with me directly.",
      contact: true,
    };
  }
  let project = knowledge.projects.find((item) =>
    text.includes(normalize(item.name).replace(' cafe kiosk', '')),
  );
  if (!project && /\b(it|that|this|its)\b/.test(text)) {
    for (const message of history
      .filter((item) => item.role === 'user')
      .slice()
      .reverse()) {
      project = knowledge.projects.find((item) =>
        normalize(message.content).includes(
          normalize(item.name).replace(' cafe kiosk', ''),
        ),
      );
      if (project) break;
    }
  }
  if (project) {
    const links: ChatLink[] = [
      { label: 'Source code', href: project.repository },
    ];
    if ('demo' in project && project.demo)
      links.unshift({ label: 'Visit project', href: project.demo });
    if ('details' in project && project.details)
      links.unshift({ label: 'Explore project', href: project.details });
    return {
      ...base,
      text: `${project.name} is one of my projects. ${project.description} The technologies listed for it are ${project.technologies.join(', ')}.`,
      links,
    };
  }
  if (/\b(projects?|portfolio|built|work|apps?|github|repos?)\b/.test(text)) {
    return {
      ...base,
      text: `I've worked on ${knowledge.projects.map((item) => item.name).join(', ')}. Want to explore one? Ask me about it by name.`,
      links: [
        { label: 'Explore projects', href: '/projects' },
        { label: 'GitHub', href: 'https://github.com/Zel-jpeg' },
      ],
    };
  }
  if (
    /\b(stack|technolog\w*|languages?|frameworks?|skills?|tools?|react|python|java|php)\b/.test(
      text,
    )
  ) {
    return {
      ...base,
      text: `My portfolio covers ${knowledge.skillGroups.map((group) => `${group.category.toLowerCase()}: ${group.skills.join(', ')}`).join('; ')}. I choose tools based on what each project needs.`,
      links: [{ label: 'Full tech stack', href: '/tech-stack' }],
    };
  }
  if (
    /\b(educat\w*|school|college|degree|student|study|studying|course|dns[c]?)\b/.test(
      text,
    )
  ) {
    const education = knowledge.education[0];
    return {
      ...base,
      text: `I'm a fourth-year ${education.program} student at ${education.school}. My experience comes from academic and project-based development.`,
      links: [{ label: 'Education', href: '/#education' }],
    };
  }
  if (/\b(certificat\w*|cisco|ccna|credentials?)\b/.test(text)) {
    return {
      ...base,
      text: `I've completed ${knowledge.certifications.map((item) => item.title).join(' and ')} through Cisco Networking Academy. These are course completions; I don't claim to have passed the separate CCNA certification exam. Supporting documents are available on request.`,
      links: [{ label: 'View certifications', href: '/certifications' }],
      contact: true,
    };
  }
  if (/\b(community|events?|pitch\w*|present\w*|photos?)\b/.test(text)) {
    return {
      ...base,
      text: "I've taken part in presentation and pitching activities, including presenting the Sakyan website and mobile app prototype with the team. You can see those moments in Community.",
      links: [
        { label: 'Community', href: '/community' },
        { label: 'Photo gallery', href: '/events' },
      ],
    };
  }
  if (
    /\b(you|yourself|zel|azel|experience|location|based|live|about|who|introduc\w*)\b/.test(
      text,
    )
  ) {
    return {
      ...base,
      text: `I'm ${knowledge.name}, or Zel. I'm based in ${knowledge.location} and I'm a fourth-year BSIT student at Davao del Norte State College. My interests include software development, web development, UI/UX, and emerging technologies. I've been building academic and personal projects since 2022.`,
      links: [{ label: 'My profile', href: '/#profile' }],
    };
  }
  return {
    ...base,
    text: "I don't have a confirmed answer for that in my portfolio yet. You can ask about my projects, technologies, education, or send me a message for a personal reply.",
    links: [{ label: 'Browse projects', href: '/projects' }],
    contact: true,
  };
}

export function getQuickReply(question: string): ChatReply | undefined {
  const text = normalize(question).trim();
  if (
    /^(hi|hello|hey|yo|thanks|thank you|salamat)[!.\s]*$/.test(text) ||
    isContactQuestion(text) ||
    chatSuggestions.some((item) => normalize(item) === text)
  )
    return getPreparedReply(question);
  return undefined;
}
