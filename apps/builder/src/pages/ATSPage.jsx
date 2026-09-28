import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { 
  FiArrowLeft, 
  FiFileText, 
  FiCheckCircle, 
  FiAlertTriangle, 
  FiCopy, 
  FiCheck, 
  FiTarget, 
  FiZap, 
  FiArrowRight, 
  FiHelpCircle, 
  FiUsers, 
  FiShield, 
  FiRefreshCw, 
  FiLayers, 
  FiTrendingUp, 
  FiUploadCloud, 
  FiTrash2, 
  FiAward, 
  FiBriefcase, 
  FiBookOpen, 
  FiActivity, 
  FiDownload, 
  FiChevronRight,
  FiExternalLink
} from 'react-icons/fi';
import { 
  evaluateCandidateAgainstJob, 
  batchProcessCandidates, 
  parseJobRequirements 
} from '../utils/atsEngine';
import { extractTextFromFile } from '../utils/fileExtractor';

/* ─── Sample Candidates Pool for 1-Click Multi-CV Testing ─── */
const SAMPLE_CANDIDATE_1 = {
  id: 'cand-1',
  fileName: 'Jane_Doe_Senior_FullStack.pdf',
  rawText: `Jane Doe
Senior Full-Stack Software Engineer
Email: jane.doe@example.com | Phone: +1 (555) 234-5678 | Location: San Francisco, CA
LinkedIn: linkedin.com/in/janedoe | GitHub: github.com/janedoe

PROFESSIONAL SUMMARY
Results-driven Senior Full-Stack Engineer with 6.5 years of experience architecting resilient distributed systems, microservices, and modern web applications. Proven track record reducing system latency by 45%, cutting AWS infrastructure spend by $240K annually, and mentoring 6 developers.

WORK EXPERIENCE
Senior Software Engineer | TechScale Cloud Inc. | Jan 2021 - Present
- Architected and deployed high-throughput microservices using React, TypeScript, and Node.js handling 15M daily requests.
- Spearheaded Kubernetes (K8s) and Docker containerization on AWS, cutting build release time by 40%.
- Optimized PostgreSQL database queries and Redis caching, reducing p99 latency from 420ms to 85ms.
- Mentored 6 software engineers on clean code architecture, TDD, and CI/CD best practices.

Software Engineer | NextGen Solutions | Mar 2018 - Dec 2020
- Developed responsive web interfaces using React, Redux, and modern JavaScript (ES6+).
- Engineered RESTful APIs and GraphQL services backed by Python and PostgreSQL.
- Reduced customer-reported bugs by 30% through automated Jest unit testing.

EDUCATION
B.S. in Computer Science | University of California, Berkeley | 2014 - 2018

SKILLS
Programming: JavaScript, TypeScript, Python, SQL, HTML5, CSS3
Frameworks & Libraries: React, Node.js, Express, Next.js, Redux, Tailwind CSS
Cloud & DevOps: Docker, Kubernetes, AWS, CI/CD, GitHub Actions, Linux, Git
Databases: PostgreSQL, Redis, MongoDB
Practices: Microservices, System Design, REST APIs, GraphQL, Agile, Unit Testing`
};

const SAMPLE_CANDIDATE_2 = {
  id: 'cand-2',
  fileName: 'Alex_Rivera_Web_Developer.pdf',
  rawText: `Alex Rivera
Software Developer
Email: alex.rivera@example.com | Phone: +1 (555) 987-6543 | Location: Austin, TX
LinkedIn: linkedin.com/in/alexrivera

SUMMARY
Enthusiastic Software Developer with 3.2 years of experience building web applications using React, JavaScript, and Node.js. Passionate about learning cloud tools and agile workflows.

EXPERIENCE
Full Stack Developer | Austin Web Studio | Jun 2021 - Present
- Built user dashboard features using React, HTML5, and Tailwind CSS.
- Developed backend API endpoints using Node.js and Express with MySQL databases.
- Participated in bi-weekly agile sprint meetings and code reviews.
- Improved page loading speeds by 18% through asset optimization.

Junior Web Developer | LoneStar Apps | Jan 2020 - May 2021
- Maintained internal employee portal with JavaScript and CSS.
- Assisted senior engineers in writing basic SQL queries and resolving bug tickets.

EDUCATION
B.S. in Information Technology | Texas State University | 2016 - 2020

SKILLS
React, JavaScript, Node.js, HTML, CSS, SQL, MySQL, Git, Agile, REST APIs`
};

