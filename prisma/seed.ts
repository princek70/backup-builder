import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({});

const baseResumeData = {
  personalInfo: {
    name: 'Simmi Bhawani',
    role: 'Graphic Designer',
    email: 'info@best.site.com',
    phone: '+91 99999 99999',
    location: '123 Road, Mumbai, Maharashtra 010101, India',
    summary: 'Creative and detail-oriented Graphic Designer with 3 years of experience in visual storytelling, branding, and digital design.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250&h=250',
  },
  skills: ['Branding', 'Social Media', 'Motion Graphics', 'UI/UX Design', 'Illustration'],
  languages: ['English', 'Hindi', 'Marathi'],
  certifications: ['Adobe Certified Professional', 'Google Digital Marketing'],
  sections: [
    {
      id: 'sec-exp',
      type: 'experience',
      label: 'Experience',
      items: [
        {
          id: 'item-exp-1',
          title: 'Senior Graphic Designer',
          subtitle: 'ABC Creative Studio',
          date: 'Jan 2025 – Present',
          description: ['Lead the visual design team for high-profile client campaigns.', 'Developed brand identities and design systems for 10+ startups.', 'Optimized workflow reducing turnaround time by 20%.'],
        },
        {
          id: 'item-exp-2',
          title: 'Junior Designer',
          subtitle: 'Pixel Perfect Agency',
          date: 'June 2022 – Dec 2024',
          description: ['Assisted in digital marketing asset creation.', 'Maintained consistency across multiple client brand guides.'],
        },
      ],
    },
    {
      id: 'sec-edu',
      type: 'education',
      label: 'Education',
      items: [
        {
          id: 'item-edu-1',
          title: 'Bachelor of Design (Graphic Design)',
          subtitle: 'National Institute of Design (NID)',
          date: '2018 – 2022',
          description: ['GPA: 3.8/4.0', 'Specialized in visual communication and experimental typography.'],
        },
      ],
    },
    {
      id: 'sec-proj',
      type: 'projects',
      label: 'Projects',
      items: [
        {
          id: 'item-proj-1',
          title: 'Brand Refresh: Local Bistro',
          subtitle: 'Identity Design',
          date: '2024',
          description: ['Redesigned full brand suite including logo, menus, and signage.', 'Increased social media engagement by 45% post-launch.'],
        },
      ],
    },
  ],
};

const executiveData = {
  ...baseResumeData,
  personalInfo: {
    name: 'Maxwell Prime',
    role: 'Executive Director',
    email: 'hello@maxprime.com',
    phone: '123.456.7890',
    location: 'New York, NY',
    summary: 'Strategic executive with over 15 years translating business challenges into actionable operational strategies. Specializes in aligning cross-functional teams with enterprise goals.',
    avatarUrl: '', // No avatar for executive
  },
  skills: ['Leadership', 'Strategic Planning', 'P&L Management', 'Process Optimization', 'M&A Negotiation'],
  sections: [
    {
      id: 'sec-exp',
      type: 'experience',
      label: 'EXPERIENCE',
      items: [
        {
          id: 'item-exp-1',
          title: 'VP of Operations',
          subtitle: 'Global Metrics Inc.',
          date: 'May 2017 - Present',
          description: [
            'Analyzed overarching performance challenges and created strategic pivots resulting in a 25% revenue increase.',
            'Designed enterprise-wide KPIs for department leads, driving efficiency and accountability.',
            'Orchestrated a successful merger with a primary competitor, integrating 400+ personnel seamlessly.',
          ],
        },
        {
          id: 'item-exp-2',
          title: 'Director of Strategy',
          subtitle: 'Mainyard International',
          date: 'March 2010 - April 2017',
          description: [
            'Created operational prototypes for international branches.',
            'Collaborated directly with the CEO to format and pitch board proposals.',
            'Helped develop structural restructuring campaigns for special global projects.',
          ],
        },
      ],
    },
    {
      id: 'sec-edu',
      type: 'education',
      label: 'EDUCATION',
      items: [
        {
          id: 'item-edu-1',
          title: 'Master of Business Administration',
          subtitle: 'University of San Jose',
          date: 'May 2010',
          description: ['Graduated top 5% of class, focus on Organizational Leadership.'],
        },
      ],
    },
  ],
};

