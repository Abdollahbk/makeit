import React from 'react';
import { FiCamera, FiEdit2, FiPlus, FiTrash2, FiUser } from 'react-icons/fi';
import styled from 'styled-components';
import { 
  Section, SectionTitle, FormGrid, FormGroup, Label, Input, JobTitleGroup, 
  PhotoBox, PhotoIcon, PlusSign, PhotoImg, CustomizeButton, PillTag
} from '../CVFormStyles';
import translations from '../../translations';

const InfoHeader = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const MainInfo = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  width: 100%;
`;

const SuggestionsWrapper = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--slate-100);
`;

const EditableLabel = styled.input`
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--slate-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: none;
  border: none;
  border-bottom: 1px solid transparent;
  padding: 0;
  width: 100%;
  transition: var(--transition);

  &:hover, &:focus {
    color: var(--primary);
    border-color: var(--slate-200);
    outline: none;
  }
`;

const extraFieldSuggestions = [
  { key: 'birthDate', label: 'birthDate' },
  { key: 'birthPlace', label: 'birthPlace' },
  { key: 'drivingLicense', label: 'drivingLicense' },
  { key: 'gender', label: 'gender' },
  { key: 'nationality', label: 'nationality' },
  { key: 'maritalStatus', label: 'maritalStatus' },
  { key: 'website', label: 'website' },
  { key: 'linkedin', label: 'linkedin' },
  { key: 'github', label: 'github' }
];

