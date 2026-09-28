import React from 'react';

export const initialCVData = {
  personalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    title: 'Senior Software Engineer',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    location: 'San Francisco, CA',
    website: 'www.johndoe.dev',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    photo: '',
    photoAppearance: 'circle',
    photoZoom: 1,
    photoPosX: 0,
    photoPosY: 0,
    customFields: []
  },
  summary: 'Experienced Software Engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success. Well-versed in technology and writing code to create systems that are reliable and user-friendly. Confident communicator, strategic thinker, and innovative creator to develop software that is customized to meet a company’s organizational needs, highlight their core competencies, and further their success.',
  experience: [
    {
      id: 'exp-1',
      position: 'Lead Software Engineer',
      company: 'Tech Solutions Inc.',
      location: 'San Francisco, CA',
      startDate: '2020-01',
      endDate: 'Present',
      description: '- Spearheaded the transition from a monolithic architecture to microservices, resulting in a 40% improvement in system scalability and a 20% reduction in server costs.\n- Mentored a team of 5 junior developers, improving team code-quality and accelerating the release cycle by 15%.\n- Developed and integrated comprehensive CI/CD pipelines, reducing manual deployment errors to near zero.\n- Architected a robust API layer for the mobile app, enabling a seamless cross-platform user experience for over 1M active users.'
    },
    {
      id: 'exp-2',
      position: 'Full Stack Developer',
      company: 'Creative Web Agency',
      location: 'Austin, TX',
      startDate: '2016-06',
      endDate: '2019-12',
      description: '- Engineered customized e-commerce solutions for 20+ enterprise clients, generating over $5M in combined annual revenue.\n- Optimized front-end performance, achieving a 98% Lighthouse score and decreasing page load times by 3 seconds.\n- Integrated third-party payment gateways (Stripe, PayPal) ensuring secure, compliant transaction processing.\n- Implemented automated end-to-end testing with Cypress, dramatically reducing bug reports post-release.'
    },
    {
      id: 'exp-3',
      position: 'Junior Developer',
      company: 'Startup Hub',
      location: 'Remote',
      startDate: '2014-08',
      endDate: '2016-05',
      description: '- Assisted in the development of a real-time chat application using React and WebSockets.\n- Wrote comprehensive unit tests using Jest, covering 85% of the codebase.\n- Participated in daily stand-ups and agile sprint planning, consistently delivering features ahead of schedule.\n- Refactored legacy CSS into modular SCSS, greatly improving maintainability.'
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Master of Science in Computer Science',
      school: 'Stanford University',
      city: 'Stanford, CA',
      startDate: '2012-09',
      endDate: '2014-06',
      description: 'Graduated with Honors. Specialization in Artificial Intelligence and Distributed Systems. Capstone project focused on machine learning algorithms for predictive text generation.'
    },
    {
      id: 'edu-2',
      degree: 'Bachelor of Science in Software Engineering',
      school: 'University of Texas',
      city: 'Austin, TX',
      startDate: '2008-09',
      endDate: '2012-05',
      description: 'Dean\'s List all semesters. President of the Computer Science Club.'
    }
  ],
  skills: [
    { name: 'JavaScript (ES6+)', level: 'Expert' },
    { name: 'React & Redux', level: 'Expert' },
    { name: 'Node.js', level: 'Advanced' },
    { name: 'Python', level: 'Advanced' },
    { name: 'Docker & Kubernetes', level: 'Intermediate' },
    { name: 'AWS Services', level: 'Intermediate' }
  ],
  languages: [
    { name: 'English', level: 'Native' },
    { name: 'Spanish', level: 'Fluent' },
    { name: 'French', level: 'Conversational' }
  ],
  interests: [
    'Machine Learning',
    'Open Source',
    'Hiking',
    'Photography'
  ],
  certificates: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect',
      endDate: '2022',
      description: 'Validated expertise in designing distributed systems on AWS.'
    }
  ],
  qualities: [],
  customSections: []
};

export const templateOptions = [
  { value: 'basic', label: 'Basic (Default)' },
  { value: 'timeline', label: 'Timeline' },
  { value: 'modern', label: 'Premium Modern' },
];

export const languageOptions = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'ar', flag: '🇸🇦', label: 'العربية' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'zh', flag: '🇨🇳', label: '中文' },
  { code: 'pt', flag: '🇵🇹', label: 'Português' },
  { code: 'ru', flag: '🇷🇺', label: 'Русский' },
  { code: 'ja', flag: '🇯🇵', label: '日本語' },
  { code: 'it', flag: '🇮🇹', label: 'Italiano' },
  { code: 'hi', flag: '🇮🇳', label: 'हिन्दी' },
];

export const templatePalettes = {
  timeline: {
    primary: '#059669',
    secondary: '#f8fafc',
    accent: '#134e4a',
    sidebarBg: '#fff',
    mainBg: '#fff',
    shape: '#10b981',
    timeline: '#059669',
  },
};

export const templateThumbnails = {
  basic: (
    <img src="./temp1.png" alt="Basic Template" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  ),
  timeline: (
    <img src="./temp2.png" alt="Timeline Template" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  ),
  modern: (
    <img src="./temp3.png" alt="Modern Template" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  ),
};
