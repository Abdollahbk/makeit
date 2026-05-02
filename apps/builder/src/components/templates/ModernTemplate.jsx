import React from 'react';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaLinkedin, FaGithub,
  FaCalendarAlt, FaMapPin, FaCar, FaVenusMars, FaFlag, FaHeart, FaInfoCircle,
  FaUser, FaBriefcase, FaGraduationCap, FaCertificate, FaTools, FaLanguage
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

/**
 * ModernTemplate Analysis:
 * 1. Layout: 2-column (Sidebar ~33%, Main ~67%).
 * 2. Graphics: Geometric yellow triangles at Top-Left and Bottom-Right.
 * 3. Photo: Arched-top frame positioned over a diagonal background cut.
 * 4. Typography: Bold uppercase headings, light gray banner for name.
 * 5. Accents: Vertical timeline lines with circular nodes for ALL sections.
 * 6. Layers: Background -> Lines -> Nodes/Icons -> Content.
 */
const ModernTemplate = ({ cvData, font, fontSize, textColor, language }) => {
  const { personalInfo, summary, experience, education, skills, languages, interests, certificates } = cvData;
  const isRtl = language === 'ar';
  
  const palette = {
    primary: textColor, // The "Yellow" accent
    dark: '#2c2c2c',    // Sidebar background
    lightBg: '#f2f2f2', // Name banner background
    white: '#ffffff',
    textMain: '#1a1a1a',
    textSidebar: '#ffffff',
    textMuted: '#666666',
    lineColor: '#dddddd',
    sidebarLine: '#555555'
  };

  const lProp = isRtl ? 'right' : 'left';
  const rProp = isRtl ? 'left' : 'right';

  // Section Header Component for consistent styling
  const SectionHeader = ({ icon, title, isSidebar }) => (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px', 
      marginBottom: '20px', 
      position: 'relative', 
      zIndex: 2,
      flexDirection: isRtl ? 'row-reverse' : 'row'
    }}>
      <div style={{ 
        width: '32px', 
        height: '32px', 
        borderRadius: '50%', 
        background: palette.primary, 
        color: palette.dark, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontSize: '14px'
      }}>
        {icon}
      </div>
      <h2 style={{ 
        fontSize: '1.2em', 
        fontWeight: 900, 
        margin: 0, 
        textTransform: 'uppercase', 
        color: isSidebar ? palette.textSidebar : palette.textMain,
        letterSpacing: '0.05em'
      }}>
        {title}
      </h2>
    </div>
  );

  return (
    <div style={{
      fontFamily: font,
      fontSize: `${fontSize}px`,
      color: palette.textMain,
      direction: isRtl ? 'rtl' : 'ltr',
      width: '100%',
      height: '100%',
      background: palette.white,
      display: 'flex',
      overflow: 'hidden',
      position: 'relative',
      boxSizing: 'border-box'
    }}>
      {/* Background Shapes */}
      <div style={{
        width: '35%',
        height: '100%',
        background: palette.dark,
        position: 'absolute',
        [lProp]: 0,
        top: 0,
        zIndex: 0
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          [lProp]: 0,
          width: '100%',
          height: '240px',
          background: `linear-gradient(to ${isRtl ? 'bottom left' : 'bottom right'}, ${palette.primary} 50%, transparent 50%)`,
          zIndex: 0
        }} />
      </div>
      
      <div style={{
        position: 'absolute',
        bottom: 0,
        [rProp]: 0,
        width: '80px',
        height: '80px',
        background: `linear-gradient(to ${isRtl ? 'bottom left' : 'bottom right'}, transparent 50%, ${palette.primary} 50%)`,
        zIndex: 1
      }} />

      {/* Content Layer */}
      <div style={{ display: 'flex', width: '100%', height: '100%', position: 'relative', zIndex: 2 }}>
        {/* SIDEBAR */}
        <div style={{ width: '35%', color: palette.textSidebar, display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: '280px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: '30px' }}>
            {personalInfo.photo && (
              <div style={{ width: '160px', height: '190px', background: '#fff', borderRadius: personalInfo.photoAppearance === 'circle' ? '50%' : personalInfo.photoAppearance === 'arched' ? '80px 80px 0 0' : '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', border: '4px solid #fff' }}>
                <img src={personalInfo.photo} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${personalInfo.photoZoom || 1}) translate(${personalInfo.photoPosX || 0}%, ${personalInfo.photoPosY || 0}%)` }} alt="Profile" />
              </div>
            )}
          </div>
          <div style={{ padding: '20px 35px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, bottom: 0, [lProp]: '51px', width: '1.5px', background: palette.sidebarLine, zIndex: 1 }} />
            {(personalInfo.phone || personalInfo.email || personalInfo.location) && (
              <section style={{ marginBottom: '40px', position: 'relative', zIndex: 2 }}>
                <SectionHeader icon={<FaPhone />} title={translations[language].contact} isSidebar />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', paddingLeft: isRtl ? 0 : '45px', paddingRight: isRtl ? '45px' : 0 }}>
                  {personalInfo.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexDirection: isRtl ? 'row-reverse' : 'row' }}><FaPhone style={{ color: palette.primary }} /> {personalInfo.phone}</div>}
                  {personalInfo.email && <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexDirection: isRtl ? 'row-reverse' : 'row' }}><FaEnvelope style={{ color: palette.primary }} /> <span style={{ wordBreak: 'break-all' }}>{personalInfo.email}</span></div>}
                  {personalInfo.location && <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexDirection: isRtl ? 'row-reverse' : 'row' }}><FaMapMarkerAlt style={{ color: palette.primary }} /> {personalInfo.location}</div>}
                </div>
              </section>
            )}
            {skills.length > 0 && (
              <section style={{ marginBottom: '40px', position: 'relative', zIndex: 2 }}>
                <SectionHeader icon={<FaTools />} title={translations[language].skills} isSidebar />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', paddingLeft: isRtl ? 0 : '45px', paddingRight: isRtl ? '45px' : 0 }}>
                  {skills.map((skill, idx) => (
                    <div key={idx} style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', [lProp]: '-20px', top: '7px', width: '8px', height: '8px', borderRadius: '50%', background: palette.primary }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85em', fontWeight: 800, textTransform: 'uppercase', marginBottom: '5px' }}>
                        <span>{typeof skill === 'object' ? skill.name : skill}</span>
                      </div>
                      <div style={{ height: '6px', background: '#444', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: typeof skill === 'object' && skill.level ? (skill.level === 'Expert' ? '100%' : skill.level === 'Advanced' ? '80%' : skill.level === 'Intermediate' ? '60%' : '40%') : '75%', background: palette.primary }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {languages.length > 0 && (
              <section style={{ position: 'relative', zIndex: 2 }}>
                <SectionHeader icon={<FaLanguage />} title={translations[language].languages} isSidebar />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: isRtl ? 0 : '45px', paddingRight: isRtl ? '45px' : 0 }}>
                  {languages.map((lang, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95em', position: 'relative' }}>
                      <div style={{ position: 'absolute', [lProp]: '-20px', top: '7px', width: '8px', height: '8px', borderRadius: '50%', background: palette.primary }} />
                      <span>{typeof lang === 'object' ? lang.name : lang}</span>
                      <span style={{ color: palette.primary, fontWeight: 700 }}>{typeof lang === 'object' ? lang.level : ''}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {interests && interests.length > 0 && (
              <section style={{ marginTop: '40px', position: 'relative', zIndex: 2 }}>
                <SectionHeader icon={<FaHeart />} title={translations[language].interests} isSidebar />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingLeft: isRtl ? 0 : '45px', paddingRight: isRtl ? '45px' : 0 }}>
                  {interests.map((interest, idx) => (
                    <div key={idx} style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '15px', fontSize: '0.85em' }}>
                      {typeof interest === 'object' ? interest.name : interest}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* MAIN PANEL */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: '200px', background: palette.lightBg, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 60px', textAlign: isRtl ? 'right' : 'left', marginTop: '40px', position: 'relative', zIndex: 2 }}>
            <h1 style={{ fontSize: '3.5em', fontWeight: 900, margin: 0, lineHeight: 1, color: palette.textMain, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
              {personalInfo.firstName} <span style={{ color: palette.primary }}>{personalInfo.lastName}</span>
            </h1>
            <div style={{ fontSize: '1.2em', fontWeight: 700, color: palette.textMuted, marginTop: '15px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              {personalInfo.title}
            </div>
          </div>
          <div style={{ padding: isRtl ? '40px 30px 40px 40px' : '40px 40px 40px 30px', position: 'relative', flex: 1 }}>
            <div style={{ position: 'absolute', top: 0, bottom: 0, [lProp]: '46px', width: '1.5px', background: palette.lineColor, zIndex: 1 }} />
            {summary && (
              <section style={{ marginBottom: '40px', position: 'relative', zIndex: 2 }}>
                <SectionHeader icon={<FaUser />} title={translations[language].profile} />
                <div style={{ paddingLeft: isRtl ? 0 : '35px', paddingRight: isRtl ? '35px' : 0 }}>
                  <p style={{ margin: 0, lineHeight: 1.6, color: palette.textMuted, textAlign: isRtl ? 'right' : 'justify' }}>{summary}</p>
                </div>
              </section>
            )}
            {experience.length > 0 && (
              <section style={{ marginBottom: '40px', position: 'relative', zIndex: 2 }}>
                <SectionHeader icon={<FaBriefcase />} title={translations[language].experience} />
                {experience.map((exp, idx) => (
                  <div key={idx} style={{ marginBottom: '30px', paddingLeft: isRtl ? 0 : '35px', paddingRight: isRtl ? '35px' : 0, position: 'relative' }}>
                    <div style={{ position: 'absolute', [lProp]: '-20px', top: '5px', width: '10px', height: '10px', borderRadius: '50%', background: palette.primary, border: `2px solid ${palette.white}` }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                      <h3 style={{ fontSize: '1.1em', fontWeight: 900, margin: 0 }}>{exp.position}</h3>
                      <span style={{ fontSize: '0.9em', fontWeight: 700, color: palette.textMuted }}>{exp.startDate} — {exp.endDate}</span>
                    </div>
                    <div style={{ fontWeight: 700, color: palette.primary, fontSize: '0.95em', marginBottom: '8px' }}>
                      {exp.company} {exp.location && <span style={{ color: palette.textMuted, fontWeight: 500 }}>• {exp.location}</span>}
                    </div>
                    <div style={{ color: palette.textMuted, lineHeight: 1.5, fontSize: '0.9em' }}>{renderDescription(exp.description)}</div>
                  </div>
                ))}
              </section>
            )}
            {education.length > 0 && (
              <section style={{ marginBottom: '40px', position: 'relative', zIndex: 2 }}>
                <SectionHeader icon={<FaGraduationCap />} title={translations[language].education} />
                {education.map((edu, idx) => (
                  <div key={idx} style={{ marginBottom: '20px', paddingLeft: isRtl ? 0 : '35px', paddingRight: isRtl ? '35px' : 0, position: 'relative' }}>
                    <div style={{ position: 'absolute', [lProp]: '-20px', top: '5px', width: '10px', height: '10px', borderRadius: '50%', background: palette.primary, border: `2px solid ${palette.white}` }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                      <h3 style={{ fontSize: '1.1em', fontWeight: 900, margin: 0 }}>{edu.degree}</h3>
                      <span style={{ fontSize: '0.9em', fontWeight: 700, color: palette.textMuted }}>{edu.startDate} — {edu.endDate}</span>
                    </div>
                    <div style={{ fontWeight: 700, color: palette.primary, fontSize: '0.95em', marginBottom: '5px' }}>
                      {edu.school} {edu.city && <span style={{ color: palette.textMuted, fontWeight: 500 }}>• {edu.city}</span>}
                    </div>
                    {edu.description && <div style={{ color: palette.textMuted, lineHeight: 1.5, fontSize: '0.9em', marginTop: '5px' }}>{renderDescription(edu.description)}</div>}
                  </div>
                ))}
              </section>
            )}
            {certificates && certificates.length > 0 && (
              <section style={{ marginBottom: '40px', position: 'relative', zIndex: 2 }}>
                <SectionHeader icon={<FaCertificate />} title={translations[language].certificates} />
                {certificates.map((cert, idx) => (
                  <div key={idx} style={{ marginBottom: '20px', paddingLeft: isRtl ? 0 : '35px', paddingRight: isRtl ? '35px' : 0, position: 'relative' }}>
                    <div style={{ position: 'absolute', [lProp]: '-20px', top: '5px', width: '10px', height: '10px', borderRadius: '50%', background: palette.primary, border: `2px solid ${palette.white}` }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                      <h3 style={{ fontSize: '1.1em', fontWeight: 900, margin: 0 }}>{cert.name}</h3>
                      <span style={{ fontSize: '0.9em', fontWeight: 700, color: palette.textMuted }}>{cert.endDate}</span>
                    </div>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
