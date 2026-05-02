import React, { useState } from 'react';
import { FiChevronUp, FiChevronDown, FiTrash2, FiCheck, FiAward } from 'react-icons/fi';
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

const SwitchLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 0.75rem;
  color: var(--slate-500);
`;

const SwitchInput = styled.input`
  width: 32px;
  height: 18px;
  appearance: none;
  background: #e2e8f0;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s;

  &:checked {
    background: var(--primary);
  }

  &::before {
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    background: white;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    transition: transform 0.2s;
  }

  &:checked::before {
    transform: translateX(14px);
  }
`;

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

const CertificatesSection = ({ cvData, updateCertificate, addCertificate, removeCertificate, language }) => {
  const [expandedId, setExpandedId] = useState(cvData.certificates[0]?.id || null);

  const handleDateChange = (id, field, part, value) => {
    const cert = cvData.certificates.find(c => c.id === id);
    if (!cert) return;
    
    let [year, month] = (cert[field] || '-').split('-');
    if (part === 'year') year = value;
    if (part === 'month') month = value;
    
    updateCertificate(id, field, `${year}-${month}`);
  };

  return (
    <Section>
      <SectionTitle style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <FiAward style={{ color: 'var(--primary)' }} />
          {translations[language].certificates}
        </div>
      </SectionTitle>

      {cvData.certificates.map((cert) => (
        <ItemContainer key={cert.id} style={{ padding: '2rem' }}>
          <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', display: 'flex', gap: '0.5rem' }}>
             <button 
                onClick={() => setExpandedId(expandedId === cert.id ? null : cert.id)}
                style={{ background: 'none', border: '1.5px solid var(--slate-200)', borderRadius: 'var(--radius-sm)', padding: '4px', cursor: 'pointer' }}
             >
                {expandedId === cert.id ? <FiChevronUp /> : <FiChevronDown />}
             </button>
          </div>

          {expandedId === cert.id && (
            <>
              <FormGrid style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <FormGroup>
                  <Label>{translations[language].certificate}</Label>
                  <Input
                    type="text"
                    value={cert.name}
                    onChange={(e) => updateCertificate(cert.id, 'name', e.target.value)}
                    placeholder="e.g. AWS Certified Solutions Architect"
                  />
                </FormGroup>

                <FormGroup>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <Label style={{ margin: 0 }}>Period</Label>
                    <SwitchLabel>
                      <SwitchInput 
                        type="checkbox" 
                        checked={cert.endDate === 'Present'} 
                        onChange={(e) => updateCertificate(cert.id, 'endDate', e.target.checked ? 'Present' : '')} 
                      />
                      {translations[language].present}
                    </SwitchLabel>
                  </div>
                  <SelectGroup>
                    <StyledSelect 
                      value={(cert.endDate || '').split('-')[1] || ''} 
                      disabled={cert.endDate === 'Present'}
                      onChange={e => handleDateChange(cert.id, 'endDate', 'month', e.target.value)}
                    >
                      <option value="">Month</option>
                      {months.map((m, i) => (
                        <option key={m} value={String(i + 1).padStart(2, '0')}>{m}</option>
                      ))}
                    </StyledSelect>
                    <StyledSelect 
                      value={(cert.endDate || '').split('-')[0] || ''} 
                      disabled={cert.endDate === 'Present'}
                      onChange={e => handleDateChange(cert.id, 'endDate', 'year', e.target.value)}
                    >
                      <option value="">Year</option>
                      {years.map(y => (
                        <option key={y} value={String(y)}>{y}</option>
                      ))}
                    </StyledSelect>
                  </SelectGroup>
                </FormGroup>
              </FormGrid>

              <FormGroup style={{ marginBottom: '1.5rem' }}>
                <Label>{translations[language].description}</Label>
                <Textarea
                  value={cert.description}
                  onChange={(e) => updateCertificate(cert.id, 'description', e.target.value)}
                  placeholder={translations[language].descriptionPlaceholder}
                  style={{ minHeight: '100px' }}
                />
              </FormGroup>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <TrashButton onClick={() => removeCertificate(cert.id)} title={translations[language].remove}>
                  <FiTrash2 />
                </TrashButton>
                <DoneButton onClick={() => setExpandedId(null)}>
                  <FiCheck /> {translations[language].done}
                </DoneButton>
              </div>
            </>
          )}

          {expandedId !== cert.id && (
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                   <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--slate-900)' }}>{cert.name || 'Untitled Certificate'}</h3>
                   <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: 'var(--slate-500)' }}>
                    {cert.endDate === 'Present' ? translations[language].present : cert.endDate}
                   </p>
                </div>
                <button 
                   onClick={() => setExpandedId(cert.id)}
                   style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
                >
                   Edit
                </button>
             </div>
          )}
        </ItemContainer>
      ))}

      <AddButton onClick={addCertificate}>
        {translations[language].addCertificate}
      </AddButton>
    </Section>
  );
};

export default CertificatesSection;
