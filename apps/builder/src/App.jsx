import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import CVForm from './components/CVForm';
import CVPreview from './components/CVPreview';
import DownloadButton from './components/DownloadButton';
import Toolbar from './components/Toolbar';
import './styles/colors.css';
import translations from './translations';
import { FiGlobe, FiDownload, FiEye, FiEdit2 } from 'react-icons/fi';
import { FiChevronDown } from 'react-icons/fi';
import { MdViewCarousel } from 'react-icons/md';
import ReactDOM from 'react-dom';

const Root = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: var(--slate-950);
  color: var(--slate-50);
  overflow: hidden;
`;

const TopBar = styled.header`
  height: 64px;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: var(--glass-blur);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 100;
  box-shadow: var(--shadow-md);
`;

const MainSplit = styled.div`
  flex: 1 1 0;
  display: flex;
  min-height: 0;
  height: calc(100vh - 64px);
  background: var(--slate-950);
  overflow: hidden;
`;

const LeftPanel = styled.div`
  width: 55%;
  background: var(--surface);
  border-right: 1px solid var(--border);
  height: 100%;
  padding: 2rem 3rem;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  box-shadow: 10px 0 30px rgba(0, 0, 0, 0.02);

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
    border: none;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem 1.5rem;
    display: ${props => props.$mobileView === 'form' ? 'block' : 'none'};
  }
`;

export const PreviewWrapper = styled.div`
  width: 210mm;
  height: 296mm;
  background: #fff;
  margin: 0;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
  direction: ${props => props.language === 'ar' ? 'rtl' : 'ltr'};
`;

const RightPanel = styled.div`
  flex: 1;
  background: #f1f5f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  background-image: 
    radial-gradient(circle at 2px 2px, rgba(0, 0, 0, 0.05) 1px, transparent 0);
  background-size: 32px 32px;

  @media (max-width: 768px) {
    width: 100%;
    display: ${props => props.$mobileView === 'preview' ? 'flex' : 'none'};
  }
`;

const ToolbarWrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 50;
  background: rgba(241, 245, 249, 0.8);
  backdrop-filter: blur(8px);
  padding: 0.75rem 0;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid var(--slate-200);
`;

const PreviewContainer = styled.div`
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: #f1f5f9;
  min-height: calc(100vh - 120px);
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  padding-bottom: 50px;
`;

const PageSheet = styled.div`
  width: 210mm;
  height: 297mm;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
`;

