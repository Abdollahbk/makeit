import React, { useState, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { 
  FiX, 
  FiCheckCircle, 
  FiAlertTriangle, 
  FiPlus, 
  FiTarget, 
  FiFileText, 
  FiCheck,
  FiZap,
  FiAward,
  FiUsers,
  FiHelpCircle
} from 'react-icons/fi';
import { 
  auditCVStructure, 
  matchResumeWithJobDescription, 
  extractCVText,
  generateRecruiterEvaluation 
} from '../utils/atsEngine';

/* ─── Animations ───────────────────────────────────────────── */
const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
`;

const overlayFade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

/* ─── Styled Components ───────────────────────────────────── */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(3, 7, 18, 0.82);
  backdrop-filter: blur(10px);
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  animation: ${overlayFade} 0.2s ease-out;
`;

const ModalContainer = styled.div`
  width: 100%;
  max-width: 820px;
  max-height: 88vh;
  background: #0b1120;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(59, 130, 246, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${fadeIn} 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  color: #f8fafc;
`;

const ModalHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(15, 23, 42, 0.6);

  .title-group {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  h2 {
    font-size: 1.35rem;
    font-weight: 800;
    color: #ffffff;
    margin: 0;
  }

  p {
    font-size: 0.85rem;
    color: #94a3b8;
    margin: 2px 0 0;
  }
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
    transform: scale(1.05);
  }
`;

const ScoreHero = styled.div`
  padding: 1.75rem 2rem;
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const DialWrap = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: ${props => props.$bg || 'rgba(37, 99, 235, 0.15)'};
  border: 3px solid ${props => props.$border || '#3b82f6'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 25px ${props => props.$glow || 'rgba(59, 130, 246, 0.3)'};
  flex-shrink: 0;

  .score-num {
    font-size: 2rem;
    font-weight: 900;
    line-height: 1;
    color: ${props => props.$text || '#60a5fa'};
  }

  .score-lbl {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: #94a3b8;
    text-transform: uppercase;
    margin-top: 2px;
  }
`;

const ScoreDetails = styled.div`
  flex: 1;
  min-width: 260px;

  .badge-tag {
    display: inline-block;
    padding: 3px 12px;
    border-radius: 20px;
    font-size: 0.78rem;
    font-weight: 700;
    background: ${props => props.$badgeBg};
    color: ${props => props.$badgeColor};
    margin-bottom: 8px;
  }

  h3 {
    font-size: 1.15rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 6px;
  }

  p {
    font-size: 0.88rem;
    color: #cbd5e1;
    line-height: 1.5;
    margin: 0;
  }
`;

const ScoreProgressBar = styled.div`
  width: 100%;
  max-width: 380px;
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  overflow: hidden;
  margin-top: 10px;
`;

const ScoreProgressFill = styled.div`
  height: 100%;
  width: ${props => props.$percent}%;
  background: ${props => props.$color || '#3b82f6'};
  border-radius: 999px;
  transition: width 0.4s ease-out;
`;

const RecruiterCard = styled.div`
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1rem;

  h4 {
    font-size: 0.95rem;
    font-weight: 700;
    margin: 0 0 10px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${props => props.$color || '#93c5fd'};
  }

  ul {
    margin: 0;
    padding-left: 20px;
    color: #cbd5e1;
    font-size: 0.88rem;
    line-height: 1.6;
  }

  li {
    margin-bottom: 6px;
  }
`;

const Tabs = styled.div`
  display: flex;
  padding: 0 2rem;
  background: rgba(15, 23, 42, 0.4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  gap: 1.5rem;
`;

const TabButton = styled.button`
  background: none;
  border: none;
  padding: 1rem 0.2rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${props => props.$active ? '#60a5fa' : '#94a3b8'};
  cursor: pointer;
  position: relative;
  transition: color 0.2s;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: #3b82f6;
    display: ${props => props.$active ? 'block' : 'none'};
  }

  &:hover {
    color: #f1f5f9;
  }
`;

const ModalContent = styled.div`
  padding: 2rem;
  overflow-y: auto;
  flex: 1;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 4px;
  }
`;

/* Checklist */
const Checklist = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CheckItem = styled.div`
  background: ${props => props.$isIssue ? 'rgba(239, 68, 68, 0.08)' : 'rgba(16, 185, 129, 0.08)'};
  border: 1px solid ${props => props.$isIssue ? 'rgba(239, 68, 68, 0.25)' : 'rgba(16, 185, 129, 0.25)'};
  border-radius: 14px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 14px;

  svg {
    color: ${props => props.$isIssue ? '#f87171' : '#34d399'};
    flex-shrink: 0;
    font-size: 1.2rem;
  }

  .text {
    font-size: 0.92rem;
    color: ${props => props.$isIssue ? '#fca5a5' : '#e2e8f0'};
    flex: 1;
  }

  .penalty {
    font-size: 0.75rem;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 6px;
    background: rgba(239, 68, 68, 0.2);
    color: #fca5a5;
  }
`;

/* Job Matcher Styles */
const JdTextarea = styled.textarea`
  width: 100%;
  height: 140px;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 14px;
  color: #f8fafc;
  font-family: inherit;
  font-size: 0.9rem;
  resize: vertical;
  margin-bottom: 1rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #3b82f6;
  }

  &::placeholder {
    color: #64748b;
  }
