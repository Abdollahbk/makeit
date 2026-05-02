import React from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { Button } from '../ui/Button';

const Section = styled.section`
  padding: 100px 0;
  background: white;
  position: relative;
`;

const Header = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 4rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: var(--slate-600);
  font-size: 1.125rem;
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const TemplateCard = styled(motion.div)`
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  aspect-ratio: 1 / 1.414; /* A4 Ratio */
  background: var(--slate-50);
  border: 1px solid var(--slate-200);
  cursor: pointer;

  &:hover .overlay {
    opacity: 1;
  }
`;

const TemplateImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: top center;
  
  &.modern { background-image: url('/temp3.png'); }
  &.timeline { background-image: url('/temp2.png'); }
  &.classic { background-image: url('/temp1.png'); }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
  padding: 2rem;
  text-align: center;
`;

const TemplateName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const TemplateDesc = styled.p`
  color: var(--slate-300);
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
`;

export const Templates = () => {
  const templates = [
    { id: 'modern', name: 'Modern', desc: 'Clean, bold, and perfect for creative roles.', class: 'modern' },
    { id: 'timeline', name: 'Timeline', desc: 'Focus on your career progression with elegant lines.', class: 'timeline' },
    { id: 'classic', name: 'Classic', desc: 'Traditional and professional. Best for corporate jobs.', class: 'classic' }
  ];

  return (
    <Section id="templates">
      <div className="container">
        <Header>
          <Title>Templates for Every Career</Title>
          <Subtitle>Start with a professionally designed layout and customize it to match your style.</Subtitle>
        </Header>

        <Gallery>
          {templates.map((tpl, idx) => (
            <TemplateCard
              key={tpl.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <TemplateImage className={tpl.class} />
              <Overlay className="overlay">
                <TemplateName>{tpl.name}</TemplateName>
                <TemplateDesc>{tpl.desc}</TemplateDesc>
                <Button href="http://localhost:5173" variant="primary">Use Template</Button>
              </Overlay>
            </TemplateCard>
          ))}
        </Gallery>
      </div>
    </Section>
  );
};
