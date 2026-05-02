import React from 'react';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaLinkedin, FaGithub,
  FaCalendarAlt, FaMapPin, FaCar, FaVenusMars, FaFlag, FaHeart, FaInfoCircle
} from 'react-icons/fa';
import translations from '../../translations';
import { renderDescription } from '../../utils/helpers';

const extraFieldIcons = {
  birthDate: <FaCalendarAlt />,
  birthPlace: <FaMapPin />,
  drivingLicense: <FaCar />,
  gender: <FaVenusMars />,
  nationality: <FaFlag />,
  maritalStatus: <FaHeart />,
  customField: <FaInfoCircle />
};

const TimelineTemplate = ({ cvData, font, fontSize, textColor, language }) => {
  const { personalInfo, summary, experience, education, languages, certificates } = cvData;
  const isRtl = language === 'ar';
  
  const palette = {
    primary: textColor,
    secondary: `${textColor}15`, 
    accent: textColor,
    sidebarBg: '#ffffff',
    mainBg: '#ffffff',
    shape: `${textColor}33`, 
    timeline: textColor,
  };

  const lProp = isRtl ? 'right' : 'left';
  const rProp = isRtl ? 'left' : 'right';

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#fff',
      fontFamily: font,
      fontSize: fontSize,
      color: '#334155',
      position: 'relative',
      boxSizing: 'border-box',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      direction: isRtl ? 'rtl' : 'ltr',
    }}>
      {/* Background/Graphics Layer */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        {/* Header Graphics */}
        <div style={{ position: 'absolute', top: 0, [lProp]: 0, width: '100%', height: 120, zIndex: 0, overflow: 'hidden' }}>
          <svg width="100%" height="120" viewBox="0 0 800 120" preserveAspectRatio="none" style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }}>
             <path d="M0 0H800V80C600 100 400 60 0 80V0Z" fill={palette.primary} opacity="0.05" />
             <rect x="0" y="0" width="800" height="60" fill={palette.primary} />
             <circle cx="750" cy="30" r="80" fill="#fff" opacity="0.1" />
             <circle cx="50" cy="80" r="40" fill={palette.primary} opacity="0.2" />
          </svg>
        </div>
        {/* Sidebar background and border */}
        <div style={{ 
          position: 'absolute', top: 30, [lProp]: 0, width: 230, height: 'calc(100% - 30px)', 
          background: palette.sidebarBg, [isRtl ? 'borderLeft' : 'borderRight']: '1px solid #f1f5f9',
          zIndex: 0
        }} />
      </div>

      {/* Content Layer */}
      <div style={{ display: 'flex', flex: 1, zIndex: 1, position: 'relative', marginTop: 30, height: 'calc(100% - 30px)', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
        {/* Sidebar Content */}
        <div style={{ minWidth: 230, maxWidth: 250, width: 230, padding: '40px 24px 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box' }}>
          {personalInfo.photo && (
            <div style={{ position: 'relative', marginBottom: 20, width: 110, height: 110, borderRadius: personalInfo.photoAppearance === 'circle' ? '50%' : personalInfo.photoAppearance === 'arched' ? '50px 50px 0 0' : '12px', border: `4px solid #fff`, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
               <img src={personalInfo.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${personalInfo.photoZoom || 1}) translate(${personalInfo.photoPosX || 0}%, ${personalInfo.photoPosY || 0}%)` }} />
            </div>
          )}
          <div style={{ fontWeight: 800, fontSize: '1.833em', color: palette.primary, marginBottom: 4, textAlign: 'center' }}>{`${personalInfo.firstName} ${personalInfo.lastName}`.trim()}</div>
          <div style={{ fontWeight: 600, fontSize: '1.083em', color: '#64748b', marginBottom: 24, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>{personalInfo.title}</div>
          {(personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.website || personalInfo.linkedin || personalInfo.github || ['birthDate', 'birthPlace', 'drivingLicense', 'gender', 'nationality', 'maritalStatus'].some(key => personalInfo[key])) && (
            <div style={{ width: '100%', marginBottom: 24 }}>
              <div style={{ fontWeight: 700, color: palette.primary, marginBottom: 12, fontSize: '1em', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ height: 2, flex: 1, background: palette.secondary }} />{translations[language].personalInformation}<span style={{ height: 2, flex: 1, background: palette.secondary }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, color: '#475569', fontSize: '1em', textAlign: isRtl ? 'right' : 'left' }}>
                {personalInfo.email && <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexDirection: isRtl ? 'row-reverse' : 'row' }}><FaEnvelope style={{ color: palette.primary, fontSize: 14 }} /><span style={{wordBreak:'break-all'}}>{personalInfo.email}</span></div>}
                {personalInfo.phone && <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexDirection: isRtl ? 'row-reverse' : 'row' }}><FaPhone style={{ color: palette.primary, fontSize: 14 }} /><span>{personalInfo.phone}</span></div>}
                {personalInfo.location && <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexDirection: isRtl ? 'row-reverse' : 'row' }}><FaMapMarkerAlt style={{ color: palette.primary, fontSize: 14 }} /><span>{personalInfo.location}</span></div>}
                {personalInfo.website && <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexDirection: isRtl ? 'row-reverse' : 'row' }}><FaGlobe style={{ color: palette.primary, fontSize: 14 }} /><span style={{wordBreak:'break-all'}}>{personalInfo.website}</span></div>}
                {personalInfo.linkedin && <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexDirection: isRtl ? 'row-reverse' : 'row' }}><FaLinkedin style={{ color: palette.primary, fontSize: 14 }} /><span style={{wordBreak:'break-all'}}>{personalInfo.linkedin}</span></div>}
                {personalInfo.github && <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexDirection: isRtl ? 'row-reverse' : 'row' }}><FaGithub style={{ color: palette.primary, fontSize: 14 }} /><span style={{wordBreak:'break-all'}}>{personalInfo.github}</span></div>}
                {['birthDate', 'birthPlace', 'drivingLicense', 'gender', 'nationality', 'maritalStatus'].map(key => personalInfo[key] && <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, flexDirection: isRtl ? 'row-reverse' : 'row' }}><span style={{ color: palette.primary, fontSize: 14 }}>{extraFieldIcons[key]}</span><span>{personalInfo[key]}</span></div>)}
              </div>
            </div>
          )}
          {languages && languages.length > 0 && (
            <div style={{ width: '100%', marginBottom: 24 }}>
              <div style={{ fontWeight: 700, color: palette.primary, marginBottom: 12, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: isRtl ? 'right' : 'left' }}>{translations[language].languages}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {languages.map((lang, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1em', color: '#475569', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                    <span>{typeof lang === 'object' ? lang.name : lang}</span>
                    <span style={{ fontWeight: 600, color: palette.primary }}>{typeof lang === 'object' ? lang.level : ''}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {cvData.skills.length > 0 && (
            <div style={{ width: '100%', marginBottom: 24 }}>
              <div style={{ fontWeight: 700, color: palette.primary, marginBottom: 12, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: isRtl ? 'right' : 'left' }}>{translations[language].skills}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {cvData.skills.map((skill, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1em', fontWeight: 600, color: '#1e293b', marginBottom: 4, flexDirection: isRtl ? 'row-reverse' : 'row' }}><span>{typeof skill === 'object' ? skill.name : skill}</span></div>
                    <div style={{ background: '#f1f5f9', borderRadius: 10, height: 6, width: '100%', overflow: 'hidden' }}>
                      <div style={{ background: palette.primary, height: '100%', borderRadius: 10, width: `${typeof skill === 'object' && skill.level ? (skill.level === 'Expert' ? 100 : skill.level === 'Advanced' ? 80 : skill.level === 'Intermediate' ? 60 : 40) : 60}%`, float: isRtl ? 'right' : 'left' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {cvData.interests && cvData.interests.length > 0 && (
            <div style={{ width: '100%', marginBottom: 24 }}>
              <div style={{ fontWeight: 700, color: palette.primary, marginBottom: 12, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: isRtl ? 'right' : 'left' }}>{translations[language].interests}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {cvData.interests.map((interest, i) => (
                  <div key={i} style={{ padding: '4px 10px', background: palette.secondary, color: palette.primary, borderRadius: 4, fontSize: '0.9em', fontWeight: 600 }}>
                    {typeof interest === 'object' ? interest.name : interest}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0, background: palette.mainBg, padding: isRtl ? '40px 30px 40px 40px' : '40px 40px 40px 30px', display: 'flex', flexDirection: 'column' }}>
          {summary && (
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontWeight: 800, fontSize: '1.5em', color: palette.primary, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10, flexDirection: isRtl ? 'row-reverse' : 'row' }}><span style={{ width: 4, height: 18, background: palette.primary, borderRadius: 2 }} />{translations[language].profile}</div>
              <div style={{ color: '#475569', fontSize: '1.167em', lineHeight: 1.6, textAlign: isRtl ? 'right' : 'justify' }}>{summary}</div>
            </div>
          )}
          {experience.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontWeight: 800, fontSize: 18, color: palette.primary, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10, flexDirection: isRtl ? 'row-reverse' : 'row' }}><span style={{ width: 4, height: 18, background: palette.primary, borderRadius: 2 }} />{translations[language].experience}</div>
              <div style={{ position: 'relative', [isRtl ? 'marginRight' : 'marginLeft']: 8, [isRtl ? 'paddingRight' : 'paddingLeft']: 24, [isRtl ? 'borderRight' : 'borderLeft']: `2px solid ${palette.secondary}` }}>
                {experience.map((exp, i) => (
                  <div key={i} style={{ marginBottom: 32, position: 'relative' }}>
                    <div style={{ position: 'absolute', [isRtl ? 'right' : 'left']: -33, top: 2, width: 16, height: 16, background: '#fff', borderRadius: '50%', border: `3px solid ${palette.primary}`, zIndex: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                      <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '1.25em', textAlign: isRtl ? 'right' : 'left' }}>{exp.position}</div>
                      <div style={{ fontSize: '0.917em', fontWeight: 700, color: palette.primary, background: palette.secondary, padding: '2px 8px', borderRadius: 4, whiteSpace: 'nowrap' }}>{exp.startDate} — {exp.endDate || 'Present'}</div>
                    </div>
                    <div style={{ fontWeight: 600, color: '#64748b', fontSize: '1.083em', marginBottom: 8, textAlign: isRtl ? 'right' : 'left' }}>
                      {exp.company} {exp.location && `• ${exp.location}`}
                    </div>
                    <div style={{ color: '#475569', fontSize: '1.083em', lineHeight: 1.5, textAlign: isRtl ? 'right' : 'left' }}>{renderDescription(exp.description)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {education.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontWeight: 800, fontSize: 18, color: palette.primary, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10, flexDirection: isRtl ? 'row-reverse' : 'row' }}><span style={{ width: 4, height: 18, background: palette.primary, borderRadius: 2 }} />{translations[language].education}</div>
              <div style={{ position: 'relative', [isRtl ? 'marginRight' : 'marginLeft']: 8, [isRtl ? 'paddingRight' : 'paddingLeft']: 24, [isRtl ? 'borderRight' : 'borderLeft']: `2px solid ${palette.secondary}` }}>
                {education.map((edu, i) => (
                  <div key={i} style={{ marginBottom: 24, position: 'relative' }}>
                    <div style={{ position: 'absolute', [isRtl ? 'right' : 'left']: -33, top: 2, width: 16, height: 16, background: '#fff', borderRadius: '50%', border: `3px solid ${palette.primary}`, zIndex: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                      <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '1.25em', textAlign: isRtl ? 'right' : 'left' }}>{edu.degree}</div>
                      <div style={{ fontSize: '0.917em', fontWeight: 700, color: palette.primary, background: palette.secondary, padding: '2px 8px', borderRadius: 4, whiteSpace: 'nowrap' }}>{edu.startDate} — {edu.endDate}</div>
                    </div>
                    <div style={{ fontWeight: 600, color: '#64748b', fontSize: '1.083em', marginBottom: 8, textAlign: isRtl ? 'right' : 'left' }}>
                      {edu.school} {edu.city && `• ${edu.city}`}
                    </div>
                    {edu.description && <div style={{ color: '#475569', fontSize: '1.083em', lineHeight: 1.5, textAlign: isRtl ? 'right' : 'left' }}>{renderDescription(edu.description)}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
          {certificates && certificates.length > 0 && (
            <div>
              <div style={{ fontWeight: 800, fontSize: 18, color: palette.primary, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10, flexDirection: isRtl ? 'row-reverse' : 'row' }}><span style={{ width: 4, height: 18, background: palette.primary, borderRadius: 2 }} />{translations[language].certificates}</div>
              <div style={{ position: 'relative', [isRtl ? 'marginRight' : 'marginLeft']: 8, [isRtl ? 'paddingRight' : 'paddingLeft']: 24, [isRtl ? 'borderRight' : 'borderLeft']: `2px solid ${palette.secondary}` }}>
                {certificates.map((cert, i) => (
                  <div key={i} style={{ marginBottom: 24, position: 'relative' }}>
                    <div style={{ position: 'absolute', [isRtl ? 'right' : 'left']: -33, top: 2, width: 16, height: 16, background: '#fff', borderRadius: '50%', border: `3px solid ${palette.primary}`, zIndex: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                      <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '1.25em', textAlign: isRtl ? 'right' : 'left' }}>{cert.name}</div>
                      <div style={{ fontSize: '0.917em', fontWeight: 700, color: palette.primary, background: palette.secondary, padding: '2px 8px', borderRadius: 4, whiteSpace: 'nowrap' }}>{cert.endDate === 'Present' ? translations[language].present : cert.endDate}</div>
                    </div>
                    <div style={{ color: '#475569', fontSize: '1.083em', lineHeight: 1.5, textAlign: isRtl ? 'right' : 'left' }}>{renderDescription(cert.description)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineTemplate;
