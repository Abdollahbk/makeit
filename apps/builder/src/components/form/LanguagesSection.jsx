import React from 'react';
import { FiPlus, FiChevronUp, FiTrash2, FiGlobe } from 'react-icons/fi';
import { Section, SectionTitle, OutlinedPlusButton, Input, AddButton, PillTag, SkillsContainer } from '../CVFormStyles';
import translations from '../../translations';

const LanguagesSection = ({ 
  cvData, updateCVData, language, 
  showLanguages, setShowLanguages, 
  languageInput, setLanguageInput, 
  languageLevel, setLanguageLevel, 
  remainingLanguageSuggestions, setRemainingLanguageSuggestions,
  removeLanguage,
  editingLanguage, setEditingLanguage
}) => {
  return (
    <Section>
      <SectionTitle style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <FiGlobe style={{ color: 'var(--primary)' }} />
          {translations[language].languages}
        </div>
        <OutlinedPlusButton onClick={() => {
          setEditingLanguage(null);
          setLanguageInput('');
          setLanguageLevel('');
          setShowLanguages(v => !v);
        }}>
          {showLanguages ? <FiChevronUp /> : <FiPlus />}
        </OutlinedPlusButton>
      </SectionTitle>

      {showLanguages && (
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
                value={languageInput}
                onChange={e => setLanguageInput(e.target.value)}
                placeholder={translations[language].languagePlaceholder}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <select
                value={languageLevel}
                onChange={e => setLanguageLevel(e.target.value)}
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
                <option value="Beginner (A1)">{translations[language].beginnerA1}</option>
                <option value="Elementary (A2)">{translations[language].elementaryA2}</option>
                <option value="Intermediate (B1)">{translations[language].intermediateB1}</option>
                <option value="Upper Intermediate (B2)">{translations[language].upperIntermediateB2}</option>
                <option value="Advanced (C1)">{translations[language].advancedC1}</option>
                <option value="Proficient (C2)">{translations[language].proficientC2}</option>
                <option value="Native">{translations[language].native}</option>
                <option value="Fluent">{translations[language].fluent}</option>
                <option value="Conversational">{translations[language].conversational}</option>
                <option value="Basic">{translations[language].basic}</option>
              </select>
            </div>
          </div>
          <AddButton
            style={{ margin: 0, background: 'var(--primary)', color: '#fff', border: 'none' }}
            onClick={() => {
              if (!languageInput.trim() || !languageLevel) return;
              
              const newLanguage = { name: languageInput.trim(), level: languageLevel };
              
              if (editingLanguage) {
                // Update existing language
                const updatedLanguages = cvData.languages.map(l => 
                  l.name === editingLanguage.name ? newLanguage : l
                );
                updateCVData('languages', updatedLanguages);
              } else {
                // Add new language
                updateCVData('languages', [...cvData.languages, newLanguage]);
                setRemainingLanguageSuggestions(remainingLanguageSuggestions.filter(l => l !== languageInput.trim()));
              }
              
              setLanguageInput('');
              setLanguageLevel('');
              setEditingLanguage(null);
              setShowLanguages(false);
            }}
          >
            {translations[language].done}
          </AddButton>
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {[...new Set(remainingLanguageSuggestions)].map((l) => (
          <PillTag key={l} onClick={() => {
            setLanguageInput(l);
            setLanguageLevel('Fluent');
            setEditingLanguage(null);
            setShowLanguages(true);
          }}>
            <FiPlus size={14} /> {l}
          </PillTag>
        ))}
      </div>

      <SkillsContainer>
        {cvData.languages.map(lang => (
          <PillTag 
            key={lang.name} 
            onClick={() => {
              setLanguageInput(lang.name);
              setLanguageLevel(lang.level);
              setEditingLanguage(lang);
              setShowLanguages(true);
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
            {lang.name} {lang.level && <span style={{ opacity: 0.8, fontWeight: 400, fontSize: '0.75rem', marginLeft: '4px' }}>({lang.level})</span>}
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
                removeLanguage(lang);
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

export default LanguagesSection;