const MeasurementWrapper = styled.div`
  position: absolute;
  left: -9999px;
  top: 0;
  width: 210mm;
  height: auto;
  background: white;
  z-index: -1;
  opacity: 0;
  pointer-events: none;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--slate-900);
  margin: 2rem 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

import { initialCVData, templateOptions, templateThumbnails, languageOptions } from './constants';

const Logo = styled.div`
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.25rem;
  letter-spacing: -0.02em;
  background: linear-gradient(to right, #fff, var(--slate-400));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: var(--radius-full);
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const TemplateIconButton = styled(NavButton)`
  padding: 0.5rem;
  border-radius: var(--radius);
`;

const MobileToggleButton = styled.button`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: var(--primary-blue, #2563eb);
    color: white;
    border: none;
    border-radius: 50px;
    padding: 14px 24px;
    font-size: 1rem;
    font-weight: 700;
    box-shadow: 0 4px 20px rgba(37,99,235,0.4);
    z-index: 1000;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;

    &:active {
      transform: scale(0.95);
    }
  }
`;

function App() {
  const [cvData, setCVData] = useState(initialCVData);
  const [template, setTemplate] = useState('basic');
  const [zoom, setZoom] = useState(window.innerWidth <= 768 ? 0.5 : 0.6);
  const [font, setFont] = useState('Inter');
  const [fontSize, setFontSize] = useState(12);
  const [textColor, setTextColor] = useState('#000000');
  const [previewVisible, setPreviewVisible] = useState(true);
  const [mobileView, setMobileView] = useState('form');
  const [fullscreen, setFullscreen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langBtnRef = useRef();
  const langMenuRef = useRef();

  const currentLang = languageOptions.find(l => l.code === language) || languageOptions[0];
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  
  // Close language menu on outside click
  useEffect(() => {
    if (!langMenuOpen) return;
    function handleClick(e) {
      if (
        langBtnRef.current && !langBtnRef.current.contains(e.target) &&
        langMenuRef.current && !langMenuRef.current.contains(e.target)
      ) {
        setLangMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [langMenuOpen]);

  const updateCVData = (section, data) => {
    setCVData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleZoom = (delta) => {
    setZoom(z => Math.max(0.5, Math.min(2, Math.round((z + delta) * 10) / 10)));
  };

  const handlePreviewToggle = () => setPreviewVisible(v => !v);
  const handleFullscreenToggle = () => setFullscreen(v => !v);

  return (
    <Root>
      <TopBar>
        <Logo>{translations[language].cvTitle}</Logo>
        <ActionGroup>
          <div style={{ position: 'relative' }}>
            <NavButton
              ref={langBtnRef}
              aria-label="Change language"
              onClick={() => setLangMenuOpen(v => !v)}
            >
              <FiGlobe style={{ fontSize: 18 }} />
              <span style={{ letterSpacing: '0.05em' }}>{currentLang.code.toUpperCase()}</span>
              <FiChevronDown style={{ 
                fontSize: 16, 
                transition: 'transform 0.2s', 
                transform: langMenuOpen ? 'rotate(180deg)' : 'none' 
              }} />
            </NavButton>
            {/* Render the language dropdown menu in a portal to ensure it appears above all UI elements */}
            {langMenuOpen && ReactDOM.createPortal(
              <div
                ref={langMenuRef}
                style={{
                  position: 'absolute',
                  top: langBtnRef.current ? (langBtnRef.current.getBoundingClientRect().bottom + window.scrollY + 8) : 0,
                  left: langBtnRef.current ? (langBtnRef.current.getBoundingClientRect().left + window.scrollX) : 0,
                  background: 'var(--slate-900)',
                  color: '#fff',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-xl)',
                  minWidth: 180,
                  zIndex: 99999,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  overflow: 'hidden',
                  padding: '4px',
                }}
              >
                {languageOptions.map(opt => (
                  <div
                    key={opt.code}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '0.75rem 1rem', cursor: 'pointer', 
                      fontWeight: language === opt.code ? 700 : 500,
                      borderRadius: 'var(--radius)',
                      background: language === opt.code ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      color: language === opt.code ? '#fff' : 'var(--slate-400)',
                      transition: 'all 0.15s',
                    }}
                    onClick={() => { setLanguage(opt.code); setLangMenuOpen(false); }}
                    onMouseEnter={e => {
                      if (language !== opt.code) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.color = '#fff';
                      }
                    }}
                    onMouseLeave={e => {
                      if (language !== opt.code) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--slate-400)';
                      }
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{opt.flag}</span>
                    <span>{opt.label}</span>
                  </div>
                ))}
              </div>,
              document.body
            )}
          </div>
          {/* Template menu icon button */}
          <TemplateIconButton
            onClick={() => setShowTemplateModal(v => !v)}
            title={translations[language].chooseTemplate}
          >
            <MdViewCarousel size={22} />
          </TemplateIconButton>
          {/* Template Modal Popup */}
          {showTemplateModal && ReactDOM.createPortal(
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'transparent',
                zIndex: 99999,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
              }}
              onClick={() => setShowTemplateModal(false)}
            >
              <div
                style={{
                  marginTop: 70,
                  marginRight: 40,
                  background: 'transparent',
                  borderRadius: 14,
                  boxShadow: 'none',
                  padding: '22px 18px 18px 18px',
                  minWidth: 420,
                  maxWidth: 480,
                  minHeight: 120,
                  maxHeight: 220,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                  position: 'relative',
                  zIndex: 100001,
                }}
                onClick={e => e.stopPropagation()}
              >
                {/* Modal content here (no close button) */}
                <div style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  padding: '0 0 8px 0',
                }}>
                  <div style={{
                    display: 'flex',
                    overflowX: 'auto',
                    gap: 14,
                    padding: '2px 0 2px 0',
                    width: '100%',
                    scrollbarColor: '#cbd5e1 #f1f5f9',
                    scrollbarWidth: 'thin',
                    borderRadius: 8,
                    background: '#f8fafc',
                    boxShadow: '0 1px 8px #2563eb11',
                  }}>
                    {templateOptions.map(opt => (
                      <div
                        key={opt.value}
                        onClick={() => { setTemplate(opt.value); setShowTemplateModal(false); }}
                        style={{
                          minWidth: 110,
                          maxWidth: 130,
                          flex: '0 0 110px',
                          height: 170,
                          borderRadius: 10,
                          border: template === opt.value ? '2.5px solid #2563eb' : '1.5px solid #e5e7eb',
                          boxShadow: template === opt.value ? '0 0 0 2px #2563eb33' : '0 1px 4px #0001',
                          background: '#fff',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          padding: 8,
                          transition: 'border 0.18s, box-shadow 0.18s',
                          outline: template === opt.value ? '2px solid #2563eb' : 'none',
                          outlineOffset: 2,
                          position: 'relative',
                        }}
                      >
                        {/* Static SVG mini-thumbnail for each template */}
                        <div style={{
                          width: 90,
                          height: 127,
                          background: '#f3f4f6',
                          borderRadius: 6,
                          marginBottom: 7,
                          overflow: 'hidden',
                          boxShadow: '0 1px 4px #0001',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          padding: 2,
                        }}>
                          {templateThumbnails[opt.value]}
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: template === opt.value ? '#2563eb' : '#222', textAlign: 'center', whiteSpace: 'normal', lineHeight: 1.1 }}>{opt.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )}
          {/* End Template Modal Popup */}
          <DownloadButton cvData={cvData} template={template} language={language} />
        </ActionGroup>
      </TopBar>
      <MainSplit>
        {!fullscreen && (
          <LeftPanel $mobileView={mobileView}>
            <CVForm cvData={cvData} updateCVData={updateCVData} language={language} />
          </LeftPanel>
        )}
        <RightPanel $mobileView={mobileView}>
          <ToolbarWrapper>
            <Toolbar
              font={font}
              setFont={setFont}
              fontSize={fontSize}
              setFontSize={setFontSize}
              zoom={zoom}
              setZoom={setZoom}
              textColor={textColor}
              setTextColor={setTextColor}
              language={language}
              onFullscreen={handleFullscreenToggle}
              fullscreen={fullscreen}
            />
          </ToolbarWrapper>
          <PreviewContainer>
            <PageContainer style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}>
              <PageSheet>
                <CVPreview 
                  cvData={cvData} 
                  font={font} 
                  fontSize={fontSize}
                  textColor={textColor}
                  language={language}
                  template={template}
                />
              </PageSheet>
            </PageContainer>
            
            {/* Hidden container for high-quality export */}
            <MeasurementWrapper id="cv-preview-measurement">
              <PageSheet>
                <CVPreview 
                  cvData={cvData} 
                  font={font} 
                  fontSize={fontSize}
                  textColor={textColor}
                  language={language}
                  template={template}
                />
              </PageSheet>
            </MeasurementWrapper>
          </PreviewContainer>
        </RightPanel>
      </MainSplit>

      {/* Mobile Toggle Button */}
      <MobileToggleButton onClick={() => setMobileView(v => v === 'form' ? 'preview' : 'form')}>
        {mobileView === 'form' ? (
          <>
            <FiEye size={20} />
            Preview
          </>
        ) : (
          <>
            <FiEdit2 size={20} />
            Edit Info
          </>
        )}
      </MobileToggleButton>
    </Root>
  );
}

export default App; 