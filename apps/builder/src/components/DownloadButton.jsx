import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiDownload, FiChevronDown, FiFileText, FiFile } from 'react-icons/fi';
import translations from '../translations';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, LineRuleType } from "docx";
import { saveAs } from "file-saver";

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  filter: drop-shadow(0 4px 15px rgba(37, 99, 235, 0.2));
`;

const MainButton = styled.button`
  background: var(--grad-blue);
  color: #fff;
  border: none;
  padding: 0.75rem 1.25rem 0.75rem 1.5rem;
  border-radius: var(--radius-full) 0 0 var(--radius-full);
  font-size: 0.9375rem;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    filter: brightness(1.1);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    .btn-text {
      display: none;
    }
  }
`;

const ArrowButton = styled.button`
  background: var(--grad-blue);
  color: #fff;
  border: none;
  padding: 0.75rem 0.875rem;
  border-radius: 0 var(--radius-full) var(--radius-full) 0;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    filter: brightness(1.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #fff;
  border: 1px solid var(--slate-200);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  min-width: 180px;
  z-index: 1000;
  overflow: hidden;
  padding: 6px;
  animation: slideIn 0.2s ease-out;

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const DropdownItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: none;
  background: transparent;
  color: var(--slate-700);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: var(--radius);
  transition: all 0.15s;

  &:hover {
    background: var(--slate-50);
    color: var(--primary);
  }

  svg {
    font-size: 1.1rem;
    color: var(--slate-400);
  }

  &:hover svg {
    color: var(--primary);
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  color: white;
  gap: 1.5rem;
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const DownloadButton = ({ cvData, template, language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasContent = cvData.personalInfo.firstName || 
    cvData.personalInfo.lastName || 
    cvData.summary || 
    cvData.experience.length > 0;

  const generatePDF = async () => {
    setIsOpen(false);
    setIsGenerating(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const previewNode = document.getElementById('cv-preview-measurement');
      
      if (!previewNode) {
        console.error('Preview element not found');
        return;
      }
      
      const options = {
        margin: 0,
        filename: `${cvData.personalInfo.firstName || 'CV'}_${cvData.personalInfo.lastName || 'Resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
          backgroundColor: '#ffffff',
          scrollY: 0,
          scrollX: 0
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true
        },
        pagebreak: { mode: ['css', 'legacy'] }
      };

      await html2pdf().from(previewNode).set(options).save();
      
      previewNode.style.transform = originalTransform;
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateDocx = async () => {
    setIsOpen(false);
    setIsGenerating(true);
    try {
      const { personalInfo, summary, experience, education, skills, languages, interests, certificates } = cvData;
      
      const sections = [];

      // Header
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${personalInfo.firstName} ${personalInfo.lastName}`.toUpperCase(),
              bold: true,
              size: 48,
              color: "1e293b",
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: personalInfo.title || "",
              bold: true,
              size: 28,
              color: "475569",
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: `${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}` }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
          border: {
            bottom: { color: "e2e8f0", space: 10, style: BorderStyle.SINGLE, size: 1 },
          },
        })
      );

      // Summary
      if (summary) {
        sections.push(
          new Paragraph({
            text: translations[language].profile.toUpperCase(),
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({
            children: [new TextRun({ text: summary })],
            spacing: { after: 200 },
          })
        );
      }

      // Experience
      if (experience.length > 0) {
        sections.push(
          new Paragraph({
            text: translations[language].experience.toUpperCase(),
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          })
        );

        experience.forEach(exp => {
          sections.push(
            new Paragraph({
              children: [
                new TextRun({ text: exp.position, bold: true }),
                new TextRun({ text: ` at ${exp.company}`, bold: true }),
                new TextRun({ text: `\t${exp.startDate} - ${exp.endDate}`, italics: true }),
              ],
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [new TextRun({ text: exp.description })],
              spacing: { after: 200 },
            })
          );
        });
      }

      // Education
      if (education.length > 0) {
        sections.push(
          new Paragraph({
            text: translations[language].education.toUpperCase(),
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          })
        );

        education.forEach(edu => {
          sections.push(
            new Paragraph({
              children: [
                new TextRun({ text: edu.degree, bold: true }),
                new TextRun({ text: ` at ${edu.school}`, bold: true }),
                new TextRun({ text: `\t${edu.startDate} - ${edu.endDate}`, italics: true }),
              ],
              spacing: { after: 100 },
            })
          );
        });
      }

      // Certificates
      if (certificates && certificates.length > 0) {
        sections.push(
          new Paragraph({
            text: translations[language].certificates.toUpperCase(),
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          })
        );

        certificates.forEach(cert => {
          sections.push(
            new Paragraph({
              children: [
                new TextRun({ text: cert.name, bold: true }),
                new TextRun({ text: `\t${cert.endDate === 'Present' ? translations[language].present : cert.endDate}`, italics: true }),
              ],
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [new TextRun({ text: cert.description })],
              spacing: { after: 200 },
            })
          );
        });
      }

      // Skills
      if (skills.length > 0) {
        sections.push(
          new Paragraph({
            text: translations[language].skills.toUpperCase(),
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({
            text: skills.map(s => `${s.name} (${s.level})`).join(", "),
            spacing: { after: 200 },
          })
        );
      }

      const doc = new Document({
        sections: [{
          properties: {},
          children: sections,
        }],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${personalInfo.firstName || 'CV'}_${personalInfo.lastName || 'Resume'}.docx`);
    } catch (error) {
      console.error('Error generating DOCX:', error);
      alert('Error generating DOCX.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <ButtonGroup>
        <MainButton 
          disabled={!hasContent || isGenerating}
          onClick={generatePDF}
        >
          <FiDownload style={{ fontSize: 18 }} />
          <span className="btn-text">{translations[language].downloadPDF}</span>
        </MainButton>
        <ArrowButton 
          disabled={!hasContent || isGenerating}
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiChevronDown style={{ 
            fontSize: 18, 
            transition: 'transform 0.2s',
            transform: isOpen ? 'rotate(180deg)' : 'none'
          }} />
        </ArrowButton>

        {isOpen && (
          <DropdownMenu>
            <DropdownItem onClick={generatePDF}>
              <FiFileText />
              {translations[language].pdf}
            </DropdownItem>
            <DropdownItem onClick={generateDocx}>
              <FiFile />
              {translations[language].docx}
            </DropdownItem>
          </DropdownMenu>
        )}
      </ButtonGroup>

      {isGenerating && (
        <LoadingOverlay>
          <Spinner />
          <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>
            {language === 'ar' ? 'جاري التحميل...' : 'Generating your file...'}
          </div>
        </LoadingOverlay>
      )}
    </div>
  );
};

export default DownloadButton;
