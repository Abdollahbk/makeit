import React from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { Button } from '../ui/Button';

const HeroSection = styled.section`
  min-height: 100vh;
  padding: 120px 0 80px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -20%;
    left: -10%;
    width: 60%;
    height: 80%;
    background: radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, rgba(2, 6, 23, 0) 70%);
    pointer-events: none;
    z-index: 0;
  }
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 1.5rem;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 2.75rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: var(--slate-300);
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const Hero = () => {
  return (
    <HeroSection>
      <div className="container">
        <Content>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Dream Job Starts With a <span className="text-gradient">Perfect CV</span>
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Build stunning, ATS-ready resumes in minutes. Completely private, fully customizable, and entirely free. No design skills needed.
          </Subtitle>
          <ButtonGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button href="./builder/" variant="primary" size="lg">Create My CV</Button>
            <Button href="#templates" variant="secondary" size="lg">See Templates</Button>
          </ButtonGroup>
        </Content>
      </div>
    </HeroSection>
  );
};