const SAMPLE_CANDIDATE_3 = {
  id: 'cand-3',
  fileName: 'Taylor_Brooks_Marketing.pdf',
  rawText: `Taylor Brooks
Digital Marketing Specialist & Content Strategist
Email: taylor.brooks@example.com | Phone: +1 (555) 456-7890 | Location: Chicago, IL
LinkedIn: linkedin.com/in/taylorbrooks

PROFESSIONAL SUMMARY
Creative Marketing Specialist with 2 years of experience managing social media campaigns, SEO content, and email marketing funnels. Increased organic blog traffic by 50% across 6 months.

EXPERIENCE
Marketing Coordinator | Apex Growth Media | 2022 - Present
- Managed organic social media campaigns across LinkedIn and Twitter, generating 100k impressions.
- Wrote weekly SEO-optimized blog articles and email newsletters.
- Monitored Google Analytics and prepared monthly performance reports for clients.

Marketing Intern | BlueSky Agency | 2021 - 2022
- Conducted competitor research and assisted with content scheduling.

EDUCATION
B.A. in Communications & Media Studies | DePaul University | 2017 - 2021

SKILLS
Content Strategy, SEO, Copywriting, Google Analytics, Social Media, Canva, Email Marketing, Communication`
};

const SAMPLE_JD = `Senior Software Engineer (Full-Stack)
Company: CloudPeak Technologies
Location: Remote / Hybrid

About the Role:
We are seeking a talented Senior Software Engineer to build and scale our next-generation cloud analytics platform. You will work closely with product and data engineering teams to design resilient systems.

Responsibilities:
- Design, build, and maintain high-performance web applications and distributed APIs.
- Work with modern frontend frameworks (React, Next.js, TypeScript).
- Deploy and manage containerized microservices on AWS using Docker and Kubernetes.
- Drive automated testing, CI/CD workflows, and code quality standards.
- Collaborate in an agile environment and mentor junior engineers.

Requirements:
- 5+ years of software development experience with JavaScript, TypeScript, and Python.
- Strong hands-on expertise with React, Node.js, and PostgreSQL.
- Solid understanding of cloud infrastructure (AWS, Docker, Kubernetes, Terraform).
- Experience with GraphQL or RESTful API architecture.
- Excellent communication, leadership, and problem-solving skills.`;

/* ─── Keyframe Animations ─────────────────────────────────── */
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

/* ─── Styled Components ───────────────────────────────────── */
const PageRoot = styled.div`
  min-height: 100vh;
  background-color: #030712;
  color: #f8fafc;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  padding-bottom: 90px;
`;

const Nav = styled.nav`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(1.2rem, 5vw, 4rem);
  background: rgba(3, 7, 18, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #fff;
  font-weight: 800;
  font-size: 1.3rem;

  .accent {
    background: linear-gradient(135deg, #38bdf8, #818cf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LinkBtn = styled(Link)`
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.05);
  }
`;

const BuilderCTA = styled(Link)`
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  color: #fff;
  text-decoration: none;
  padding: 8px 18px;
  border-radius: 100px;
  font-size: 0.92rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(37, 99, 235, 0.4);
  }
