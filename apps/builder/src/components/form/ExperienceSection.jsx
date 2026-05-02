import React, { useState } from 'react';
import { FiChevronUp, FiChevronDown, FiTrash2, FiCheck, FiBriefcase } from 'react-icons/fi';
import styled from 'styled-components';
import { 
  Section, SectionTitle, ItemContainer, FormGrid, FormGroup, Label, Input, 
  Textarea, AddButton 
} from '../CVFormStyles';
import translations from '../../translations';

const DoneButton = styled.button`
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: var(--radius);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: var(--transition);

  &:hover {
    background: var(--slate-800);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
`;

const TrashButton = styled.button`
  background: #fff;
  color: var(--slate-400);
  border: 1.5px solid var(--slate-200);
  padding: 0.625rem;
  border-radius: var(--radius);
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);

  &:hover {
    background: #fee2e2;
    color: #ef4444;
    border-color: #fecaca;
  }
`;

const SelectGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  min-width: 0;
`;

const StyledSelect = styled.select`
  flex: 1;
  padding: 0.75rem;
  border: 1.5px solid var(--slate-200);
  border-radius: var(--radius);
  font-size: 0.875rem;
  font-family: 'Inter', sans-serif;
  background: var(--slate-50);
  cursor: pointer;
  min-width: 0;

  &:focus {
    outline: none;
    border-color: var(--primary);
    background: #fff;
  }
`;

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

const ExperienceSection = ({ cvData, updateExperience, addExperience, removeExperience, language }) => {
  const [expandedId, setExpandedId] = useState(cvData.experience[0]?.id || null);

  const handleDateChange = (id, field, part, value) => {
    const exp = cvData.experience.find(e => e.id === id);
    if (!exp) return;
    
    let [year, month] = (exp[field] || '-').split('-');
    if (part === 'year') year = value;
    if (part === 'month') month = value;
    
    updateExperience(id, field, `${year}-${month}`);
  };

  return (
    <Section>
      <SectionTitle style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <FiBriefcase style={{ color: 'var(--primary)' }} />
          {translations[language].experience}
        </div>
      </SectionTitle>

      {cvData.experience.map((exp) => (
        <ItemContainer key={exp.id} style={{ padding: '2rem' }}>
          <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', display: 'flex', gap: '0.5rem' }}>
             <button 
                onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                style={{ background: 'none', border: '1.5px solid var(--slate-200)', borderRadius: 'var(--radius-sm)', padding: '4px', cursor: 'pointer' }}
             >
                {expandedId === exp.id ? <FiChevronUp /> : <FiChevronDown />}
             </button>
          </div>

          {expandedId === exp.id && (
            <>
              <FormGrid style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <FormGroup>
                  <Label>{translations[language].company}</Label>
                  <Input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    placeholder={translations[language].companyPlaceholder}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>{translations[language].location}</Label>
                  <Input
                    type="text"
                    value={exp.location || ''}
                    onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                    placeholder={translations[language].locationPlaceholder}
                  />
                </FormGroup>
              </FormGrid>

              <FormGroup style={{ marginBottom: '1.5rem' }}>
                <Label>{translations[language].position}</Label>
                <Input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  placeholder={translations[language].positionPlaceholder}
                />
              </FormGroup>

              <FormGrid style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <FormGroup>
                  <Label>{translations[language].startDate}</Label>
                  <SelectGroup>
                    <StyledSelect 
                      value={(exp.startDate || '').split('-')[1] || ''} 
                      onChange={e => handleDateChange(exp.id, 'startDate', 'month', e.target.value)}
                    >
                      <option value="">Month</option>
                      {months.map((m, i) => (
                        <option key={m} value={String(i + 1).padStart(2, '0')}>{m}</option>
                      ))}
                    </StyledSelect>
                    <StyledSelect 
                      value={(exp.startDate || '').split('-')[0] || ''} 
                      onChange={e => handleDateChange(exp.id, 'startDate', 'year', e.target.value)}
                    >
                      <option value="">Year</option>
                      {years.map(y => (
                        <option key={y} value={String(y)}>{y}</option>
                      ))}
                    </StyledSelect>
                  </SelectGroup>
                </FormGroup>

                <FormGroup>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Label>{translations[language].endDate}</Label>
                    <label style={{ fontSize: '0.75rem', color: 'var(--slate-500)', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={exp.endDate === 'Present'} 
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.checked ? 'Present' : '')} 
                      />
                      {language === 'fr' ? 'ce jour' : 'Present'}
                    </label>
                  </div>
                  {exp.endDate !== 'Present' ? (
                    <SelectGroup>
                      <StyledSelect 
                        value={(exp.endDate || '').split('-')[1] || ''} 
                        onChange={e => handleDateChange(exp.id, 'endDate', 'month', e.target.value)}
                      >
                        <option value="">Month</option>
                        {months.map((m, i) => (
                          <option key={m} value={String(i + 1).padStart(2, '0')}>{m}</option>
                        ))}
                      </StyledSelect>
                      <StyledSelect 
                        value={(exp.endDate || '').split('-')[0] || ''} 
                        onChange={e => handleDateChange(exp.id, 'endDate', 'year', e.target.value)}
                      >
                        <option value="">Year</option>
                        {years.map(y => (
                          <option key={y} value={String(y)}>{y}</option>
                        ))}
                      </StyledSelect>
                    </SelectGroup>
                  ) : (
                    <div style={{ padding: '0.75rem', background: 'var(--slate-100)', borderRadius: 'var(--radius)', fontSize: '0.875rem', color: 'var(--slate-500)', textAlign: 'center' }}>
                      {language === 'fr' ? 'ce jour' : 'Present'}
                    </div>
                  )}
                </FormGroup>
              </FormGrid>

              <FormGroup style={{ marginBottom: '1.5rem' }}>
                <Label>{translations[language].description}</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  placeholder={translations[language].descriptionPlaceholder}
                  style={{ minHeight: '120px' }}
                />
              </FormGroup>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <TrashButton onClick={() => removeExperience(exp.id)} title={translations[language].remove}>
                  <FiTrash2 />
                </TrashButton>
                <DoneButton onClick={() => setExpandedId(null)}>
                  <FiCheck /> {translations[language].done}
                </DoneButton>
              </div>
            </>
          )}

          {expandedId !== exp.id && (
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                   <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--slate-900)' }}>{exp.position || 'Untitled Position'}</h3>
                   <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: 'var(--slate-500)' }}>{exp.company} {exp.location && `• ${exp.location}`}</p>
                </div>
                <button 
                   onClick={() => setExpandedId(exp.id)}
                   style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
                >
                   Edit
                </button>
             </div>
          )}
        </ItemContainer>
      ))}

      <AddButton onClick={addExperience}>
        {translations[language].addExperience}
      </AddButton>
    </Section>
  );
};

export default ExperienceSection;
