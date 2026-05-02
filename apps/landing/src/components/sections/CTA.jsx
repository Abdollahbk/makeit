import React from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { Button } from '../ui/Button';

const Section = styled.section`
  padding: 100px 0;
  background: white;
`;

const CTAWrapper = styled(motion.div)`
  background: var(--grad-blue);
  border-radius: var(--radius-xl);
  padding: 5rem 2rem;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(37, 99, 235, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -10%;
    width: 60%;
    height: 150%;
    background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%);
    pointer-events: none;
  }
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 500px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
`;

export const CTA = () => {
  return (
    <Section>
      <div className="container">
        <CTAWrapper
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <Title>Ready to get started?</Title>
          <Subtitle>Create your professional CV in minutes and land your dream job faster.</Subtitle>
          <Button href="./builder/" size="lg" style={{ 
            background: 'white', 
            color: 'var(--primary)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
          }}>
            Create Your CV Now
          </Button>
        </CTAWrapper>
      </div>
    </Section>
  );
};
