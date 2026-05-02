import React from 'react';
import { FiFileText } from 'react-icons/fi';
import { Section, SectionTitle, Textarea } from '../CVFormStyles';
import translations from '../../translations';

const SummarySection = ({ cvData, updateCVData, language }) => {
  return (
    <Section>
      <SectionTitle>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <FiFileText style={{ color: 'var(--primary)' }} />
          {translations[language].profile}
        </div>
      </SectionTitle>
      <Textarea
        value={cvData.summary}
        onChange={(e) => updateCVData('summary', e.target.value)}
        placeholder={translations[language].summary}
      />
    </Section>
  );
};

export default SummarySection;
