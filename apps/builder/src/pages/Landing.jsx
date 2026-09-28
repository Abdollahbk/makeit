import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { 
  FiArrowRight, 
  FiFileText, 
  FiDownload, 
  FiLayout, 
  FiCheckCircle, 
  FiStar, 
  FiShield, 
  FiGlobe
} from 'react-icons/fi';

/* ─── Keyframes ───────────────────────────────────────────── */
const floatAnim = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.35; transform: scale(1); }
  50% { opacity: 0.65; transform: scale(1.08); }
`;

const shimmer = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

/* ─── Styles ─────────────────────────────────────────────── */
const PageRoot = styled.div`
  min-height: 100vh;
  background-color: #030712;
  color: #f9fafb;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow-x: hidden;
  position: relative;
`;

const AmbientLight1 = styled.div`
  position: absolute;
  top: -120px;
  left: 20%;
  width: 550px;
  height: 550px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(99, 102, 241, 0.1) 50%, transparent 70%);
  filter: blur(80px);
  pointer-events: none;
  animation: ${pulseGlow} 10s ease-in-out infinite;
`;

const AmbientLight2 = styled.div`
  position: absolute;
  top: 30%;
  right: 5%;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, rgba(59, 130, 246, 0.06) 50%, transparent 70%);
  filter: blur(100px);
  pointer-events: none;
`;

const AmbientLight3 = styled.div`
  position: absolute;
  bottom: 10%;
  left: 10%;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%);
  filter: blur(100px);
  pointer-events: none;
`;

/* Navbar */
const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(1.2rem, 5vw, 4rem);
  z-index: 1000;
  background: ${props => props.$scrolled ? 'rgba(3, 7, 18, 0.9)' : 'transparent'};
  backdrop-filter: ${props => props.$scrolled ? 'blur(16px)' : 'none'};
  border-bottom: 1px solid ${props => props.$scrolled ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  transition: all 0.3s ease;
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #ffffff;
  font-weight: 800;
  font-size: 1.4rem;
  letter-spacing: -0.03em;

  .accent {
    background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const BrandIcon = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2.2rem;

  @media (max-width: 820px) {
    display: none;
  }
`;

const NavItem = styled.a`
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s;
  cursor: pointer;

  &:hover {
    color: #ffffff;
  }
`;

const NavCTA = styled.button`
  background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
  color: #ffffff;
  border: none;
  padding: 0.65rem 1.4rem;
  border-radius: 100px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.35);
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(37, 99, 235, 0.5);
  }
`;

/* Hero Section */
const HeroSection = styled.section`
  min-height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 130px 1.5rem 60px;
  position: relative;
  z-index: 10;
`;

const TagBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  background: rgba(37, 99, 235, 0.18);
  border: 1px solid rgba(96, 165, 250, 0.4);
  border-radius: 9999px;
  font-size: 0.88rem;
  font-weight: 600;
  color: #93c5fd;
  margin-bottom: 1.8rem;
  animation: ${fadeUp} 0.8s ease-out;

  span.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #38bdf8;
    box-shadow: 0 0 10px #38bdf8;
  }
`;

const HeroHeading = styled.h1`
  font-size: clamp(2.6rem, 6.5vw, 5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.1;
  max-width: 920px;
  margin-bottom: 1.6rem;
  color: #ffffff !important;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.5);
  animation: ${fadeUp} 0.9s ease-out;

  .highlight {
    background: linear-gradient(135deg, #60a5fa 0%, #c084fc 40%, #f472b6 100%);
    background-size: 200% 200%;
    animation: ${shimmer} 6s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
  }
`;

const HeroSubtext = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: #cbd5e1;
  max-width: 680px;
  line-height: 1.7;
  margin-bottom: 2.6rem;
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.4);
  animation: ${fadeUp} 1s ease-out;
`;

const HeroButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  flex-wrap: wrap;
  animation: ${fadeUp} 1.1s ease-out;
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  color: #ffffff;
  border: none;
  padding: 1rem 2.4rem;
  border-radius: 14px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.5);
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 18px 35px -5px rgba(37, 99, 235, 0.65);
  }
`;

const SecondaryButton = styled.a`
  background: rgba(255, 255, 255, 0.06);
  color: #f1f5f9;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 1rem 2.2rem;
  border-radius: 14px;
  font-size: 1.05rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.3);
    color: #ffffff;
  }