const creativeData = {
  ...baseResumeData,
  personalInfo: {
    name: 'Radhika Huber',
    role: 'Creative Director',
    email: 'huber@resumeemail.site',
    phone: '(555) 555-5555',
    location: 'Shasta, TX',
    summary: 'I am a highly creative person, passionate about digital marketing. Over the past 4 years, I have built my own digital channel with over 200k subscribers. This experience has allowed me to develop deep knowledge of how marketing channels work.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&h=250',
  },
  skills: ['Content Creation', 'Illustration', 'Photography', 'Video Editing', 'Brand Strategy', 'Adobe Creative Suite'],
  sections: [
    {
      id: 'sec-exp',
      type: 'experience',
      label: 'WORK EXPERIENCE',
      items: [
        {
          id: 'item-exp-1',
          title: 'Digital Content Creator',
          subtitle: 'Self-Employed (200k Subscribers)',
          date: '2021 - Present',
          description: ['Develop, edit, and publish weekly high-quality video content.', 'Negotiate and execute brand sponsorships with Fortune 500 tech companies.', 'Design all channel illustration and graphic assets.'],
        },
        {
          id: 'item-exp-2',
          title: 'Marketing Specialist',
          subtitle: 'Frosty Media Group - Shasta, TX',
          date: '2019 - 2021',
          description: ['Ideated and produced marketing collateral for 12 local businesses.', 'Managed a $40k quarterly ad spend across social platforms.'],
        },
      ],
    },
    {
      id: 'sec-edu',
      type: 'education',
      label: 'EDUCATION',
      items: [
        {
          id: 'item-edu-1',
          title: 'B.F.A in Graphic Design',
          subtitle: 'Misty Lake University',
          date: '2015 - 2019',
          description: ['Summa Cum Laude', 'Minor in Digital Photography'],
        },
      ],
    },
  ],
};

const minimalistData = {
  ...baseResumeData,
  personalInfo: {
    name: 'Vinkur Vaibhav',
    role: 'Full Stack Engineer',
    email: 'vinkur@resume.site.com',
    phone: '+91 9XXXX-9XXXX',
    location: '123 Tech Road, Mumbai',
    summary: 'I am a qualified and professional web developer with five years of experience in database administration and website design. Strong creative and analytical skills. Team player with an eye for detail and scalable architectures.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&h=250',
  },
  skills: ['Web Design', 'Design Thinking', 'Wireframe Creation', 'React / Next.js', 'Backend Tech', 'TypeScript', 'Prisma', 'PostgreSQL'],
  sections: [
    {
      id: 'sec-exp',
      type: 'experience',
      label: 'EXPERIENCE',
      items: [
        {
          id: 'item-exp-1',
          title: 'Application Developer',
          subtitle: 'Tech Global Scale Inc.',
          date: '2022 - Present',
          description: [
            'Built the logic for a streamlined ad-serving platform that scaled to 2M+ active daily users.',
            'Database administration and website design for high-availability enterprise services.',
            'Spearheaded the migration from REST to GraphQL, reducing payload size by 40%.',
          ],
        },
        {
          id: 'item-exp-2',
          title: 'Web Content Manager',
          subtitle: 'Random Data Company',
          date: '2019 - 2022',
          description: [
            'Educational institutions and online classroom management system development.',
            'Engineered responsive UI components using modern frontend tooling.',
          ],
        },
      ],
    },
    {
      id: 'sec-edu',
      type: 'education',
      label: 'EDUCATION',
      items: [
        {
          id: 'item-edu-1',
          title: 'Bachelor of Technology',
          subtitle: 'Random University',
          date: '2015 - 2019',
          description: ['Major in Computer Science', 'Awarded Best Final Year Project'],
        },
      ],
    },
  ],
};

const formalData = {
  ...baseResumeData,
  personalInfo: {
    name: 'Saksham Sharma',
    role: 'Aspiring ML Engineer',
    email: 'saksham@example.com',
    phone: '+91 9876543210',
    location: 'New Delhi, India',
    summary: 'Motivated B.Tech CSE student with hands-on experience in Machine Learning and AI-driven applications. Skilled in building and training models using TensorFlow and scikit-learn. Quick learner with a strong analytical mindset, ready to contribute to impactful ML solutions.',
    avatarUrl: '', // No avatar for formal
  },
  skills: ['Generative AI', 'Google Vertex AI', 'Machine Learning', 'Deep Learning', 'React', 'Node.js', 'Python', 'DSA'],
  sections: [
    {
      id: 'sec-edu',
      type: 'education',
      label: 'EDUCATION',
      items: [
         {
           id: 'item-edu-1',
           title: 'B.Tech Computer Science & Engineering',
           subtitle: 'G.L. Bajaj Institute of Technology',
           date: '2024 - 2028',
           description: []
         },
         {
           id: 'item-edu-2',
           title: 'Intermediate (12th)',
           subtitle: 'Ryan International School - CBSE',
           date: '2024',
           description: ['91%']
         }
      ]
    },
    {
       id: 'sec-proj',
       type: 'projects',
       label: 'PROJECTS',
       items: [
         {
           id: 'proj-1',
           title: 'Saksham AI — Skilling Platform for Women in India',
           subtitle: 'Demo',
           date: '2025',
           description: ['Built a full-stack AI platform providing career guidance, Hindi voice-first onboarding.', 'Integrated Google Vertex AI and Groq for fast bilingual AI chat.', 'Stack: React, Node.js, MongoDB Atlas, AWS EC2']
         }
       ]
    }
  ]
};

