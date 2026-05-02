import React from 'react';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaLinkedin, FaGithub,
  FaCalendarAlt, FaMapPin, FaCar, FaVenusMars, FaFlag, FaHeart, FaInfoCircle
} from 'react-icons/fa';
import translations from '../../translations';
import {
  CVGrid, Sidebar, SidebarAccent, SidebarSection, Main, Header, Name, Title, Divider,
  SectionTitle, TagList, Tag, ExperienceItem, ExperienceHeader, ExperienceRole,
  ExperienceCompany, ExperienceDate, ExperienceDesc, PhotoWrapper, PhotoImg
} from '../CVPreviewStyles';
import { renderDescription } from '../../utils/helpers';
import { templatePalettes } from '../../constants';

const extraFieldIcons = {
  birthDate: <FaCalendarAlt />,
  birthPlace: <FaMapPin />,
  drivingLicense: <FaCar />,
  gender: <FaVenusMars />,
  nationality: <FaFlag />,
  maritalStatus: <FaHeart />,
  customField: <FaInfoCircle />
};

const BasicTemplate = ({ cvData, font, fontSize, textColor, language, template }) => {
  const { personalInfo, summary, experience, education, skills, languages, interests } = cvData;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim();
  const palette = templatePalettes[template] || { sidebarBg: '#f8fafc' };
  const isRtl = language === 'ar';

  const alignStyle = {
    textAlign: isRtl ? 'right' : 'left'
  };

  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    flexDirection: isRtl ? 'row-reverse' : 'row'
  };

  return (
    <CVGrid language={language} style={{ fontFamily: font, fontSize: fontSize + 'px', width: '100%', height: '100%', boxSizing: 'border-box', background: '#fff', direction: isRtl ? 'rtl' : 'ltr', position: 'relative', overflow: 'hidden' }}>
      <Sidebar language={language} style={{ minWidth: 200, maxWidth: 240, width: 200, height: '100%', boxSizing: 'border-box', background: palette.sidebarBg }}>
        <SidebarAccent language={language} style={{ background: textColor }} />
        <SidebarSection style={{ display: 'flex', justifyContent: 'center' }}>
          {personalInfo.photo && (
            <PhotoWrapper style={{ overflow: 'hidden' }}>
              <PhotoImg
                src={personalInfo.photo}
                alt="Profile"
                data-appearance={personalInfo.photoAppearance}
                style={{ transform: `scale(${personalInfo.photoZoom || 1}) translate(${personalInfo.photoPosX || 0}%, ${personalInfo.photoPosY || 0}%)` }}
              />
            </PhotoWrapper>
          )}
        </SidebarSection>

        {(personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.website || personalInfo.linkedin || personalInfo.github || Object.keys(extraFieldIcons).some(key => personalInfo[key])) && (
          <SidebarSection>
            <SectionTitle style={{ color: textColor }}>{translations[language].contact}</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: isRtl ? 'right' : 'left', color: '#475569', fontSize: '0.9em' }}>
              {personalInfo.email && <div style={itemStyle}><FaEnvelope style={{ color: textColor }} /> <span style={{ wordBreak: 'break-all' }}>{personalInfo.email}</span></div>}
              {personalInfo.phone && <div style={itemStyle}><FaPhone style={{ color: textColor }} /> <span>{personalInfo.phone}</span></div>}
              {personalInfo.location && <div style={itemStyle}><FaMapMarkerAlt style={{ color: textColor }} /> <span>{personalInfo.location}</span></div>}
              {personalInfo.website && <div style={itemStyle}><FaGlobe style={{ color: textColor }} /> <span style={{wordBreak:'break-all'}}>{personalInfo.website}</span></div>}
              {personalInfo.linkedin && <div style={itemStyle}><FaLinkedin style={{ color: textColor }} /> <span style={{wordBreak:'break-all'}}>{personalInfo.linkedin}</span></div>}
              {personalInfo.github && <div style={itemStyle}><FaGithub style={{ color: textColor }} /> <span style={{wordBreak:'break-all'}}>{personalInfo.github}</span></div>}
              {Object.keys(extraFieldIcons).map(key => personalInfo[key] && <div key={key} style={itemStyle}><span style={{ color: textColor }}>{extraFieldIcons[key]}</span><span>{personalInfo[key]}</span></div>)}
            </div>
          </SidebarSection>
        )}

        {skills.length > 0 && (
          <SidebarSection>
            <SectionTitle style={{ color: textColor }}>{translations[language].skills}</SectionTitle>
            <TagList>
              {skills.map((skill, i) => (
                <Tag key={i} style={{ background: `${textColor}15`, color: '#1e293b' }}>{typeof skill === 'object' ? skill.name : skill}</Tag>
              ))}
            </TagList>
          </SidebarSection>
        )}

        {languages.length > 0 && (
          <SidebarSection>
            <SectionTitle style={{ color: textColor }}>{translations[language].languages}</SectionTitle>
            <TagList>
              {languages.map((lang, i) => (
                <Tag key={i} style={{ background: '#e2e8f0', color: '#1e293b' }}>{typeof lang === 'object' ? `${lang.name} (${lang.level})` : lang}</Tag>
              ))}
            </TagList>
          </SidebarSection>
        )}

        {interests && interests.length > 0 && (
          <SidebarSection>
            <SectionTitle style={{ color: textColor }}>{translations[language].interests}</SectionTitle>
            <TagList>
              {interests.map((interest, i) => (
                <Tag key={i} style={{ background: '#f1f5f9', color: '#1e293b' }}>{typeof interest === 'object' ? interest.name : interest}</Tag>
              ))}
            </TagList>
          </SidebarSection>
        )}
      </Sidebar>

      <Main style={{ flex: 1 }}>
        <Header style={{ textAlign: isRtl ? 'right' : 'left' }}>
          <Name>{fullName}</Name>
          <Title style={{ color: textColor }}>{personalInfo.title}</Title>
        </Header>
        {summary && (
          <section style={alignStyle}>
            <SectionTitle style={{ color: textColor }}>{translations[language].profile}</SectionTitle>
            <Divider />
            <div style={{ color: '#475569', fontSize: '1em', lineHeight: 1.6, textAlign: isRtl ? 'right' : 'justify' }}>{summary}</div>
          </section>
        )}
        {experience.length > 0 && (
          <section style={alignStyle}>
            <SectionTitle style={{ color: textColor }}>{translations[language].experience}</SectionTitle>
            <Divider />
            {experience.map((exp, i) => (
              <ExperienceItem key={i}>
                <ExperienceHeader style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                  <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
                    <ExperienceRole>{exp.position}</ExperienceRole>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                      <ExperienceCompany>{exp.company}</ExperienceCompany>
                      {exp.location && <span style={{ color: '#64748b', fontSize: '0.9em' }}>• {exp.location}</span>}
                    </div>
                  </div>
                  <ExperienceDate>{exp.startDate} - {exp.endDate}</ExperienceDate>
                </ExperienceHeader>
                <ExperienceDesc style={{ textAlign: isRtl ? 'right' : 'left' }}>{renderDescription(exp.description)}</ExperienceDesc>
              </ExperienceItem>
            ))}
          </section>
        )}
        {education.length > 0 && (
          <section style={alignStyle}>
            <SectionTitle style={{ color: textColor }}>{translations[language].education}</SectionTitle>
            <Divider />
            {education.map((edu, i) => (
              <ExperienceItem key={i}>
                <ExperienceHeader style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                  <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
                    <ExperienceRole>{edu.degree}</ExperienceRole>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                      <ExperienceCompany>{edu.school}</ExperienceCompany>
                      {edu.city && <span style={{ color: '#64748b', fontSize: '0.9em' }}>• {edu.city}</span>}
                    </div>
                  </div>
                  <ExperienceDate>{edu.startDate} - {edu.endDate}</ExperienceDate>
                </ExperienceHeader>
                {edu.description && <ExperienceDesc style={{ textAlign: isRtl ? 'right' : 'left' }}>{renderDescription(edu.description)}</ExperienceDesc>}
              </ExperienceItem>
            ))}
          </section>
        )}
        {cvData.certificates && cvData.certificates.length > 0 && (
          <section style={alignStyle}>
            <SectionTitle style={{ color: textColor }}>{translations[language].certificates}</SectionTitle>
            <Divider />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {cvData.certificates.map((cert, i) => (
                <div key={i} style={{ padding: '0.5rem', background: '#f8fafc', borderRadius: '8px', pageBreakInside: 'avoid' }}>
                  <div style={{ fontWeight: 700, color: '#1e293b' }}>{cert.name}</div>
                  <div style={{ color: textColor, fontSize: '0.85em' }}>{cert.endDate === 'Present' ? translations[language].present : cert.endDate}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </Main>
    </CVGrid>
  );
};

export default BasicTemplate;
