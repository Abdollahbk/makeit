import React, { useState, useLayoutEffect, useRef } from 'react';
import templates from './templates';
import { PreviewWrapper, PageContainer, Page } from './CVPreviewStyles';

// A4 at 96 DPI is 794x1123px. We use a slightly smaller content limit
// to account for internal template padding (top/bottom).
const PAGE_HEIGHT_PX = 1122;
const PAGE_CONTENT_LIMIT = 1000; // safe zone inside A4 page

const CVPreview = ({ cvData, font, fontSize, textColor, language, template = 'basic' }) => {
  const TemplateComponent = templates[template] || templates.basic;
  const [pages, setPages] = useState([{ items: new Set(['all']) }]);
  const [isMeasuring, setIsMeasuring] = useState(true);
  const measureRef = useRef(null);

  // Trigger remeasure when any input changes
  useLayoutEffect(() => {
    setIsMeasuring(true);
  }, [cvData, template, font, fontSize, language]);

  useLayoutEffect(() => {
    if (!isMeasuring || !measureRef.current) return;

    // Use a small timeout to ensure the browser has finished painting
    const timer = setTimeout(() => {
      const container = measureRef.current;
      if (!container) return;

      const elements = Array.from(container.querySelectorAll('[data-page-item]'));

      if (elements.length === 0) {
        setPages([{ items: new Set(['all']) }]);
        setIsMeasuring(false);
        return;
      }

      // Walk through each element and calculate its top/bottom relative
      // to the measurement container using offsetTop (not getBoundingClientRect).
      // offsetTop is always relative to the nearest positioned ancestor — 
      // it is NOT affected by off-screen positioning.
      function getOffsetTop(el, ancestor) {
        let top = 0;
        let node = el;
        while (node && node !== ancestor) {
          top += node.offsetTop;
          node = node.offsetParent;
        }
        return top;
      }

      const calculatedPages = [];
      let currentPage = { items: new Set() };
      calculatedPages.push(currentPage);
      let pageStartOffsetTop = 0;

      elements.forEach(el => {
        const elTop = getOffsetTop(el, container);
        const elBottom = elTop + el.offsetHeight;
        const itemId = el.getAttribute('data-page-item');

        // How far down is the bottom of this element on the *current virtual page*?
        const bottomOnCurrentPage = elBottom - pageStartOffsetTop;

        if (bottomOnCurrentPage > PAGE_CONTENT_LIMIT && currentPage.items.size > 0) {
          // Check if the previous item added to currentPage was an orphaned section title
          const itemArray = Array.from(currentPage.items);
          const lastItemId = itemArray[itemArray.length - 1];

          if (lastItemId && lastItemId.startsWith('title-')) {
            // Remove the orphaned title from the previous page and move it to start the new page
            currentPage.items.delete(lastItemId);
            currentPage = { items: new Set([lastItemId, itemId]) };
            calculatedPages.push(currentPage);

            const titleEl = container.querySelector(`[data-page-item="${lastItemId}"]`);
            pageStartOffsetTop = titleEl ? getOffsetTop(titleEl, container) : elTop;
          } else {
            // Standard page break
            currentPage = { items: new Set([itemId]) };
            calculatedPages.push(currentPage);
            pageStartOffsetTop = elTop;
          }
        } else {
          currentPage.items.add(itemId);
        }
      });

      setPages(calculatedPages);
      setIsMeasuring(false);
    }, 50);

    return () => clearTimeout(timer);
  }, [isMeasuring]);

  return (
    <PreviewWrapper id="cv-preview-content">
      {/* Invisible measurement node — rendered inline (not off-screen) so offsetTop is reliable */}
      <div
        ref={measureRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '210mm',   // must match A4 width so layout is identical
          height: 'auto',
          visibility: 'hidden',
          pointerEvents: 'none',
          zIndex: -1,
          overflow: 'visible',
        }}
      >
        <TemplateComponent
          cvData={cvData}
          font={font}
          fontSize={fontSize}
          textColor={textColor}
          language={language}
          template={template}
          isMeasuring={true}
          pageNumber={1}
        />
      </div>

      {/* Actual paginated output */}
      {!isMeasuring && (
        <PageContainer id="cv-pages-output">
          {pages.map((page, idx) => (
            <div
              key={idx}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <Page $language={language} className="pdf-page" data-page={idx + 1}>
                <TemplateComponent
                  cvData={cvData}
                  font={font}
                  fontSize={fontSize}
                  textColor={textColor}
                  language={language}
                  template={template}
                  isMeasuring={false}
                  pageData={page}
                  pageNumber={idx + 1}
                />
              </Page>
              {pages.length > 1 && (
                <div
                  className="page-indicator no-print"
                  style={{
                    marginTop: '0.75rem',
                    marginBottom: '0.25rem',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#94a3b8',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    userSelect: 'none',
                  }}
                >
                  Page {idx + 1} of {pages.length}
                </div>
              )}
            </div>
          ))}
        </PageContainer>
      )}
    </PreviewWrapper>
  );
};

export default CVPreview;