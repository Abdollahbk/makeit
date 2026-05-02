import React, { useState, useEffect } from 'react';
import translations from '../translations';
import { FormContainer } from './CVFormStyles';

// Import Section Components
import PersonalInfoSection from './form/PersonalInfoSection';
import SummarySection from './form/SummarySection';
import ExperienceSection from './form/ExperienceSection';
import EducationSection from './form/EducationSection';
import SkillsSection from './form/SkillsSection';
import LanguagesSection from './form/LanguagesSection';
import InterestsSection from './form/InterestsSection';
import CertificatesSection from './form/CertificatesSection';
import PhotoModal from './form/PhotoModal';

/**
 * CVForm component that provides fields to edit CV data.
 * Refactored into smaller section-based components.
 */
const CVForm = ({ cvData, updateCVData, language }) => {
  // Local state for form interactions
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [appearance, setAppearance] = useState('circle');
  const [zoom, setZoom] = useState(1);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  
  const [showSkills, setShowSkills] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  
  const [showLanguages, setShowLanguages] = useState(false);
  const [languageInput, setLanguageInput] = useState('');
  const [languageLevel, setLanguageLevel] = useState('');
  
  const [showInterests, setShowInterests] = useState(false);
  const [interestInput, setInterestInput] = useState('');

  const [editingSkill, setEditingSkill] = useState(null);
  const [editingLanguage, setEditingLanguage] = useState(null);
  const [editingInterest, setEditingInterest] = useState(null);

  // Translation-based suggestions
  const [remainingSkillSuggestions, setRemainingSkillSuggestions] = useState(translations[language].skillSuggestions);
  const [remainingLanguageSuggestions, setRemainingLanguageSuggestions] = useState(translations[language].languageSuggestions);
  const [remainingInterestSuggestions, setRemainingInterestSuggestions] = useState(translations[language].interestSuggestions);

  // Reset suggestions when language changes
  useEffect(() => {
    setRemainingSkillSuggestions(translations[language].skillSuggestions);
    setRemainingLanguageSuggestions(translations[language].languageSuggestions);
    setRemainingInterestSuggestions(translations[language].interestSuggestions);
  }, [language]);

  // --- Handlers ---

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedPhoto(reader.result);
      setShowPhotoModal(true);
      setAppearance('circle');
      setZoom(1);
      setPosX(0);
      setPosY(0);
      e.target.value = ''; // Reset input to allow re-uploading same file
    };
    reader.readAsDataURL(file);
  };

  const handleSavePhoto = () => {
    if (!uploadedPhoto) return;
    
    // Convert pixel offsets to percentages relative to the 220px container
    // This ensures alignment is consistent regardless of the final display size
    const pctX = (posX / 220) * 100;
    const pctY = (posY / 220) * 100;

    updateCVData('personalInfo', {
      ...cvData.personalInfo,
      photo: uploadedPhoto,
      photoAppearance: appearance,
      photoZoom: zoom,
      photoPosX: pctX,
      photoPosY: pctY
    });
    setShowPhotoModal(false);
    setUploadedPhoto(null);
  };

  const updatePersonalInfo = (field, value) => {
    updateCVData('personalInfo', {
      ...cvData.personalInfo,
      [field]: value
    });
  };

  // Experience Handlers
  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    updateCVData('experience', [...cvData.experience, newExperience]);
  };

  const updateExperience = (id, field, value) => {
    const updatedExperience = cvData.experience.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateCVData('experience', updatedExperience);
  };

  const removeExperience = (id) => {
    updateCVData('experience', cvData.experience.filter(exp => exp.id !== id));
  };

  // Education Handlers
  const addEducation = () => {
    const newEducation = {
      id: Date.now(),
      degree: '',
      school: '',
      city: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    updateCVData('education', [...cvData.education, newEducation]);
  };

  const updateEducation = (id, field, value) => {
    const updatedEducation = cvData.education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateCVData('education', updatedEducation);
  };

  const removeEducation = (id) => {
    updateCVData('education', cvData.education.filter(edu => edu.id !== id));
  };

  // Skills Handlers
  const removeSkill = (skillToRemove) => {
    const filteredSkills = cvData.skills.filter(skill => skill.name !== skillToRemove.name);
    updateCVData('skills', filteredSkills);
    if (!remainingSkillSuggestions.includes(skillToRemove.name)) {
      setRemainingSkillSuggestions([skillToRemove.name, ...remainingSkillSuggestions]);
    }
  };

  // Language Handlers
  const removeLanguage = (langToRemove) => {
    const filteredLanguages = cvData.languages.filter(lang => lang.name !== langToRemove.name);
    updateCVData('languages', filteredLanguages);
    if (!remainingLanguageSuggestions.includes(langToRemove.name)) {
      setRemainingLanguageSuggestions([langToRemove.name, ...remainingLanguageSuggestions]);
    }
  };

  // Interest Handlers
  const removeInterest = (interestToRemove) => {
    const filteredInterests = cvData.interests.filter(interest => interest !== interestToRemove);
    updateCVData('interests', filteredInterests);
    if (!remainingInterestSuggestions.includes(interestToRemove)) {
      setRemainingInterestSuggestions([interestToRemove, ...remainingInterestSuggestions]);
    }
  };

  // Certificate Handlers
  const addCertificate = () => {
    const newCertificate = {
      id: Date.now(),
      name: '',
      endDate: '',
      description: ''
    };
    updateCVData('certificates', [...(cvData.certificates || []), newCertificate]);
  };

  const updateCertificate = (id, field, value) => {
    const updatedCertificates = (cvData.certificates || []).map(cert =>
      cert.id === id ? { ...cert, [field]: value } : cert
    );
    updateCVData('certificates', updatedCertificates);
  };

  const removeCertificate = (id) => {
    updateCVData('certificates', (cvData.certificates || []).filter(cert => cert.id !== id));
  };

  return (
    <FormContainer>
      <PersonalInfoSection 
        cvData={cvData}
        updatePersonalInfo={updatePersonalInfo}
        handlePhotoUpload={handlePhotoUpload}
        setShowPhotoModal={setShowPhotoModal}
        setUploadedPhoto={setUploadedPhoto}
        setAppearance={setAppearance}
        setZoom={setZoom}
        setPosX={setPosX}
        setPosY={setPosY}
        language={language}
      />

      <SummarySection 
        cvData={cvData}
        updateCVData={updateCVData}
        language={language}
      />

      <ExperienceSection 
        cvData={cvData}
        updateExperience={updateExperience}
        addExperience={addExperience}
        removeExperience={removeExperience}
        language={language}
      />

      <EducationSection 
        cvData={cvData}
        updateEducation={updateEducation}
        addEducation={addEducation}
        removeEducation={removeEducation}
        language={language}
      />

      <CertificatesSection 
        cvData={cvData}
        updateCertificate={updateCertificate}
        addCertificate={addCertificate}
        removeCertificate={removeCertificate}
        language={language}
      />

      <SkillsSection 
        cvData={cvData}
        updateCVData={updateCVData}
        language={language}
        showSkills={showSkills}
        setShowSkills={setShowSkills}
        skillInput={skillInput}
        setSkillInput={setSkillInput}
        skillLevel={skillLevel}
        setSkillLevel={setSkillLevel}
        remainingSkillSuggestions={remainingSkillSuggestions}
        setRemainingSkillSuggestions={setRemainingSkillSuggestions}
        removeSkill={removeSkill}
        editingSkill={editingSkill}
        setEditingSkill={setEditingSkill}
      />

      <LanguagesSection 
        cvData={cvData}
        updateCVData={updateCVData}
        language={language}
        showLanguages={showLanguages}
        setShowLanguages={setShowLanguages}
        languageInput={languageInput}
        setLanguageInput={setLanguageInput}
        languageLevel={languageLevel}
        setLanguageLevel={setLanguageLevel}
        remainingLanguageSuggestions={remainingLanguageSuggestions}
        setRemainingLanguageSuggestions={setRemainingLanguageSuggestions}
        removeLanguage={removeLanguage}
        editingLanguage={editingLanguage}
        setEditingLanguage={setEditingLanguage}
      />

      <InterestsSection 
        cvData={cvData}
        updateCVData={updateCVData}
        language={language}
        showInterests={showInterests}
        setShowInterests={setShowInterests}
        interestInput={interestInput}
        setInterestInput={setInterestInput}
        remainingInterestSuggestions={remainingInterestSuggestions}
        setRemainingInterestSuggestions={setRemainingInterestSuggestions}
        removeInterest={removeInterest}
        editingInterest={editingInterest}
        setEditingInterest={setEditingInterest}
      />

      <PhotoModal 
        showPhotoModal={showPhotoModal}
        uploadedPhoto={uploadedPhoto}
        language={language}
        setShowPhotoModal={setShowPhotoModal}
        setUploadedPhoto={setUploadedPhoto}
        appearance={appearance}
        setAppearance={setAppearance}
        zoom={zoom}
        setZoom={setZoom}
        posX={posX}
        setPosX={setPosX}
        posY={posY}
        setPosY={setPosY}
        handleSavePhoto={handleSavePhoto}
      />
    </FormContainer>
  );
};

export default CVForm;