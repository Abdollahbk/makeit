import React from 'react';

const SkillCircle = ({ label, percent, color = '#f7b267', size = 64, stroke = 7 }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - percent);
  return (
    <svg width={size} height={size} style={{ margin: 6 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="#f5f4f1" stroke="#eee" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" />
      <text x="50%" y="48%" textAnchor="middle" dy="0.35em" fontSize={13} fill="#222" fontWeight="bold">{label}</text>
      <text x="50%" y="68%" textAnchor="middle" fontSize={11} fill="#888">{Math.round(percent*100)}%</text>
    </svg>
  );
};

export default SkillCircle;
