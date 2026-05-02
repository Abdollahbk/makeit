import React, { useState } from 'react';
import { FiChevronUp, FiChevronDown, FiTrash2, FiCheck, FiBookOpen } from 'react-icons/fi';
import styled from 'styled-components';
import { 
  Section, SectionTitle, ItemContainer, FormGrid, FormGroup, Label, Input, 
  Textarea, RemoveButton, AddButton 
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

const DateSelectRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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

const EducationSection = ({ cvData, updateEducation, addEducation, removeEducation, language }) => {
  const [expandedId, setExpandedId] = useState(cvData.education[0]?.id || null);

  const handleDateChange = (id, field, part, value) => {
    const edu = cvData.education.find(e => e.id === id);
    if (!edu) return;
    
    let [year, month] = (edu[field] || '-').split('-');
    if (part === 'year') year = value;
    if (part === 'month') month = value;
    
    updateEducation(id, field, `${year}-${month}`);
  };

  return (
    <Section>
      <SectionTitle style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <FiBookOpen style={{ color: 'var(--primary)' }} />
          {translations[language].education}
        </div>
      </SectionTitle>

      {cvData.education.map((edu) => (
        <ItemContainer key={edu.id} style={{ padding: '2rem' }}>
          <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', display: 'flex', gap: '0.5rem' }}>
             <button 
                onClick={() => setExpandedId(expandedId === edu.id ? null : edu.id)}
                style={{ background: 'none', border: '1.5px solid var(--slate-200)', borderRadius: 'var(--radius-sm)', padding: '4px', cursor: 'pointer' }}
             >
                {expandedId === edu.id ? <FiChevronUp /> : <FiChevronDown />}
             </button>
          </div>

          {expandedId === edu.id && (
            <>
              <FormGroup style={{ marginBottom: '1.5rem' }}>
                <Label>{translations[language].degree || 'Formation'}</Label>
                <Input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  placeholder={translations[language].degreePlaceholder}
                />
              </FormGroup>

              <FormGrid style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <FormGroup>
                  <Label>{translations[language].school}</Label>
                  <Input
                    type="text"
                    value={edu.school}
                    onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                    placeholder={translations[language].schoolPlaceholder}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>{translations[language].city || 'Ville'}</Label>
                  <Input
                    type="text"
                    value={edu.city || ''}
                    onChange={(e) => updateEducation(edu.id, 'city', e.target.value)}
                    placeholder={translations[language].city}
                  />
                </FormGroup>
              </FormGrid>

              <FormGrid style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <FormGroup>
                  <Label>{translations[language].startDate}</Label>
                  <SelectGroup>
                    <StyledSelect 
                      value={(edu.startDate || '').split('-')[1] || ''} 
                      onChange={e => handleDateChange(edu.id, 'startDate', 'month', e.target.value)}
                    >
                      <option value="">Month</option>
                      {months.map((m, i) => (
                        <option key={m} value={String(i + 1).padStart(2, '0')}>{m}</option>
                      ))}
                    </StyledSelect>
                    <StyledSelect 
                      value={(edu.startDate || '').split('-')[0] || ''} 
                      onChange={e => handleDateChange(edu.id, 'startDate', 'year', e.target.value)}
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
                        checked={edu.endDate === 'Present'} 
                        onChange={(e) => updateEducation(edu.id, 'endDate', e.target.checked ? 'Present' : '')} 
                      />
                      {language === 'fr' ? 'ce jour' : 'Present'}
                    </label>
                  </div>
                  {edu.endDate !== 'Present' ? (
                    <SelectGroup>
                      <StyledSelect 
                        value={(edu.endDate || '').split('-')[1] || ''} 
                        onChange={e => handleDateChange(edu.id, 'endDate', 'month', e.target.value)}
                      >
                        <option value="">Month</option>
                        {months.map((m, i) => (
                          <option key={m} value={String(i + 1).padStart(2, '0')}>{m}</option>
                        ))}
                      </StyledSelect>
                      <StyledSelect 
                        value={(edu.endDate || '').split('-')[0] || ''} 
                        onChange={e => handleDateChange(edu.id, 'endDate', 'year', e.target.value)}
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
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                  placeholder={translations[language].descriptionPlaceholder}
                  style={{ minHeight: '100px' }}
                />
              </FormGroup>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <TrashButton onClick={() => removeEducation(edu.id)} title={translations[language].remove}>
                  <FiTrash2 />
                </TrashButton>
                <DoneButton onClick={() => setExpandedId(null)}>
                  <FiCheck /> {translations[language].done}
                </DoneButton>
              </div>
            </>
          )}

          {expandedId !== edu.id && (
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                   <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--slate-900)' }}>{edu.degree || 'Untitled Education'}</h3>
                   <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: 'var(--slate-500)' }}>{edu.school}</p>
                </div>
                <button 
                   onClick={() => setExpandedId(edu.id)}
                   style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
                >
                   Edit
                </button>
             </div>
          )}
        </ItemContainer>
      ))}

      <AddButton onClick={addEducation}>
        {translations[language].addEducation}
      </AddButton>
    </Section>
  );
};

export default EducationSection;