`;

const AnalyzeBtn = styled.button`
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.92rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4);
  }
`;

const KeywordsContainer = styled.div`
  margin-top: 1.5rem;
`;

const KeywordsSectionTitle = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${props => props.$color || '#94a3b8'};
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const TagCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 1.5rem;
`;

const KeywordBadge = styled.div`
  background: ${props => props.$isMatched ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)'};
  border: 1px solid ${props => props.$isMatched ? 'rgba(16, 185, 129, 0.35)' : 'rgba(245, 158, 11, 0.35)'};
  color: ${props => props.$isMatched ? '#34d399' : '#fbbf24'};
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 0.82rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const QuickAddBtn = styled.button`
  background: rgba(245, 158, 11, 0.25);
  border: none;
  color: #fde68a;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 2px;
  transition: all 0.15s;

  &:hover {
    background: #f59e0b;
    color: #fff;
    transform: scale(1.15);
  }
`;

export default function ATSScoreModal({ cvData, isOpen, onClose, onAddSkill }) {
  const [activeTab, setActiveTab] = useState('health');
  const [jobDescription, setJobDescription] = useState('');
  const [addedSkills, setAddedSkills] = useState(new Set());

  // Structural audit of current CV
  const audit = useMemo(() => auditCVStructure(cvData), [cvData]);

  // JD matching result
  const matchResult = useMemo(() => {
    const resumeText = extractCVText(cvData);
    return matchResumeWithJobDescription(resumeText, jobDescription);
  }, [cvData, jobDescription]);

  // Recruiter assessment
  const recruiterEval = useMemo(() => {
    return generateRecruiterEvaluation(cvData, matchResult, audit);
  }, [cvData, matchResult, audit]);

  if (!isOpen) return null;

  // Composite Score: If JD is provided, combine 40% audit + 60% JD match; otherwise 100% audit
  const finalScore = matchResult.matchScore !== null
    ? Math.round((audit.score * 0.4) + (matchResult.matchScore * 0.6))
    : audit.score;

  let scoreColor = '#34d399';
  let scoreBg = 'rgba(16, 185, 129, 0.15)';
  let scoreBorder = '#10b981';
  let scoreGlow = 'rgba(16, 185, 129, 0.3)';
  let statusBadge = 'Strong ATS Compatibility';
  let badgeColor = '#34d399';
  let badgeBg = 'rgba(16, 185, 129, 0.2)';

  if (finalScore < 60) {
    scoreColor = '#f87171';
    scoreBg = 'rgba(239, 68, 68, 0.15)';
    scoreBorder = '#ef4444';
    scoreGlow = 'rgba(239, 68, 68, 0.3)';
    statusBadge = 'Needs Immediate Attention';
    badgeColor = '#f87171';
    badgeBg = 'rgba(239, 68, 68, 0.2)';
  } else if (finalScore < 80) {
    scoreColor = '#fbbf24';
    scoreBg = 'rgba(245, 158, 11, 0.15)';
    scoreBorder = '#f59e0b';
    scoreGlow = 'rgba(245, 158, 11, 0.3)';
    statusBadge = 'Moderate Match (Optimize to Rank Higher)';
    badgeColor = '#fbbf24';
    badgeBg = 'rgba(245, 158, 11, 0.2)';
  }

  const handleQuickAdd = (keyword) => {
    if (onAddSkill) {
      onAddSkill(keyword);
      setAddedSkills(prev => new Set([...prev, keyword]));
    }
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        {/* Header */}
        <ModalHeader>
          <div className="title-group">
            <FiAward size={24} color="#60a5fa" />
            <div>
              <h2>ATS Resume Optimizer</h2>
              <p>Check parser compatibility and benchmark against real job postings</p>
            </div>
          </div>
          <CloseButton onClick={onClose}>
            <FiX size={18} />
          </CloseButton>
        </ModalHeader>

        {/* Hero Score Dial */}
        <ScoreHero>
          <DialWrap $bg={scoreBg} $border={scoreBorder} $glow={scoreGlow} $text={scoreColor}>
            <span className="score-num">{finalScore}</span>
            <span className="score-lbl">ATS SCORE</span>
          </DialWrap>

          <ScoreDetails $badgeBg={badgeBg} $badgeColor={badgeColor}>
            <div className="badge-tag">{statusBadge}</div>
            <h3>
              {finalScore >= 80 ? 'Ready for Application submission' : 'A few tweaks recommended before applying'}
            </h3>
            <p>
              {matchResult.matchScore !== null 
                ? `Calculated from format health (${audit.score}%) and keyword match (${matchResult.matchScore}%) for your target job description.`
                : `Based on ATS formatting, contact presence, quantifiable experience, and skills distribution.`
              }
            </p>
            <ScoreProgressBar>
              <ScoreProgressFill $percent={finalScore} $color={scoreColor} />
            </ScoreProgressBar>
          </ScoreDetails>
        </ScoreHero>

        {/* Tabs */}
        <Tabs>
          <TabButton $active={activeTab === 'health'} onClick={() => setActiveTab('health')}>
            ATS Health Checklist ({audit.issues.length === 0 ? 'All Clear' : `${audit.issues.length} Issues`})
          </TabButton>
          <TabButton $active={activeTab === 'matcher'} onClick={() => setActiveTab('matcher')}>
            Job Matcher & Keywords {matchResult.matchScore !== null && `(${matchResult.matchScore}%)`}
          </TabButton>
          <TabButton $active={activeTab === 'recruiter'} onClick={() => setActiveTab('recruiter')}>
            Recruiter Insights
          </TabButton>
        </Tabs>

        {/* Modal Content */}
        <ModalContent>
          {activeTab === 'health' && (
            <Checklist>
              {audit.issues.map((issue, idx) => (
                <CheckItem key={idx} $isIssue>
                  <FiAlertTriangle />
                  <span className="text">{issue.text}</span>
                  <span className="penalty">-{issue.penalty} pts</span>
                </CheckItem>
              ))}

              {audit.passes.map((pass, idx) => (
                <CheckItem key={idx}>
                  <FiCheckCircle />
                  <span className="text">{pass}</span>
                </CheckItem>
              ))}
            </Checklist>
          )}

          {activeTab === 'matcher' && (
            <div>
              <p style={{ fontSize: '0.92rem', color: '#cbd5e1', marginBottom: '10px' }}>
                Paste the job description from LinkedIn, Indeed, or the employer's careers page to detect missing keywords:
              </p>

              <JdTextarea 
                placeholder="Paste requirements, duties, or entire job description here..."
                value={jobDescription}
                onChange={e => setJobDescription(e.target.value)}
              />

              {matchResult.missingKeywords.length > 0 && (
                <KeywordsContainer>
                  <KeywordsSectionTitle $color="#f59e0b">
                    <FiAlertTriangle size={15} />
                    <span>Missing Keywords ({matchResult.missingKeywords.length}) — Click + to add to Skills:</span>
                  </KeywordsSectionTitle>
                  <TagCloud>
                    {matchResult.missingKeywords.map(item => {
                      const isAdded = addedSkills.has(item.word);
                      return (
                        <KeywordBadge key={item.word}>
                          <span>{item.word}</span>
                          {isAdded ? (
                            <FiCheck size={14} color="#34d399" />
                          ) : (
                            <QuickAddBtn 
                              title="Add to CV Skills"
                              onClick={() => handleQuickAdd(item.word)}
                            >
                              <FiPlus size={12} />
                            </QuickAddBtn>
                          )}
                        </KeywordBadge>
                      );
                    })}
                  </TagCloud>
                </KeywordsContainer>
              )}

              {matchResult.matchedKeywords.length > 0 && (
                <KeywordsContainer>
                  <KeywordsSectionTitle $color="#10b981">
                    <FiCheckCircle size={15} />
                    <span>Matched Keywords in Your CV ({matchResult.matchedKeywords.length}):</span>
                  </KeywordsSectionTitle>
                  <TagCloud>
                    {matchResult.matchedKeywords.map(word => (
                      <KeywordBadge key={word} $isMatched>
                        <FiCheck size={12} />
                        <span>{word}</span>
                      </KeywordBadge>
                    ))}
                  </TagCloud>
                </KeywordsContainer>
              )}

              {!jobDescription.trim() && (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#64748b' }}>
                  <FiTarget size={36} style={{ marginBottom: '8px', color: '#475569' }} />
                  <p>Paste a job posting above to see matched and missing ATS keywords in real time.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'recruiter' && (
            <div>
              <RecruiterCard>
                <h4 style={{ color: '#34d399' }}>
                  <FiCheckCircle size={17} />
                  <span>Key Candidate Strengths</span>
                </h4>
                <ul>
                  {recruiterEval.strengths.map((str, idx) => (
                    <li key={idx}>{str}</li>
                  ))}
                </ul>
              </RecruiterCard>

              {recruiterEval.concerns.length > 0 && (
                <RecruiterCard style={{ borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                  <h4 style={{ color: '#f87171' }}>
                    <FiAlertTriangle size={17} />
                    <span>Areas to Verify or Improve</span>
                  </h4>
                  <ul>
                    {recruiterEval.concerns.map((c, idx) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>
                </RecruiterCard>
              )}

              <RecruiterCard style={{ borderColor: 'rgba(96, 165, 250, 0.25)' }}>
                <h4 style={{ color: '#60a5fa' }}>
                  <FiHelpCircle size={17} />
                  <span>Suggested Interview Questions</span>
                </h4>
                <ul>
                  {recruiterEval.suggestedQuestions.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ul>
              </RecruiterCard>
            </div>
          )}
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
}
