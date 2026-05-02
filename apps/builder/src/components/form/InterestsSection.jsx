import React from 'react';
import { FiPlus, FiChevronUp, FiTrash2, FiHeart } from 'react-icons/fi';
import { Section, SectionTitle, OutlinedPlusButton, Input, AddButton, PillTag, SkillsContainer } from '../CVFormStyles';
import translations from '../../translations';

const InterestsSection = ({ 
  cvData, updateCVData, language, 
  showInterests, setShowInterests, 
  interestInput, setInterestInput, 
  remainingInterestSuggestions, setRemainingInterestSuggestions,
  removeInterest,
  editingInterest, setEditingInterest
}) => {
  return (
    <Section>
      <SectionTitle style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <FiHeart style={{ color: 'var(--primary)' }} />
          {translations[language].interests}
        </div>
        <OutlinedPlusButton onClick={() => {
          setEditingInterest(null);
          setInterestInput('');
          setShowInterests(v => !v);
        }}>
          {showInterests ? <FiChevronUp /> : <FiPlus />}
        </OutlinedPlusButton>
      </SectionTitle>

      {showInterests && (
        <div style={{ 
          border: '1.5px solid var(--slate-100)', 
          borderRadius: 'var(--radius-lg)', 
          padding: '1.5rem', 
          marginBottom: '1.5rem', 
          background: '#fff',
          boxShadow: 'var(--shadow)'
        }}>
          <Input
            type="text"
            value={interestInput}
            onChange={e => setInterestInput(e.target.value)}
            placeholder={translations[language].interestPlaceholder}
            style={{ width: '100%', marginBottom: '1.5rem' }}
          />
          <AddButton
            style={{ margin: 0, background: 'var(--primary)', color: '#fff', border: 'none' }}
            onClick={() => {
              if (!interestInput.trim()) return;
              
              const newInterest = interestInput.trim();
              
              if (editingInterest) {
                // Update existing interest
                const updatedInterests = cvData.interests.map(i => 
                  i === editingInterest ? newInterest : i
                );
                updateCVData('interests', updatedInterests);
              } else {
                // Add new interest
                updateCVData('interests', [...cvData.interests, newInterest]);
                setRemainingInterestSuggestions(remainingInterestSuggestions.filter(i => i !== newInterest));
              }
              
              setInterestInput('');
              setEditingInterest(null);
              setShowInterests(false);
            }}
          >
            {translations[language].done}
          </AddButton>
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {[...new Set(remainingInterestSuggestions)].map((i) => (
          <PillTag key={i} onClick={() => {
            setInterestInput(i);
            setEditingInterest(null);
            setShowInterests(true);
          }}>
            <FiPlus size={14} /> {i}
          </PillTag>
        ))}
      </div>

      <SkillsContainer>
        {cvData.interests.map(interest => (
          <PillTag 
            key={interest} 
            onClick={() => {
              setInterestInput(interest);
              setEditingInterest(interest);
              setShowInterests(true);
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
            {interest}
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
                removeInterest(interest);
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

export default InterestsSection;
