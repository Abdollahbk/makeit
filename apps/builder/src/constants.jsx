import React from 'react';

export const initialCVData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    photo: '',
    photoAppearance: 'circle',
    photoZoom: 1,
    photoPosX: 0,
    photoPosY: 0,
    customFields: []
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  languages: [],
  interests: [],
  certificates: [],
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
    <img src="/temp1.png" alt="Basic Template" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  ),
  timeline: (
    <img src="/temp2.png" alt="Timeline Template" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  ),
  modern: (
    <img src="/temp3.png" alt="Modern Template" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  ),
};
