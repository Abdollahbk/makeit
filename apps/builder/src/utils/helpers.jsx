import React from 'react';

export const renderDescription = (desc) => {
  if (!desc) return null;
  if (desc.includes('\n') || desc.includes('•')) {
    const lines = desc.split(/\n|•/).map(l => l.trim()).filter(Boolean);
    return (
      <ul style={{ margin: '0.5em 0 0 1.2em', padding: 0, color: 'var(--text-secondary)', fontSize: '0.97em' }}>
        {lines.map((line, i) => <li key={i}>{line}</li>)}
      </ul>
    );
  }
  return <span>{desc}</span>;
};

export const getSkillLevelPercent = (level) => {
  switch (level) {
    case 'Expert': return 1;
    case 'Advanced': return 0.8;
    case 'Intermediate': return 0.6;
    case 'Beginner': return 0.4;
    default: return 0.6;
  }
};

export const getLanguageLevelDots = (level) => {
  switch (level) {
    case 'Native': return 5;
    case 'Fluent': return 4;
    case 'Intermediate': return 3;
    case 'Conversational': return 2;
    case 'Beginner': return 1;
    default: return 3;
  }
};
