import React from 'react';
import { FiPlus, FiChevronUp, FiTrash2, FiStar } from 'react-icons/fi';
import { Section, SectionTitle, OutlinedPlusButton, Input, AddButton, PillTag, SkillsContainer } from '../CVFormStyles';
import translations from '../../translations';

const SkillsSection = ({ 
  cvData, updateCVData, language, 
  showSkills, setShowSkills, 
  skillInput, setSkillInput, 
  skillLevel, setSkillLevel, 
  remainingSkillSuggestions, setRemainingSkillSuggestions,
  removeSkill,
  editingSkill, setEditingSkill
}) => {
  return (
    <Section>
      <SectionTitle style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <FiStar style={{ color: 'var(--primary)' }} />
          {translations[language].skills}
        </div>
        <OutlinedPlusButton onClick={() => {
          setEditingSkill(null);
          setSkillInput('');
          setSkillLevel('');
          setShowSkills(v => !v);
        }}>
          {showSkills ? <FiChevronUp /> : <FiPlus />}
        </OutlinedPlusButton>
      </SectionTitle>
      
      {showSkills && (
        <div style={{ 
          border: '1.5px solid var(--slate-100)', 
          borderRadius: 'var(--radius-lg)', 
          padding: '1.5rem', 
          marginBottom: '1.5rem', 
          background: '#fff',
          boxShadow: 'var(--shadow)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Input
                type="text"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                placeholder={translations[language].skillPlaceholder}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <select
                value={skillLevel}
                onChange={e => setSkillLevel(e.target.value)}
                style={{ 
                  padding: '0.75rem 1rem', 
                  border: '1.5px solid var(--slate-200)', 
                  borderRadius: 'var(--radius)', 
                  fontSize: '0.9375rem',
                  fontFamily: 'Inter, sans-serif',
                  background: 'var(--slate-50)',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '1rem'
                }}
              >
                <option value="">{translations[language].selectLevel}</option>
                <option value="Beginner">{translations[language].beginner}</option>
                <option value="Intermediate">{translations[language].intermediate}</option>
                <option value="Advanced">{translations[language].advanced}</option>
                <option value="Expert">{translations[language].expert}</option>
              </select>
            </div>
          </div>
          <AddButton
            style={{ margin: 0, background: 'var(--primary)', color: '#fff', border: 'none' }}
            onClick={() => {
              if (!skillInput.trim() || !skillLevel) return;
              
              const newSkill = { name: skillInput.trim(), level: skillLevel };
              
              if (editingSkill) {
                // Update existing skill
                const updatedSkills = cvData.skills.map(s => 
                  s.name === editingSkill.name ? newSkill : s
                );
                updateCVData('skills', updatedSkills);
              } else {
                // Add new skill
                updateCVData('skills', [...cvData.skills, newSkill]);
                setRemainingSkillSuggestions(remainingSkillSuggestions.filter(s => s !== skillInput.trim()));
              }
              
              setSkillInput('');
              setSkillLevel('');
              setEditingSkill(null);
              setShowSkills(false);
            }}
          >
            {translations[language].done}
          </AddButton>
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {remainingSkillSuggestions.map((s) => (
          <PillTag key={s} onClick={() => {
            setSkillInput(s);
            setSkillLevel('Intermediate');
            setEditingSkill(null);
            setShowSkills(true);
          }}>
            <FiPlus size={14} /> {s}
          </PillTag>
        ))}
      </div>

      <SkillsContainer>
        {cvData.skills.map(skill => (
          <PillTag 
            key={skill.name} 
            onClick={() => {
              setSkillInput(skill.name);
              setSkillLevel(skill.level);
              setEditingSkill(skill);
              setShowSkills(true);
            }}
            style={{ 
              background: 'var(--primary)', 
              color: '#fff', 
              borderColor: 'var(--primary)', 
              paddingRight: '2.5rem',
              position: 'relative',
              cursor: 'pointer'
            }}
          >
            {skill.name} {skill.level && <span style={{ opacity: 0.8, fontWeight: 400, fontSize: '0.75rem', marginLeft: '4px' }}>({skill.level})</span>}
            <span
              style={{ 
                position: 'absolute', 
                right: '0.75rem', 
                top: '50%', 
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                display: 'flex',
                padding: '4px'
              }}
              onClick={(e) => {
                e.stopPropagation();
                removeSkill(skill);
              }}
            >
              <FiTrash2 size={14} />
            </span>
          </PillTag>
        ))}
      </SkillsContainer>
    </Section>
  );
};

export default SkillsSection;