`;

/* Hero Mockup Preview Card */
const MockupContainer = styled.div`
  margin-top: 4rem;
  width: 100%;
  max-width: 980px;
  position: relative;
  animation: ${fadeUp} 1.2s ease-out;
`;

const MockupWindow = styled.div`
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 50px rgba(59, 130, 246, 0.15);
  backdrop-filter: blur(20px);
  overflow: hidden;
  position: relative;
`;

const MockupHeader = styled.div`
  height: 44px;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 8px;

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .red { background: #ef4444; }
  .yellow { background: #eab308; }
  .green { background: #22c55e; }

  .title-bar {
    margin-left: auto;
    margin-right: auto;
    font-size: 0.82rem;
    color: #94a3b8;
    font-weight: 600;
  }
`;

const MockupBody = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  padding: 28px;
  gap: 24px;
  min-height: 380px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MockupSide = styled.div`
  text-align: left;
  padding: 1rem;

  h3 {
    font-size: 1.55rem;
    font-weight: 700;
    margin-bottom: 0.8rem;
    color: #ffffff;
  }

  p {
    color: #cbd5e1;
    font-size: 0.98rem;
    line-height: 1.65;
    margin-bottom: 1.5rem;
  }
`;

const BulletList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const BulletItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  color: #e2e8f0;

  svg {
    color: #38bdf8;
    flex-shrink: 0;
  }
`;

const MiniCVCard = styled.div`
  background: #ffffff;
  color: #1e293b;
  border-radius: 12px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  padding: 24px;
  position: relative;
  text-align: left;
  animation: ${floatAnim} 6s ease-in-out infinite;

  .cv-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 18px;
    border-bottom: 2px solid #2563eb;
    padding-bottom: 14px;
  }

  .avatar {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #475569;
    font-weight: 700;
    font-size: 1rem;
  }

  .name {
    font-size: 1.15rem;
    font-weight: 700;
    color: #0f172a;
  }

  .role {
    font-size: 0.8rem;
    color: #2563eb;
    font-weight: 600;
  }

  .section-row {
    margin-bottom: 12px;
  }

  .sec-title {
    font-size: 0.72rem;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: #64748b;
    margin-bottom: 6px;
  }

  .bar {
    height: 7px;
    background: #f1f5f9;
    border-radius: 4px;
    margin-bottom: 5px;
    &.filled { background: #cbd5e1; }
    &.primary { background: #93c5fd; }
  }

  .badge-tag {
    position: absolute;
    top: -12px;
    right: 20px;
    background: #10b981;
    color: #fff;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.72rem;
    font-weight: 700;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
  }
`;

/* Section Layouts */
const Section = styled.section`
  padding: 110px clamp(1.5rem, 6vw, 6rem);
  position: relative;
  z-index: 10;
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 680px;
  margin: 0 auto 60px;

  h2 {
    font-size: clamp(2rem, 3.8vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    margin-bottom: 1rem;
    color: #ffffff;
  }

  p {
    color: #cbd5e1;
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

/* Feature Cards */
const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 32px;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(59, 130, 246, 0.45);
    transform: translateY(-5px);
    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
  }

  .icon-box {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    margin-bottom: 20px;
    background: ${props => props.$colorBg || 'rgba(37, 99, 235, 0.15)'};
    color: ${props => props.$colorText || '#60a5fa'};
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 10px;
    color: #ffffff;
  }

  p {
    color: #94a3b8;
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

/* Templates Showcase */
const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
  gap: 30px;
  max-width: 1100px;
  margin: 0 auto;
`;

const TemplateCard = styled.div`
  background: rgba(15, 23, 42, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 22px;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: rgba(99, 102, 241, 0.55);
    transform: translateY(-6px);
    box-shadow: 0 20px 40px -10px rgba(99, 102, 241, 0.25);
  }
`;

const TemplateThumbnail = styled.div`
  height: 220px;
  background: ${props => props.$bg};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px;

  .preview-sheet {
    width: 140px;
    height: 190px;
    background: #ffffff;
    border-radius: 6px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    transform: rotate(-2deg);
    transition: transform 0.3s ease;
  }

  &:hover .preview-sheet {
    transform: rotate(0deg) scale(1.05);
  }
`;

const TemplateInfo = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;

  .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #ffffff;
  }

  .badge {
    font-size: 0.75rem;
    padding: 3px 10px;
    border-radius: 20px;
    background: rgba(37, 99, 235, 0.2);
    color: #93c5fd;
    font-weight: 600;
  }

  p {
    color: #94a3b8;
    font-size: 0.92rem;
    line-height: 1.55;
    margin-bottom: 20px;
    flex: 1;
  }
`;

const SelectTemplateBtn = styled.button`
  width: 100%;
  padding: 11px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  font-weight: 600;
  font-size: 0.92rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #2563eb;
    border-color: #2563eb;
    color: #ffffff;
  }
`;

/* How It Works Steps */
const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 30px;
  max-width: 1050px;
  margin: 0 auto;
`;

const StepCard = styled.div`
  text-align: center;
  padding: 24px;
  position: relative;

  .step-number {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: #fff;
    font-weight: 800;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 8px;
    color: #ffffff;
  }

  p {
    color: #cbd5e1;
    font-size: 0.94rem;
    line-height: 1.6;
  }
`;

/* Bottom CTA Banner */
const CtaBanner = styled.div`
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.28) 0%, rgba(124, 58, 237, 0.28) 100%);
  border: 1px solid rgba(99, 102, 241, 0.4);
  border-radius: 28px;
  padding: clamp(40px, 6vw, 70px) 24px;
  text-align: center;
  max-width: 960px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 60px -15px rgba(37, 99, 235, 0.25);

  h2 {
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    font-weight: 800;
    margin-bottom: 1rem;
    letter-spacing: -0.03em;
    color: #ffffff;
  }

  p {
    color: #cbd5e1;
    font-size: 1.1rem;
    max-width: 580px;
    margin: 0 auto 2rem;
    line-height: 1.6;
  }
`;

/* Footer */
const Footer = styled.footer`
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 40px clamp(1.5rem, 5vw, 4rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 0.9rem;
  color: #94a3b8;
  position: relative;
  z-index: 10;
`;

const FooterNav = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  a {
    color: #cbd5e1;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #ffffff;
    }
  }
