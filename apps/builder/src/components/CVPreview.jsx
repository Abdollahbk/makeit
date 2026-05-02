import React from 'react';
import templates from './templates';
import { PreviewWrapper } from './CVPreviewStyles';

/**
 * CVPreview component that dynamically renders a template based on the template prop.
 * It uses a registry of templates from the templates directory.
 */
const CVPreview = ({ cvData, font, fontSize, textColor, language, template = 'basic' }) => {
  // Select the template component from the registry, default to 'basic'
  const TemplateComponent = templates[template] || templates.basic;

  return (
    <PreviewWrapper id="cv-preview-content" language={language}>
      <TemplateComponent
        cvData={cvData}
        font={font}
        fontSize={fontSize}
        textColor={textColor}
        language={language}
        template={template}
      />
    </PreviewWrapper>
  );
};

export default CVPreview;