const PersonalInfoSection = ({ 
  cvData, updatePersonalInfo, handlePhotoUpload, 
  setShowPhotoModal, setUploadedPhoto, setAppearance, 
  setZoom, setPosX, setPosY,
  language 
}) => {
  const mainFields = ['email', 'phone', 'location', 'website', 'linkedin', 'github'];
  
  const [fieldOrder, setFieldOrder] = React.useState(() => {
    const existing = Object.keys(cvData.personalInfo).filter(key => 
      !mainFields.includes(key) && 
      !['firstName', 'lastName', 'title', 'photo', 'photoAppearance', 'customFields'].includes(key) &&
      !!cvData.personalInfo[key]
    );
    return existing;
  });

  const isFieldVisible = (key) => {
    if (mainFields.includes(key)) return true;
    return !!cvData.personalInfo[key] || fieldOrder.includes(key);
  };

  const addField = (key) => {
    if (!fieldOrder.includes(key)) {
      setFieldOrder(prev => [...prev, key]);
    }
    updatePersonalInfo(key, ' '); 
  };

  const removeField = (key) => {
    setFieldOrder(prev => prev.filter(k => k !== key));
    updatePersonalInfo(key, '');
  };

  const addCustomField = () => {
    const customFields = cvData.personalInfo.customFields || [];
    const newField = {
      id: Date.now(),
      label: translations[language].customField,
      value: ''
    };
    updatePersonalInfo('customFields', [...customFields, newField]);
  };

  const updateCustomField = (id, field, value) => {
    const customFields = cvData.personalInfo.customFields.map(f =>
      f.id === id ? { ...f, [field]: value } : f
    );
    updatePersonalInfo('customFields', customFields);
  };

  const removeCustomField = (id) => {
    const customFields = cvData.personalInfo.customFields.filter(f => f.id !== id);
    updatePersonalInfo('customFields', customFields);
  };

  return (
    <Section>
      <SectionTitle>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <FiUser style={{ color: 'var(--primary)' }} />
          {translations[language].personalInformation}
        </div>
      </SectionTitle>
      
      <InfoHeader>
        <FormGroup>
          <Label>{translations[language].photo}</Label>
          <PhotoBox style={{ height: '160px', width: '120px' }}>
            {cvData.personalInfo.photo ? (
              <>
                <PhotoImg
                  src={cvData.personalInfo.photo}
                  alt="Profile"
                  style={{ borderRadius: 'var(--radius)' }}
                />
                <div style={{ 
                  position: 'absolute', 
                  bottom: '8px', 
                  left: '50%', 
                  transform: 'translateX(-50%)',
                  display: 'flex', 
                  gap: '6px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  padding: '4px 8px',
                  borderRadius: '20px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  zIndex: 2
                }}>
                  <CustomizeButton 
                    type="button" 
                    title="Adjust" 
                    onClick={() => {
                      setUploadedPhoto(cvData.personalInfo.photo);
                      setShowPhotoModal(true);
                      setAppearance(cvData.personalInfo.photoAppearance || 'circle');
                      setZoom(cvData.personalInfo.photoZoom || 1);
                      setPosX(((cvData.personalInfo.photoPosX || 0) / 100) * 220);
                      setPosY(((cvData.personalInfo.photoPosY || 0) / 100) * 220);
                    }}
                    style={{ position: 'static', width: '28px', height: '28px', fontSize: '12px', background: '#f1f5f9', color: '#475569' }}
                  >
                    <FiEdit2 />
                  </CustomizeButton>
                  <CustomizeButton 
                    type="button" 
                    title="Change" 
                    onClick={() => {
                      const input = document.getElementById('photo-upload-input');
                      if (input) input.click();
                    }}
                    style={{ position: 'static', width: '28px', height: '28px', fontSize: '12px', backgroundColor: 'var(--primary)', color: 'white' }}
                  >
                    <FiCamera />
                  </CustomizeButton>
                  <CustomizeButton 
                    type="button" 
                    title="Remove" 
                    onClick={() => updatePersonalInfo('photo', '')}
                    style={{ position: 'static', width: '28px', height: '28px', fontSize: '12px', backgroundColor: '#fee2e2', color: '#ef4444' }}
                  >
                    <FiTrash2 />
                  </CustomizeButton>
                </div>
              </>
            ) : (
              <label htmlFor="photo-upload-input" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <PhotoIcon><FiCamera /></PhotoIcon>
                <PlusSign>+</PlusSign>
              </label>
            )}
            <input
              id="photo-upload-input"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handlePhotoUpload}
            />
          </PhotoBox>
        </FormGroup>

        <MainInfo>
          <FormGroup>
            <Label>{translations[language].firstName}</Label>
            <Input
              type="text"
              value={cvData.personalInfo.firstName}
              onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
              placeholder={translations[language].firstName}
            />
          </FormGroup>
          <FormGroup>
            <Label>{translations[language].lastName}</Label>
            <Input
              type="text"
              value={cvData.personalInfo.lastName}
              onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
              placeholder={translations[language].lastName}
            />
          </FormGroup>
          <JobTitleGroup style={{ gridColumn: '1 / span 2' }}>
            <Label>{translations[language].jobTitle}</Label>
            <Input
              type="text"
              value={cvData.personalInfo.title || ''}
              onChange={(e) => updatePersonalInfo('title', e.target.value)}
              placeholder={translations[language].jobTitle}
            />
          </JobTitleGroup>
        </MainInfo>
      </InfoHeader>

      <FormGrid>
        <FormGroup>
          <Label>{translations[language].email}</Label>
          <Input
            type="email"
            value={cvData.personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            placeholder={translations[language].email}
          />
        </FormGroup>
        <FormGroup>
          <Label>{translations[language].phone}</Label>
          <Input
            type="tel"
            value={cvData.personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            placeholder={translations[language].phone}
          />
        </FormGroup>
        <FormGroup>
          <Label>{translations[language].location}</Label>
          <Input
            type="text"
            value={cvData.personalInfo.location}
            onChange={(e) => updatePersonalInfo('location', e.target.value)}
            placeholder={translations[language].location}
          />
        </FormGroup>
        <FormGroup>
          <Label>{translations[language].website}</Label>
          <Input
            type="url"
            value={cvData.personalInfo.website}
            onChange={(e) => updatePersonalInfo('website', e.target.value)}
            placeholder={translations[language].website}
          />
        </FormGroup>
        <FormGroup>
          <Label>{translations[language].linkedin}</Label>
          <Input
            type="url"
            value={cvData.personalInfo.linkedin}
            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
            placeholder={translations[language].linkedin}
          />
        </FormGroup>
        <FormGroup>
          <Label>{translations[language].github}</Label>
          <Input
            type="url"
            value={cvData.personalInfo.github}
            onChange={(e) => updatePersonalInfo('github', e.target.value)}
            placeholder={translations[language].github}
          />
        </FormGroup>

        {fieldOrder.map(key => {
          const field = extraFieldSuggestions.find(f => f.key === key);
          if (!field) return null;
          
          return (
            <FormGroup key={key}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <Label>{translations[language][key]}</Label>
                 <button 
                    onClick={() => removeField(key)}
                    style={{ background: 'none', border: 'none', color: 'var(--slate-400)', cursor: 'pointer', padding: '4px' }}
                    title={translations[language].remove}
                 >
                    <FiTrash2 size={12} />
                 </button>
              </div>
              <Input
                type={key === 'birthDate' ? 'date' : 'text'}
                value={cvData.personalInfo[key] || ''}
                onChange={(e) => updatePersonalInfo(key, e.target.value)}
                placeholder={translations[language][key]}
              />
            </FormGroup>
          );
        })}

        {/* Multiple Custom Fields */}
        {(cvData.personalInfo.customFields || []).map(f => (
          <FormGroup key={f.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <EditableLabel 
                  value={f.label} 
                  onChange={(e) => updateCustomField(f.id, 'label', e.target.value)}
                  placeholder="Label"
               />
               <button 
                  onClick={() => removeCustomField(f.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--slate-400)', cursor: 'pointer', padding: '4px' }}
                  title={translations[language].remove}
               >
                  <FiTrash2 size={12} />
               </button>
            </div>
            <Input
              type="text"
              value={f.value}
              onChange={(e) => updateCustomField(f.id, 'value', e.target.value)}
              placeholder="..."
            />
          </FormGroup>
        ))}
      </FormGrid>

      <SuggestionsWrapper>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
          {extraFieldSuggestions.filter(f => !isFieldVisible(f.key)).map((f) => (
            <PillTag 
              key={f.key} 
              onClick={() => addField(f.key)}
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.8125rem' }}
            >
              <FiPlus size={14} /> {translations[language][f.key]}
            </PillTag>
          ))}
          {/* Custom Field Pill ALWAYS Visible */}
          <PillTag 
            onClick={addCustomField}
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.8125rem', borderColor: 'var(--primary)', color: 'var(--primary)', background: '#fff' }}
          >
            <FiPlus size={14} /> {translations[language].customField}
          </PillTag>
        </div>
      </SuggestionsWrapper>
    </Section>
  );
};

export default PersonalInfoSection;