`;

export default function Landing() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStart = (templateId = 'basic') => {
    navigate(`/builder?template=${templateId}`);
  };

  const scrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageRoot>
      <AmbientLight1 />
      <AmbientLight2 />
      <AmbientLight3 />

      {/* Navigation */}
      <Nav $scrolled={scrolled}>
        <Brand to="/">
          <BrandIcon>
            <FiFileText size={20} color="#ffffff" />
          </BrandIcon>
          <span>Make<span className="accent">It</span></span>
        </Brand>

        <NavLinks>
          <NavItem href="#features" onClick={(e) => scrollTo(e, 'features')}>Features</NavItem>
          <NavItem href="#templates" onClick={(e) => scrollTo(e, 'templates')}>Templates</NavItem>
          <NavItem href="#ats-service" onClick={(e) => scrollTo(e, 'ats-service')}>
            ATS Scanner <span style={{ fontSize: '0.68rem', padding: '2px 6px', borderRadius: '6px', background: '#3b82f6', color: '#fff', marginLeft: 4, fontWeight: 700 }}>NEW</span>
          </NavItem>
          <NavItem href="#how-it-works" onClick={(e) => scrollTo(e, 'how-it-works')}>How It Works</NavItem>
        </NavLinks>

        <NavCTA onClick={() => handleStart()}>
          <span>Open Builder</span>
          <FiArrowRight size={16} />
        </NavCTA>
      </Nav>

      {/* Hero Section */}
      <HeroSection>
        <TagBadge>
          <span className="dot" />
          <span>100% Free · No Sign-Up · Instant Export</span>
        </TagBadge>

        <HeroHeading>
          Craft your standout CV in <span className="highlight">minutes</span>, not hours.
        </HeroHeading>

        <HeroSubtext>
          A fast, privacy-first resume maker with real-time preview, intelligent multi-page layout, and pixel-perfect PDF & Word exports.
        </HeroSubtext>

        <HeroButtonRow>
          <PrimaryButton onClick={() => handleStart()}>
            <span>Start Building Now</span>
            <FiArrowRight size={18} />
          </PrimaryButton>
          <SecondaryButton href="#templates" onClick={(e) => scrollTo(e, 'templates')}>
            <span>Explore Templates</span>
          </SecondaryButton>
        </HeroButtonRow>

        {/* Interactive Mockup */}
        <MockupContainer>
          <MockupWindow>
            <MockupHeader>
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
              <span className="title-bar">MakeIt — Live Resume Studio</span>
            </MockupHeader>

            <MockupBody>
              <MockupSide>
                <h3>Design with zero friction</h3>
                <p>
                  Fill in your work experience, education, and skills. Watch your document update instantly with automatic page calculations and ATS-friendly typography.
                </p>
                <BulletList>
                  <BulletItem>
                    <FiCheckCircle size={18} />
                    <span>Real-time A4 page-split simulation</span>
                  </BulletItem>
                  <BulletItem>
                    <FiCheckCircle size={18} />
                    <span>Export to high-res PDF and editable DOCX</span>
                  </BulletItem>
                  <BulletItem>
                    <FiCheckCircle size={18} />
                    <span>Multiple languages: English, French, Arabic, Spanish</span>
                  </BulletItem>
                </BulletList>
              </MockupSide>

              <MiniCVCard>
                <span className="badge-tag">ATS Ready</span>
                <div className="cv-header">
                  <div className="avatar">JD</div>
                  <div>
                    <div className="name">Jane Doe</div>
                    <div className="role">Senior Software Engineer</div>
                  </div>
                </div>
                <div className="section-row">
                  <div className="sec-title">Experience</div>
                  <div className="bar primary" style={{ width: '85%' }} />
                  <div className="bar" style={{ width: '95%' }} />
                  <div className="bar" style={{ width: '70%' }} />
                </div>
                <div className="section-row">
                  <div className="sec-title">Skills</div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <div className="bar primary" style={{ width: '50px', height: '14px', borderRadius: '4px' }} />
                    <div className="bar filled" style={{ width: '65px', height: '14px', borderRadius: '4px' }} />
                    <div className="bar primary" style={{ width: '45px', height: '14px', borderRadius: '4px' }} />
                  </div>
                </div>
              </MiniCVCard>
            </MockupBody>
          </MockupWindow>
        </MockupContainer>
      </HeroSection>

      {/* Features Section */}
      <Section id="features">
        <SectionHeader>
          <h2>Crafted for clarity & speed</h2>
          <p>Everything you need to produce a compelling resume without the headache of manual formatting.</p>
        </SectionHeader>

        <FeaturesGrid>
          <FeatureCard $colorBg="rgba(37, 99, 235, 0.15)" $colorText="#60a5fa">
            <div className="icon-box">
              <FiLayout />
            </div>
            <h3>Intelligent Pagination</h3>
            <p>
              Never worry about text awkwardly cut off at the bottom of a page. MakeIt calculates heights in real time and automatically creates clean, balanced pages.
            </p>
          </FeatureCard>

          <FeatureCard $colorBg="rgba(16, 185, 129, 0.15)" $colorText="#34d399">
            <div className="icon-box">
              <FiDownload />
            </div>
            <h3>PDF & DOCX Exports</h3>
            <p>
              Download vector-sharp, print-ready PDF files or clean Word documents (.docx) tailored with native tables and bullets.
            </p>
          </FeatureCard>

          <FeatureCard $colorBg="rgba(245, 158, 11, 0.15)" $colorText="#fbbf24">
            <div className="icon-box">
              <FiStar />
            </div>
            <h3>Curated Modern Designs</h3>
            <p>
              Choose from classic minimal, modern timeline, and premium sidebar templates built specifically to pass ATS scans and impress human reviewers.
            </p>
          </FeatureCard>

          <FeatureCard $colorBg="rgba(139, 92, 246, 0.15)" $colorText="#a78bfa">
            <div className="icon-box">
              <FiShield />
            </div>
            <h3>100% Privacy Focused</h3>
            <p>
              Your data never touches our servers. All information and document creation happens directly in your browser session.
            </p>
          </FeatureCard>

          <FeatureCard $colorBg="rgba(236, 72, 153, 0.15)" $colorText="#f472b6">
            <div className="icon-box">
              <FiGlobe />
            </div>
            <h3>Multi-Language Support</h3>
            <p>
              Seamlessly switch languages with localized headings and proper direction support, including English, French, Spanish, and Arabic.
            </p>
          </FeatureCard>

          <FeatureCard $colorBg="rgba(6, 182, 212, 0.15)" $colorText="#22d3ee">
            <div className="icon-box">
              <FiFileText />
            </div>
            <h3>Live Zoom & Fullscreen</h3>
            <p>
              Zoom in to review tiny details or switch to distraction-free fullscreen mode to evaluate your layout from a high-level perspective.
            </p>
          </FeatureCard>
        </FeaturesGrid>
      </Section>

      {/* Templates Showcase */}
      <Section id="templates" style={{ background: 'rgba(255, 255, 255, 0.01)' }}>
        <SectionHeader>
          <h2>Choose your template</h2>
          <p>Carefully balanced typography, spacing, and visual hierarchy suited for any industry.</p>
        </SectionHeader>

        <TemplatesGrid>
          <TemplateCard>
            <TemplateThumbnail $bg="linear-gradient(135deg, #1e293b 0%, #0f172a 100%)">
              <div className="preview-sheet">
                <div style={{ height: '8px', width: '60%', background: '#2563eb', borderRadius: '3px' }} />
                <div style={{ height: '4px', width: '40%', background: '#94a3b8', borderRadius: '2px', marginBottom: '6px' }} />
                <div style={{ height: '3px', width: '100%', background: '#e2e8f0', borderRadius: '2px' }} />
                <div style={{ height: '3px', width: '90%', background: '#e2e8f0', borderRadius: '2px' }} />
                <div style={{ height: '3px', width: '75%', background: '#e2e8f0', borderRadius: '2px' }} />
                <div style={{ height: '3px', width: '100%', background: '#e2e8f0', borderRadius: '2px', marginTop: '6px' }} />
              </div>
            </TemplateThumbnail>
            <TemplateInfo>
              <div className="header-row">
                <h3>Basic Classic</h3>
                <span className="badge">ATS Friendly</span>
              </div>
              <p>A timeless, clean layout featuring a structured sidebar and elegant divider lines. Ideal for tech, finance, and corporate roles.</p>
              <SelectTemplateBtn onClick={() => handleStart('basic')}>
                <span>Use Basic Template</span>
                <FiArrowRight size={15} />
              </SelectTemplateBtn>
            </TemplateInfo>
          </TemplateCard>

          <TemplateCard>
            <TemplateThumbnail $bg="linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)">
              <div className="preview-sheet">
                <div style={{ display: 'flex', gap: '8px', height: '100%' }}>
                  <div style={{ width: '4px', background: '#6366f1', borderRadius: '2px' }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <div style={{ height: '6px', width: '70%', background: '#6366f1', borderRadius: '3px' }} />
                    <div style={{ height: '3px', width: '90%', background: '#e2e8f0', borderRadius: '2px' }} />
                    <div style={{ height: '3px', width: '80%', background: '#e2e8f0', borderRadius: '2px' }} />
                    <div style={{ height: '3px', width: '100%', background: '#e2e8f0', borderRadius: '2px' }} />
                  </div>
                </div>
              </div>
            </TemplateThumbnail>
            <TemplateInfo>
              <div className="header-row">
                <h3>Timeline</h3>
                <span className="badge">Chronological</span>
              </div>
              <p>Highlights your career progression with an attractive vertical visual timeline. Great for seasoned professionals with extensive experience.</p>
              <SelectTemplateBtn onClick={() => handleStart('timeline')}>
                <span>Use Timeline Template</span>
                <FiArrowRight size={15} />
              </SelectTemplateBtn>
            </TemplateInfo>
          </TemplateCard>

          <TemplateCard>
            <TemplateThumbnail $bg="linear-gradient(135deg, #2e1065 0%, #0f172a 100%)">
              <div className="preview-sheet">
                <div style={{ height: '24px', background: '#7c3aed', borderRadius: '3px', marginBottom: '6px', padding: '4px' }}>
                  <div style={{ height: '4px', width: '50%', background: '#fff', borderRadius: '2px' }} />
                </div>
                <div style={{ height: '3px', width: '100%', background: '#e2e8f0', borderRadius: '2px' }} />
                <div style={{ height: '3px', width: '85%', background: '#e2e8f0', borderRadius: '2px' }} />
                <div style={{ height: '3px', width: '90%', background: '#e2e8f0', borderRadius: '2px' }} />
              </div>
            </TemplateThumbnail>
            <TemplateInfo>
              <div className="header-row">
                <h3>Modern Creative</h3>
                <span className="badge">Bold Header</span>
              </div>
              <p>A striking header banner and stylish layout designed to stand out. Perfect for creative, marketing, and design positions.</p>
              <SelectTemplateBtn onClick={() => handleStart('modern')}>
                <span>Use Modern Template</span>
                <FiArrowRight size={15} />
              </SelectTemplateBtn>
            </TemplateInfo>
          </TemplateCard>
        </TemplatesGrid>
      </Section>

      {/* ATS Service Showcase */}
      <Section id="ats-service" style={{ background: 'linear-gradient(180deg, rgba(3, 7, 18, 0) 0%, rgba(30, 41, 59, 0.25) 50%, rgba(3, 7, 18, 0) 100%)' }}>
        <SectionHeader>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 14px', borderRadius: '100px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', fontSize: '0.82rem', fontWeight: 700, marginBottom: '1rem' }}>
            <span>ATS INTELLIGENCE</span>
          </div>
          <h2>Beat the filters with smart ATS scoring</h2>
          <p>Over 75% of resumes are filtered out before reaching a recruiter. MakeIt includes an integrated ATS Scanner to benchmark your resume against real job postings.</p>
        </SectionHeader>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', maxWidth: '1050px', margin: '0 auto 40px' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '20px', padding: '32px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '18px' }}>
              <FiCheckCircle />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>For Job Seekers</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.94rem', lineHeight: '1.6', marginBottom: '16px' }}>
              Paste any job description directly into the builder. Get your instant match percentage, identify missing technical and soft skills, and add them with one click.
            </p>
            <ul style={{ paddingLeft: '20px', color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.7' }}>
              <li>Real-time ATS score in the editor</li>
              <li>Missing keyword detection & 1-click addition</li>
              <li>Formatting & section parsability audit</li>
            </ul>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '20px', padding: '32px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '18px' }}>
              <FiFileText />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>For Recruiters & Hiring Managers</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.94rem', lineHeight: '1.6', marginBottom: '16px' }}>
              Evaluate candidate resumes against your open job requirements in seconds. Review hard and soft skills alignment, generate executive summaries, and get tailored interview questions.
            </p>
            <ul style={{ paddingLeft: '20px', color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.7' }}>
              <li>Candidate-to-job relevance ranking (0-100%)</li>
              <li>Automated executive recruiter strengths & gap report</li>
              <li>Targeted technical interview questions</li>
            </ul>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <PrimaryButton onClick={() => navigate('/ats')} style={{ padding: '0.95rem 2.4rem' }}>
            <span>Explore the ATS Scanner Studio</span>
            <FiArrowRight size={18} />
          </PrimaryButton>
        </div>
      </Section>

      {/* How It Works */}
      <Section id="how-it-works">
        <SectionHeader>
          <h2>How it works</h2>
          <p>Get your interview-ready resume in three simple steps.</p>
        </SectionHeader>

        <StepsGrid>
          <StepCard>
            <div className="step-number">1</div>
            <h3>Enter Your Details</h3>
            <p>Input your work history, skills, contact info, and education into our easy-to-use form.</p>
          </StepCard>

          <StepCard>
            <div className="step-number">2</div>
            <h3>Pick a Style</h3>
            <p>Select your favorite template, font family, and accent color. Watch the live preview adapt instantly.</p>
          </StepCard>

          <StepCard>
            <div className="step-number">3</div>
            <h3>Export & Apply</h3>
            <p>Download your resume as an ATS-optimized PDF or DOCX file with just one click.</p>
          </StepCard>
        </StepsGrid>
      </Section>

      {/* CTA Banner */}
      <Section>
        <CtaBanner>
          <h2>Ready to build your new resume?</h2>
          <p>No credit card, no sign-up, no hidden fees. Start creating right now in your browser.</p>
          <PrimaryButton onClick={() => handleStart()} style={{ fontSize: '1.1rem', padding: '1rem 2.6rem' }}>
            <span>Create My Resume Now</span>
            <FiArrowRight size={20} />
          </PrimaryButton>
        </CtaBanner>
      </Section>

      {/* Footer */}
      <Footer>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BrandIcon style={{ width: '28px', height: '28px' }}>
            <FiFileText size={16} color="#ffffff" />
          </BrandIcon>
          <span style={{ color: '#fff', fontWeight: 700 }}>MakeIt</span>
          <span>© {new Date().getFullYear()}</span>
        </div>

        <FooterNav>
          <Link to="/ats">ATS Scanner</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
        </FooterNav>
      </Footer>
    </PageRoot>
  );
}