`;

const MainContainer = styled.main`
  max-width: 1240px;
  margin: 0 auto;
  padding: 40px 20px 0;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 40px;

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    border-radius: 100px;
    background: rgba(37, 99, 235, 0.15);
    border: 1px solid rgba(59, 130, 246, 0.35);
    color: #60a5fa;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: clamp(2.2rem, 4vw, 3.2rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    color: #ffffff;
    margin-bottom: 0.8rem;
  }

  p {
    font-size: 1.1rem;
    color: #94a3b8;
    max-width: 720px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const SetupGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: rgba(15, 23, 42, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  flex-wrap: wrap;
  gap: 8px;

  h3 {
    font-size: 1.15rem;
    font-weight: 700;
    color: #f8fafc;
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
  }
`;

const QuickBtn = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #cbd5e1;
  padding: 5px 12px;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
  }
`;

const DropZone = styled.div`
  border: 2px dashed ${props => props.$isDragging ? '#3b82f6' : 'rgba(255, 255, 255, 0.15)'};
  background: ${props => props.$isDragging ? 'rgba(37, 99, 235, 0.1)' : 'rgba(3, 7, 18, 0.5)'};
  border-radius: 14px;
  padding: 24px 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 14px;

  &:hover {
    border-color: #3b82f6;
    background: rgba(37, 99, 235, 0.05);
  }

  .upload-icon {
    font-size: 2.2rem;
    color: #60a5fa;
    margin-bottom: 8px;
  }

  .main-text {
    font-size: 0.95rem;
    font-weight: 600;
    color: #e2e8f0;
    margin-bottom: 4px;
  }

  .sub-text {
    font-size: 0.8rem;
    color: #64748b;
  }
`;

const UploadedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 220px;
  overflow-y: auto;
  margin-bottom: 12px;
`;

const UploadedItem = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .file-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.88rem;
    color: #f1f5f9;

    .size {
      font-size: 0.75rem;
      color: #94a3b8;
    }
  }

  .del-btn {
    background: transparent;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;

    &:hover {
      color: #f87171;
      background: rgba(239, 68, 68, 0.15);
    }
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 260px;
  background: rgba(3, 7, 18, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  color: #f1f5f9;
  font-family: inherit;
  font-size: 0.88rem;
  line-height: 1.5;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #3b82f6;
  }

  &::placeholder {
    color: #64748b;
  }
`;

const ActionRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0 40px;
`;

const ScanButton = styled.button`
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  color: #ffffff;
  border: none;
  padding: 1.1rem 3.2rem;
  border-radius: 14px;
  font-size: 1.15rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 10px 30px -5px rgba(37, 99, 235, 0.5);
  transition: all 0.25s;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 16px 36px -5px rgba(37, 99, 235, 0.65);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ScanProgressCard = styled.div`
  margin-top: 18px;
  width: 100%;
  max-width: 520px;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 14px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);

  .spin-icon {
    animation: ${spin} 1s linear infinite;
    color: #60a5fa;
    flex-shrink: 0;
  }

  .step-text {
    font-size: 0.92rem;
    color: #cbd5e1;
    font-weight: 500;
  }
`;

/* ─── Multi-Candidate Leaderboard & Dossier ───────────────── */
const BatchHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 16px;
  margin-bottom: 26px;
`;

const StatTile = styled.div`
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 18px;

  .stat-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 700;
    color: #94a3b8;
    margin-bottom: 6px;
    letter-spacing: 0.05em;
  }

  .stat-num {
    font-size: 1.8rem;
    font-weight: 800;
    color: ${props => props.$color || '#fff'};
  }
`;

const LeaderboardTable = styled.div`
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  overflow: hidden;
  margin-bottom: 34px;
`;

const CandidateRow = styled.div`
  display: grid;
  grid-template-columns: 70px 1.5fr 1fr 1fr 100px 140px;
  padding: 16px 20px;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: ${props => props.$isSelected ? 'rgba(37, 99, 235, 0.15)' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
  }

  @media (max-width: 900px) {
    grid-template-columns: 60px 1fr 100px 100px;
    .hide-mobile { display: none; }
  }
`;

const RankBadge = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: ${props => props.$rank === 1 ? 'linear-gradient(135deg, #f59e0b, #d97706)' : props.$rank === 2 ? 'linear-gradient(135deg, #94a3b8, #64748b)' : 'rgba(255, 255, 255, 0.08)'};
  color: #fff;
  font-weight: 800;
  font-size: 1.05rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TierTag = styled.span`
  padding: 4px 10px;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 700;
  display: inline-block;
  background: ${props => props.$badge === 'strong' ? 'rgba(16, 185, 129, 0.15)' : props.$badge === 'moderate' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)'};
  border: 1px solid ${props => props.$badge === 'strong' ? 'rgba(16, 185, 129, 0.35)' : props.$badge === 'moderate' ? 'rgba(245, 158, 11, 0.35)' : 'rgba(239, 68, 68, 0.35)'};
  color: ${props => props.$badge === 'strong' ? '#34d399' : props.$badge === 'moderate' ? '#fbbf24' : '#f87171'};
`;

/* ─── Detailed Dossier ────────────────────────────────────── */
const DossierCard = styled.div`
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  padding: clamp(24px, 5vw, 44px);
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8);
`;

const DossierHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding-bottom: 24px;
  margin-bottom: 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  .name-block {
    h2 {
      font-size: 1.7rem;
      font-weight: 800;
      color: #fff;
      margin: 0 0 4px;
    }
    p {
      color: #94a3b8;
      font-size: 0.95rem;
      margin: 0;
    }
  }

  .contact-chips {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .chip {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 0.82rem;
    color: #cbd5e1;
  }
`;

const ScoreGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 36px;
  align-items: center;
  margin-bottom: 34px;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const BigDial = styled.div`
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background: ${props => props.$bg};
  border: 4px solid ${props => props.$border};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 35px ${props => props.$glow};
  margin: 0 auto;

  .score {
    font-size: 3.6rem;
    font-weight: 900;
    line-height: 1;
    color: ${props => props.$text};
  }

  .grade {
    font-size: 0.85rem;
    font-weight: 700;
    color: #94a3b8;
    margin-top: 6px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
`;

const SubScoreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px;
`;

const SubScoreTile = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  padding: 14px 16px;

  .title {
    font-size: 0.78rem;
    color: #94a3b8;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .val {
    font-size: 1.3rem;
    font-weight: 800;
    color: #ffffff;
  }

  .bar {
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 99px;
    overflow: hidden;
    margin-top: 6px;
  }

  .fill {
    height: 100%;
    width: ${props => props.$fill}%;
    background: ${props => props.$color || '#3b82f6'};
  }
`;

const InsightsSection = styled.div`
  margin-top: 24px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.15rem;
  font-weight: 800;
  color: ${props => props.$color || '#ffffff'};
  margin-bottom: 14px;
`;

const TagCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

const Tag = styled.div`
  padding: 6px 14px;
  border-radius: 100px;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${props => props.$isMatched ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'};
  border: 1px solid ${props => props.$isMatched ? 'rgba(16, 185, 129, 0.35)' : 'rgba(239, 68, 68, 0.35)'};
  color: ${props => props.$isMatched ? '#34d399' : '#fca5a5'};

  .badge-cat {
    font-size: 0.65rem;
    text-transform: uppercase;
    padding: 2px 6px;
    border-radius: 4px;
    background: ${props => props.$isMatched ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)'};
  }
`;

const RecruiterBox = styled.div`
  background: rgba(37, 99, 235, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.25);
  border-radius: 20px;
  padding: 26px;
  margin-top: 20px;

  h3 {
    font-size: 1.25rem;
    font-weight: 800;
    color: #93c5fd;
    margin-bottom: 1.2rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .subheading {
    font-size: 0.95rem;
    font-weight: 700;
    color: #f8fafc;
    margin: 16px 0 6px;
  }

  ul {
    padding-left: 20px;
    color: #cbd5e1;
    font-size: 0.92rem;
    line-height: 1.65;
  }

  li {
    margin-bottom: 6px;
  }
`;

