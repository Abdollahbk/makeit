import React from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';

const Section = styled.section`
  padding: 100px 0;
  background: var(--slate-950);
  color: white;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(37, 99, 235, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const Header = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 5rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: white;
`;

const Subtitle = styled.p`
  color: var(--slate-300);
  font-size: 1.125rem;
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  max-width: 800px;
  margin: 0 auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 24px;
    height: 100%;
    width: 2px;
    background: linear-gradient(to bottom, var(--primary) 0%, rgba(37, 99, 235, 0) 100%);
    
    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const Step = styled(motion.div)`
  display: flex;
  gap: 2rem;
  position: relative;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const StepNumber = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--slate-900);
  border: 2px solid var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
`;

const StepContent = styled.div`
  padding-top: 0.5rem;
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: white;
`;

const StepDesc = styled.p`
  color: var(--slate-300);
  font-size: 1.0625rem;
  line-height: 1.6;
`;

export const HowItWorks = () => {
  const steps = [
    {
      title: "Fill in Your Details",
      desc: "Add your experience, education, and skills. Our clean interface makes it easy to organize your career history."
    },
    {
      title: "Choose a Design",
      desc: "Select from our premium templates. Adjust colors, fonts, and layout options until it perfectly matches your personal brand."
    },
    {
      title: "Download & Apply",
      desc: "Instantly export your resume as a high-quality PDF. Ready to pass ATS systems and impress hiring managers."
    }
  ];

  return (
    <Section id="how-it-works">
      <div className="container">
        <Header>
          <Title>Three Steps to Success</Title>
          <Subtitle>We've streamlined the process so you can focus on what matters: landing the interview.</Subtitle>
        </Header>

        <StepsContainer>
          {steps.map((step, idx) => (
            <Step
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <StepNumber>{idx + 1}</StepNumber>
              <StepContent>
                <StepTitle>{step.title}</StepTitle>
                <StepDesc>{step.desc}</StepDesc>
              </StepContent>
            </Step>
          ))}
        </StepsContainer>
      </div>
    </Section>
  );
};
