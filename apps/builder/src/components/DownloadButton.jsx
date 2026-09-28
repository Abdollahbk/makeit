import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiDownload, FiChevronDown, FiFileText, FiFile } from 'react-icons/fi';
import translations from '../translations';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, LineRuleType, Table, TableRow, TableCell, WidthType } from "docx";
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
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999999;
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
    let staging = null;
    try {
      // Allow browser to render the solid LoadingOverlay before any DOM manipulation
      await new Promise(resolve => requestAnimationFrame(() => setTimeout(resolve, 80)));

      const [html2canvasModule, jsPDFModule] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);
      const html2canvas = html2canvasModule.default;
      const { jsPDF } = jsPDFModule;

      if (document.fonts) {
        await document.fonts.ready;
      }

      // Get all live rendered page elements directly from the DOM
      let pageElements = Array.from(document.querySelectorAll('.pdf-page'));

      if (pageElements.length === 0) {
        await new Promise(r => setTimeout(r, 150));
        pageElements = Array.from(document.querySelectorAll('.pdf-page'));
      }

      if (pageElements.length === 0) {
        console.error('No pages found to export');
        return;
      }

      // Create an unscaled, isolated staging container attached to body
      // Placed behind the root application (z-index: -99999) so it is 100% invisible to the user at all times
      staging = document.createElement('div');
      staging.style.position = 'fixed';
      staging.style.left = '0';
      staging.style.top = '0';
      staging.style.width = '210mm';
      staging.style.height = '297mm';
      staging.style.zIndex = '-99999';
      staging.style.background = '#ffffff';
      staging.style.margin = '0';
      staging.style.padding = '0';
      staging.style.transform = 'none';
      staging.style.overflow = 'hidden';
      staging.style.pointerEvents = 'none';
      document.body.appendChild(staging);

      // A4 dimensions in mm
      const PDF_WIDTH_MM = 210;
      const PDF_HEIGHT_MM = 297;

      const pdf = new jsPDF({
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
        compress: true,
      });

      for (let i = 0; i < pageElements.length; i++) {
        const pageEl = pageElements[i];

        // Clone page element into the unscaled staging container
        const clone = pageEl.cloneNode(true);
        clone.style.transform = 'none';
        clone.style.boxShadow = 'none';
        clone.style.outline = 'none';
        clone.style.margin = '0';
        clone.style.width = '210mm';
        clone.style.height = '297mm';
        clone.style.position = 'relative';
        clone.style.overflow = 'hidden';
        staging.appendChild(clone);

        // Small pause for layout calculation
        await new Promise(r => setTimeout(r, 50));

        const canvas = await html2canvas(clone, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
        });

        // Remove from staging
        staging.removeChild(clone);

        const imgData = canvas.toDataURL('image/jpeg', 0.98);

        if (i > 0) {
          pdf.addPage();
        }

        pdf.addImage(imgData, 'JPEG', 0, 0, PDF_WIDTH_MM, PDF_HEIGHT_MM);
      }

      // Immediately remove staging from the DOM before triggering the download
      if (staging && staging.parentNode) {
        staging.parentNode.removeChild(staging);
        staging = null;
      }

      // Small tick for clean DOM commitment
      await new Promise(r => setTimeout(r, 30));

      const filename = `${cvData.personalInfo.firstName || 'CV'}_${cvData.personalInfo.lastName || 'Resume'}.pdf`;
      pdf.save(filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      if (staging && staging.parentNode) {
        staging.parentNode.removeChild(staging);
        staging = null;
      }
      setIsGenerating(false);
    }
  };

  const generateDocx = async () => {
    setIsOpen(false);
    setIsGenerating(true);
    try {
      const { personalInfo, summary, experience, education, skills, languages, interests, certificates } = cvData;

      const borderNone = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
      const bordersNone = { top: borderNone, bottom: borderNone, left: borderNone, right: borderNone };

      const createSectionHeading = (titleText) => {
        return new Paragraph({
          children: [
            new TextRun({
              text: titleText.toUpperCase(),
              bold: true,
              size: 24, // 12pt
              color: "1e293b",
            }),
          ],
          border: {
            bottom: { color: "2563eb", space: 6, style: BorderStyle.SINGLE, size: 12 },
          },
          spacing: { before: 320, after: 160 },
        });
      };

      const parseDescriptionParagraphs = (descText) => {
        if (!descText) return [];
        const lines = descText.split('\n').map(l => l.trim()).filter(Boolean);
        return lines.map(line => {
          const isBullet = line.startsWith('-') || line.startsWith('•') || line.startsWith('*');
          const cleanText = isBullet ? line.replace(/^[-•*]\s*/, '') : line;
          return new Paragraph({
            children: [new TextRun({ text: cleanText, size: 20, color: "334155" })],
            bullet: isBullet ? { level: 0 } : undefined,
            spacing: { after: 60 },
          });
        });
      };

      const createItemHeaderTable = (leftRuns, rightText, rightSubText = "") => {
        return new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 70, type: WidthType.PERCENTAGE },
                  borders: bordersNone,
                  margins: { top: 60, bottom: 40, left: 0, right: 0 },
                  children: [new Paragraph({ children: leftRuns, spacing: { after: 40 } })],
                }),
                new TableCell({
                  width: { size: 30, type: WidthType.PERCENTAGE },
                  borders: bordersNone,
                  margins: { top: 60, bottom: 40, left: 0, right: 0 },
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.RIGHT,
                      children: [
                        new TextRun({ text: rightText, italics: true, bold: true, size: 19, color: "2563eb" }),
                        ...(rightSubText ? [new TextRun({ text: `\n${rightSubText}`, size: 18, color: "64748b" })] : []),
                      ],
                      spacing: { after: 40 },
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
      };

      const sections = [];

      // 1. Header: Name & Title
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`.trim().toUpperCase(),
              bold: true,
              size: 44, // 22pt
              color: "0f172a",
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 80 },
        })
      );

      if (personalInfo.title) {
        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: personalInfo.title.toUpperCase(),
                bold: true,
                size: 24, // 12pt
                color: "2563eb",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 140 },
          })
        );
      }

      // Contact Info Line
      const contactParts = [
        personalInfo.email,
        personalInfo.phone,
        personalInfo.location,
        personalInfo.website,
        personalInfo.linkedin,
        personalInfo.github,
      ].filter(Boolean);

      if (contactParts.length > 0) {
        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: contactParts.join("  •  "),
                size: 19,
                color: "475569",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
          })
        );
      }

      // Additional Personal Information (Birth date, nationality, etc.)
      const extraDetails = [
        personalInfo.nationality ? `${translations[language]?.nationality || 'Nationality'}: ${personalInfo.nationality}` : null,
        personalInfo.drivingLicense ? `${translations[language]?.drivingLicense || 'Driving License'}: ${personalInfo.drivingLicense}` : null,
        personalInfo.birthDate ? `${translations[language]?.birthDate || 'Birth Date'}: ${personalInfo.birthDate}` : null,
        personalInfo.birthPlace ? `${translations[language]?.birthPlace || 'Birth Place'}: ${personalInfo.birthPlace}` : null,
        personalInfo.gender ? `${translations[language]?.gender || 'Gender'}: ${personalInfo.gender}` : null,
        personalInfo.maritalStatus ? `${translations[language]?.maritalStatus || 'Marital Status'}: ${personalInfo.maritalStatus}` : null,
      ].filter(Boolean);

      if (extraDetails.length > 0) {
        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: extraDetails.join("  |  "),
                size: 18,
                color: "64748b",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 160 },
          })
        );
      }

      // Header border divider
      sections.push(
        new Paragraph({
          text: "",
          border: {
            bottom: { color: "cbd5e1", space: 8, style: BorderStyle.SINGLE, size: 8 },
          },
          spacing: { after: 200 },
        })
      );

      // 2. Summary
      if (summary) {
        sections.push(createSectionHeading(translations[language]?.profile || 'Profile'));
        sections.push(
          new Paragraph({
            children: [new TextRun({ text: summary, size: 21, color: "334155" })],
            spacing: { after: 200 },
            alignment: language === 'ar' ? AlignmentType.RIGHT : AlignmentType.LEFT,
          })
        );
      }

      // 3. Experience
      if (experience && experience.length > 0) {
        sections.push(createSectionHeading(translations[language]?.experience || 'Experience'));

        experience.forEach(exp => {
          const leftRuns = [
            new TextRun({ text: exp.position || '', bold: true, size: 22, color: "0f172a" }),
          ];
          if (exp.company) {
            leftRuns.push(new TextRun({ text: `  |  ${exp.company}`, bold: true, size: 21, color: "2563eb" }));
          }
          if (exp.location) {
            leftRuns.push(new TextRun({ text: `  (${exp.location})`, size: 19, color: "64748b" }));
          }

          const dateRange = `${exp.startDate || ''} — ${exp.endDate || translations[language]?.present || 'Present'}`;

          sections.push(createItemHeaderTable(leftRuns, dateRange));

          const descParagraphs = parseDescriptionParagraphs(exp.description);
          descParagraphs.forEach(p => sections.push(p));
        });
      }

      // 4. Education
      if (education && education.length > 0) {
        sections.push(createSectionHeading(translations[language]?.education || 'Education'));

        education.forEach(edu => {
          const leftRuns = [
            new TextRun({ text: edu.degree || '', bold: true, size: 22, color: "0f172a" }),
          ];
          if (edu.school) {
            leftRuns.push(new TextRun({ text: `  |  ${edu.school}`, bold: true, size: 21, color: "2563eb" }));
          }
          if (edu.city) {
            leftRuns.push(new TextRun({ text: `  (${edu.city})`, size: 19, color: "64748b" }));
          }

          const dateRange = `${edu.startDate || ''} — ${edu.endDate || ''}`;

          sections.push(createItemHeaderTable(leftRuns, dateRange));

          const descParagraphs = parseDescriptionParagraphs(edu.description);
          descParagraphs.forEach(p => sections.push(p));
        });
      }

      // 5. Skills
      if (skills && skills.length > 0) {
        sections.push(createSectionHeading(translations[language]?.skills || 'Skills'));

        skills.forEach(skill => {
          const skillName = typeof skill === 'object' ? skill.name : skill;
          const skillLevel = typeof skill === 'object' && skill.level ? ` (${skill.level})` : '';

          sections.push(
            new Paragraph({
              children: [
                new TextRun({ text: skillName, bold: true, size: 20, color: "1e293b" }),
                ...(skillLevel ? [new TextRun({ text: skillLevel, size: 19, color: "64748b" })] : []),
              ],
              bullet: { level: 0 },
              spacing: { after: 60 },
            })
          );
        });
      }

      // 6. Languages
      if (languages && languages.length > 0) {
        sections.push(createSectionHeading(translations[language]?.languages || 'Languages'));

        languages.forEach(lang => {
          const langName = typeof lang === 'object' ? lang.name : lang;
          const langLevel = typeof lang === 'object' && lang.level ? ` — ${lang.level}` : '';

          sections.push(
            new Paragraph({
              children: [
                new TextRun({ text: langName, bold: true, size: 20, color: "1e293b" }),
                ...(langLevel ? [new TextRun({ text: langLevel, size: 19, color: "2563eb" })] : []),
              ],
              bullet: { level: 0 },
              spacing: { after: 60 },
            })
          );
        });
      }

      // 7. Certificates
      if (certificates && certificates.length > 0) {
        sections.push(createSectionHeading(translations[language]?.certificates || 'Certificates'));

        certificates.forEach(cert => {
          const leftRuns = [
            new TextRun({ text: cert.name || '', bold: true, size: 21, color: "0f172a" }),
          ];

          sections.push(createItemHeaderTable(leftRuns, cert.endDate || ''));

          const descParagraphs = parseDescriptionParagraphs(cert.description);
          descParagraphs.forEach(p => sections.push(p));
        });
      }

      // 8. Interests
      if (interests && interests.length > 0) {
        sections.push(createSectionHeading(translations[language]?.interests || 'Interests'));

        const interestNames = interests.map(it => typeof it === 'object' ? it.name : it).filter(Boolean);
        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: interestNames.join("  •  "),
                size: 20,
                color: "334155",
              }),
            ],
            spacing: { after: 120 },
          })
        );
      }

      const doc = new Document({
        styles: {
          default: {
            document: {
              run: {
                font: "Calibri",
              },
            },
          },
        },
        sections: [{
          properties: {
            page: {
              margin: {
                top: 1080, // 0.75 in
                right: 1080,
                bottom: 1080,
                left: 1080,
              },
            },
          },
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