export default function ATSPage() {
  const [jobDescription, setJobDescription] = useState(SAMPLE_JD);
  const [candidates, setCandidates] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState('');
  const [analyzed, setAnalyzed] = useState(false);
  const [batchResult, setBatchResult] = useState(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  // File upload handling
  const handleFiles = async (fileList) => {
    if (!fileList || fileList.length === 0) return;
    const newItems = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      try {
        const text = await extractTextFromFile(file);
        newItems.push({
          id: `file-${Date.now()}-${i}`,
          fileName: file.name,
          fileSize: (file.size / 1024).toFixed(1) + ' KB',
          rawText: text
        });
      } catch (err) {
        console.error('Error extracting text from file:', file.name, err);
      }
    }

    setCandidates(prev => [...prev, ...newItems]);
  };

  const handleLoadSamples = () => {
    setCandidates([
      SAMPLE_CANDIDATE_1,
      SAMPLE_CANDIDATE_2,
      SAMPLE_CANDIDATE_3
    ]);
  };

  const handleRemoveCandidate = (id) => {
    setCandidates(prev => prev.filter(c => c.id !== id));
  };

  const handleClearAll = () => {
    setCandidates([]);
    setAnalyzed(false);
    setBatchResult(null);
    setSelectedCandidateId(null);
  };

  // Run ATS processing
  const handleRunScan = () => {
    if (candidates.length === 0) return;

    setScanning(true);
    setScanStep('Ingesting candidate documents & parsing hierarchy...');

    setTimeout(() => {
      setScanStep('Extracting contact entities, links & locations...');
    }, 250);

    setTimeout(() => {
      setScanStep('Calculating experience tenure, dates & career trajectory...');
    }, 550);

    setTimeout(() => {
      setScanStep('Mapping skills against canonical synonyms & job requirements...');
    }, 850);

    setTimeout(() => {
      setScanStep('Evaluating quantifiable impact metrics & ranking candidate pool...');
    }, 1150);

    setTimeout(() => {
      const results = batchProcessCandidates(candidates, jobDescription);
      setBatchResult(results);
      if (results.rankedCandidates.length > 0) {
        setSelectedCandidateId(results.rankedCandidates[0].id);
      }
      setScanning(false);
      setAnalyzed(true);
    }, 1450);
  };

  const selectedCandidate = batchResult?.rankedCandidates?.find(c => c.id === selectedCandidateId) || batchResult?.rankedCandidates?.[0];
  const evalData = selectedCandidate?.evaluation;

  const handleCopyReport = () => {
    if (!evalData) return;
    const text = `MakeIt ATS Candidate Dossier
Candidate: ${evalData.contact.name} (${evalData.contact.role})
Email: ${evalData.contact.email || 'N/A'} | Phone: ${evalData.contact.phone || 'N/A'}
Overall Fit Score: ${evalData.overallScore}% (${evalData.tier})

TENURE & CREDENTIALS
- Total Experience: ${evalData.chronology.totalYears} years
- Seniority Level: ${evalData.chronology.seniorityLevel}
- Highest Degree: ${evalData.education.highestDegree}

SUB-SCORES
- Technical Fit: ${evalData.subScores.technicalFit}%
- Tenure Fit: ${evalData.subScores.tenureFit}%
- Seniority Fit: ${evalData.subScores.seniorityFit}%
- Education Fit: ${evalData.subScores.educationFit}%
- Quantifiable Impact: ${evalData.subScores.impactFit}%
- Format Health: ${evalData.subScores.formattingFit}%

KEY STRENGTHS:
${evalData.strengths.map(s => `- ${s}`).join('\n')}

AREAS TO VALIDATE / RISKS:
${evalData.concerns.map(c => `- ${c}`).join('\n')}

SUGGESTED INTERVIEW QUESTIONS:
${evalData.tailoredQuestions.map(q => `- ${q}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dial color setup
  const score = evalData?.overallScore || 0;
  let dialText = '#34d399';
  let dialBorder = '#10b981';
  let dialBg = 'rgba(16, 185, 129, 0.15)';
  let dialGlow = 'rgba(16, 185, 129, 0.3)';

  if (score < 60) {
    dialText = '#f87171';
    dialBorder = '#ef4444';
    dialBg = 'rgba(239, 68, 68, 0.15)';
    dialGlow = 'rgba(239, 68, 68, 0.3)';
  } else if (score < 78) {
    dialText = '#fbbf24';
    dialBorder = '#f59e0b';
    dialBg = 'rgba(245, 158, 11, 0.15)';
    dialGlow = 'rgba(245, 158, 11, 0.3)';
  }

  return (
    <PageRoot>
      <Nav>
        <Brand to="/">
          <span>Make<span className="accent">It</span></span>
        </Brand>
        <NavButtons>
          <LinkBtn to="/">Home</LinkBtn>
          <LinkBtn to="/privacy">Privacy</LinkBtn>
          <BuilderCTA to="/builder">
            <span>Open CV Builder</span>
            <FiArrowRight size={15} />
          </BuilderCTA>
        </NavButtons>
      </Nav>

      <MainContainer>
        <HeaderSection>
          <div className="badge">
            <FiZap size={15} />
            <span>Standalone Recruiter & Candidate Screening Portal</span>
          </div>
          <h1>Enterprise ATS Intelligence Studio</h1>
          <p>
            An independent ATS service. Ingest downloaded resumes (PDF, DOCX, TXT), evaluate multi-dimensional fit against any Job Description, and rank candidate pools with recruiter dossiers.
          </p>
        </HeaderSection>

        {/* Input & Upload Grid */}
        <SetupGrid>
          {/* Target Job Description */}
          <Card>
            <CardHeader>
              <h3>
                <FiTarget color="#818cf8" />
                <span>1. Target Job Description</span>
              </h3>
              <QuickBtn onClick={() => setJobDescription(SAMPLE_JD)}>
                Reset to Sample JD
              </QuickBtn>
            </CardHeader>
            <TextArea 
              placeholder="Paste job description, requirements, or qualifications..."
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
            />
          </Card>

          {/* Downloaded CVs Upload / Dropzone */}
          <Card>
            <CardHeader>
              <h3>
                <FiFileText color="#38bdf8" />
                <span>2. Upload Downloaded CV / CVs ({candidates.length})</span>
              </h3>
              <div style={{ display: 'flex', gap: 6 }}>
                <QuickBtn onClick={handleLoadSamples}>
                  Load 3 Sample Resumes
                </QuickBtn>
                {candidates.length > 0 && (
                  <QuickBtn onClick={handleClearAll} style={{ color: '#f87171' }}>
                    Clear
                  </QuickBtn>
                )}
              </div>
            </CardHeader>

            <DropZone 
              $isDragging={isDragging}
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={e => {
                e.preventDefault();
                setIsDragging(false);
                handleFiles(e.dataTransfer.files);
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <FiUploadCloud className="upload-icon" />
              <div className="main-text">Click or drag & drop candidate CVs here</div>
              <div className="sub-text">Supports PDF, DOCX, TXT, JSON • Multiple files supported</div>
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                multiple 
                accept=".pdf,.docx,.txt,.json,.md"
                onChange={e => handleFiles(e.target.files)}
              />
            </DropZone>

            {candidates.length > 0 && (
              <UploadedList>
                {candidates.map(cand => (
                  <UploadedItem key={cand.id}>
                    <div className="file-meta">
                      <FiFileText color="#60a5fa" />
                      <span>{cand.fileName}</span>
                      <span className="size">({cand.fileSize || `${cand.rawText.split(/\s+/).length} words`})</span>
                    </div>
                    <button 
                      className="del-btn" 
                      onClick={e => { e.stopPropagation(); handleRemoveCandidate(cand.id); }}
                      title="Remove CV"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </UploadedItem>
                ))}
              </UploadedList>
            )}
          </Card>
        </SetupGrid>

        {/* Scan Button & Animated Pipeline */}
        <ActionRow>
          <ScanButton 
            onClick={handleRunScan} 
            disabled={scanning || candidates.length === 0}
          >
            <FiZap size={20} />
            <span>
              {scanning ? 'Running Multi-Factor ATS Pipeline...' : `Analyze & Rank ${candidates.length} Candidate${candidates.length === 1 ? '' : 's'}`}
            </span>
          </ScanButton>

          {scanning && (
            <ScanProgressCard>
              <FiRefreshCw className="spin-icon" size={20} />
              <span className="step-text">{scanStep}</span>
            </ScanProgressCard>
          )}
        </ActionRow>

        {/* Results: Multi-Candidate Leaderboard & Detailed Dossier */}
        {analyzed && batchResult && (
          <div>
            {/* Batch Stats */}
            <BatchHeader>
              <StatTile>
                <div className="stat-label">Total Resumes Scanned</div>
                <div className="stat-num">{batchResult.stats.total}</div>
              </StatTile>
              <StatTile $color="#34d399">
                <div className="stat-label">Top Candidate Score</div>
                <div className="stat-num">{batchResult.stats.topScore}%</div>
              </StatTile>
              <StatTile $color="#60a5fa">
                <div className="stat-label">Average Pool Match</div>
                <div className="stat-num">{batchResult.stats.avgScore}%</div>
              </StatTile>
              <StatTile $color="#a78bfa">
                <div className="stat-label">Shortlisted Candidates (≥75%)</div>
                <div className="stat-num">{batchResult.stats.shortlistCount}</div>
              </StatTile>
            </BatchHeader>

            {/* Candidate Leaderboard */}
            {batchResult.rankedCandidates.length > 1 && (
              <div>
                <SectionHeader $color="#60a5fa">
                  <FiAward />
                  <span>Candidate Leaderboard (Ranked by Match Score)</span>
                </SectionHeader>
                <LeaderboardTable>
                  {batchResult.rankedCandidates.map(c => (
                    <CandidateRow 
                      key={c.id} 
                      $isSelected={c.id === selectedCandidateId}
                      onClick={() => setSelectedCandidateId(c.id)}
                    >
                      <RankBadge $rank={c.rank}>#{c.rank}</RankBadge>
                      <div>
                        <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.98rem' }}>{c.candidateName}</div>
                        <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{c.candidateRole}</div>
                      </div>
                      <div className="hide-mobile" style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>
                        {c.totalYears} yrs exp
                      </div>
                      <div className="hide-mobile">
                        <TierTag $badge={c.tierBadge}>{c.tier.split(':')[0]}</TierTag>
                      </div>
                      <div style={{ fontWeight: 800, fontSize: '1.25rem', color: c.overallScore >= 75 ? '#34d399' : c.overallScore >= 60 ? '#fbbf24' : '#f87171' }}>
                        {c.overallScore}%
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#60a5fa', fontSize: '0.85rem', fontWeight: 600 }}>
                        <span>Inspect</span>
                        <FiChevronRight size={14} />
                      </div>
                    </CandidateRow>
                  ))}
                </LeaderboardTable>
              </div>
            )}

            {/* Selected Candidate Detailed Dossier */}
            {evalData && (
              <DossierCard>
                <DossierHeader>
                  <div className="name-block">
                    <h2>{evalData.contact.name}</h2>
                    <p>{evalData.contact.role}</p>
                  </div>
                  <div className="contact-chips">
                    {evalData.contact.email && <span className="chip">✉ {evalData.contact.email}</span>}
                    {evalData.contact.phone && <span className="chip">📞 {evalData.contact.phone}</span>}
                    {evalData.contact.location && <span className="chip">📍 {evalData.contact.location}</span>}
                    {evalData.contact.links.map(l => (
                      <span key={l.url} className="chip">🔗 {l.type}</span>
                    ))}
                  </div>
                </DossierHeader>

                {/* Score Dial and 6-Factor Sub-Scores */}
                <ScoreGrid>
                  <BigDial $bg={dialBg} $border={dialBorder} $glow={dialGlow} $text={dialText}>
                    <span className="score">{evalData.overallScore}%</span>
                    <span className="grade">{evalData.tierBadge === 'strong' ? 'Tier 1 Match' : evalData.tierBadge === 'moderate' ? 'Tier 2 Match' : 'Gap Risk'}</span>
                  </BigDial>

                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: '0 0 6px' }}>
                      {evalData.tier}
                    </h3>
                    <p style={{ color: '#cbd5e1', fontSize: '0.92rem', margin: '0 0 16px', lineHeight: 1.5 }}>
                      Candidate meets <strong>{evalData.matchedSkills.length}</strong> of the job criteria with <strong>{evalData.chronology.totalYears} years</strong> of documented experience against the required {evalData.jdReqs.minYears}+ years.
                    </p>

                    <SubScoreGrid>
                      <SubScoreTile $fill={evalData.subScores.technicalFit} $color="#38bdf8">
                        <div className="title">Technical Skills Fit</div>
                        <div className="val">{evalData.subScores.technicalFit}%</div>
                        <div className="bar"><div className="fill" /></div>
                      </SubScoreTile>
                      <SubScoreTile $fill={evalData.subScores.tenureFit} $color="#34d399">
                        <div className="title">Experience Tenure</div>
                        <div className="val">{evalData.chronology.totalYears} yrs</div>
                        <div className="bar"><div className="fill" /></div>
                      </SubScoreTile>
                      <SubScoreTile $fill={evalData.subScores.seniorityFit} $color="#a78bfa">
                        <div className="title">Seniority Alignment</div>
                        <div className="val">{evalData.chronology.seniorityLevel}</div>
                        <div className="bar"><div className="fill" /></div>
                      </SubScoreTile>
                      <SubScoreTile $fill={evalData.subScores.educationFit} $color="#f59e0b">
                        <div className="title">Education Match</div>
                        <div className="val">{evalData.education.highestDegree.split(' ')[0]}</div>
                        <div className="bar"><div className="fill" /></div>
                      </SubScoreTile>
                      <SubScoreTile $fill={evalData.subScores.impactFit} $color="#ec4899">
                        <div className="title">Quantified Impact</div>
                        <div className="val">{evalData.impact.count} metrics</div>
                        <div className="bar"><div className="fill" /></div>
                      </SubScoreTile>
                      <SubScoreTile $fill={evalData.subScores.formattingFit} $color="#10b981">
                        <div className="title">Parse Readability</div>
                        <div className="val">{evalData.subScores.formattingFit}%</div>
                        <div className="bar"><div className="fill" /></div>
                      </SubScoreTile>
                    </SubScoreGrid>
                  </div>
                </ScoreGrid>

                {/* Skills Taxonomy: Missing vs Matched */}
                <InsightsSection>
                  {evalData.missingSkills.length > 0 && (
                    <div>
                      <SectionHeader $color="#f87171">
                        <FiAlertTriangle />
                        <span>Missing Requirements from Job Posting ({evalData.missingSkills.length}):</span>
                      </SectionHeader>
                      <TagCloud>
                        {evalData.missingSkills.map(s => (
                          <Tag key={s.name}>
                            <span>{s.name}</span>
                            <span className="badge-cat">{s.category}</span>
                          </Tag>
                        ))}
                      </TagCloud>
                    </div>
                  )}

                  {evalData.matchedSkills.length > 0 && (
                    <div>
                      <SectionHeader $color="#34d399">
                        <FiCheckCircle />
                        <span>Matched Qualifications & Synonyms ({evalData.matchedSkills.length}):</span>
                      </SectionHeader>
                      <TagCloud>
                        {evalData.matchedSkills.map(s => (
                          <Tag key={s.name} $isMatched>
                            <FiCheck size={13} />
                            <span>{s.name}</span>
                            <span className="badge-cat">{s.category}</span>
                          </Tag>
                        ))}
                      </TagCloud>
                    </div>
                  )}

                  {/* Recruiter Evaluation Dossier */}
                  <RecruiterBox>
                    <h3>
                      <FiUsers />
                      <span>Executive Recruiter Evaluation & Candidate Dossier</span>
                    </h3>

                    <div className="subheading">Core Strengths:</div>
                    <ul>
                      {evalData.strengths.map((str, i) => (
                        <li key={i}>{str}</li>
                      ))}
                    </ul>

                    {evalData.concerns.length > 0 && (
                      <>
                        <div className="subheading" style={{ color: '#fca5a5' }}>Gaps & Areas to Verify:</div>
                        <ul>
                          {evalData.concerns.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    <div className="subheading" style={{ color: '#93c5fd' }}>Tailored Technical & Behavioral Interview Questions:</div>
                    <ul>
                      {evalData.tailoredQuestions.map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ul>

                    <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
                      <QuickBtn onClick={handleCopyReport} style={{ padding: '8px 16px', fontSize: '0.88rem' }}>
                        {copied ? <FiCheck /> : <FiCopy />}
                        <span style={{ marginLeft: 6 }}>{copied ? 'Dossier Copied' : 'Copy Recruiter Report'}</span>
                      </QuickBtn>
                      <BuilderCTA to="/builder" style={{ padding: '8px 18px', fontSize: '0.88rem' }}>
                        <span>Open in MakeIt CV Builder</span>
                        <FiArrowRight size={14} />
                      </BuilderCTA>
                    </div>
                  </RecruiterBox>
                </InsightsSection>
              </DossierCard>
            )}
          </div>
        )}
      </MainContainer>
    </PageRoot>
  );
}