async function main() {
  await prisma.landingContent.upsert({
    where: { id: 1 },
    update: {},
    create: {},
  });

  const defaults: Record<string, string> = {
    site_name: 'ArchitectAI',
    footer_copyright: '© 2024 Intelligent Architect. Precision Editorial.',
    contact_email: 'hello@architectai.dev',
  };

  for (const [key, value] of Object.entries(defaults)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: {},
      create: { key, value },
    });
  }

  const templates = [
    {
      id: 1,
      name: 'Priya Desai Style',
      thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop',
      category: 'Modern',
      isMaster: true,
      profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&h=250',
      data: JSON.stringify({ 
        ...baseResumeData, 
        personalInfo: { ...baseResumeData.personalInfo, name: 'Priya Desai', role: 'Product Manager', email: 'priya.desai@example.com' },
        activeTemplateId: 'template1' 
      }),
    },
    {
      id: 2,
      name: 'Executive Minimal',
      thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
      category: 'Corporate',
      isMaster: true,
      profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&h=250',
      data: JSON.stringify({ 
        ...baseResumeData, 
        personalInfo: { ...baseResumeData.personalInfo, name: 'David Chen', role: 'Financial Controller', email: 'd.chen@example.com' },
        activeTemplateId: 'template2' 
      }),
    },
    {
      id: 3,
      name: 'Creative Tech',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
      category: 'Creative',
      isMaster: true,
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&h=250',
      data: JSON.stringify({ 
        ...baseResumeData, 
        personalInfo: { ...baseResumeData.personalInfo, name: 'Alex Rivera', role: 'UX/UI Designer', email: 'arivera@example.com' },
        activeTemplateId: 'template3' 
      }),
    },
    {
      id: 4,
      name: 'Professional Minimalist',
      thumbnail: 'https://images.unsplash.com/photo-1616198814651-e71f960c3180?auto=format&fit=crop&w=600&q=80',
      category: 'Minimal',
      isMaster: true,
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=250&h=250',
      data: JSON.stringify({ 
        ...baseResumeData, 
        personalInfo: { ...baseResumeData.personalInfo, name: 'Simmi Bhawani', role: 'Graphic Designer', email: 'info@best.site.com', avatarUrl: '' },
        activeTemplateId: 'template1' // Using template1 styles as fallback for ID 4
      }),
    },
    {
      id: 5,
      name: 'Modern Professional',
      thumbnail: 'https://images.unsplash.com/photo-1586281380117-5a14c2f42a6c?auto=format&fit=crop&w=600&q=80',
      category: 'Modern',
      isMaster: true,
      profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&h=250',
      data: JSON.stringify({ 
        ...baseResumeData, 
        personalInfo: { ...baseResumeData.personalInfo, name: 'Sarah Jenkins', role: 'Marketing Director', email: 'sarah.j@example.com' },
        activeTemplateId: 'template5' 
      }),
    },
    {
      id: 6,
      name: 'Modern Executive',
      thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      category: 'Executive',
      isMaster: true,
      profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&h=250',
      data: JSON.stringify({ ...baseResumeData, activeTemplateId: 'template6' }),
    },
    {
      id: 7,
      name: 'Creative Portfolio',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80',
      category: 'Creative',
      isMaster: true,
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&h=250',
      data: JSON.stringify({ ...baseResumeData, activeTemplateId: 'template7' }),
    },
    {
      id: 8,
      name: 'Minimalist Tech',
      thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
      category: 'Tech',
      isMaster: true,
      profileImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&h=250',
      data: JSON.stringify({ ...baseResumeData, activeTemplateId: 'template8' }),
    },
    {
      id: 9,
      name: 'Formal Academic',
      thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
      category: 'Academic',
      isMaster: true,
      profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&h=250',
      data: JSON.stringify({ ...baseResumeData, activeTemplateId: 'template9' }),
    },
  ];

  for (const template of templates) {
    await prisma.template.upsert({
      where: { id: template.id },
      update: template,
      create: template,
    });
  }

  console.log('✅ Database seeded successfully with EXACTLY 9 optimized master templates (IDs 1-9)');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
