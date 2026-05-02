import React from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { FaPaintBrush, FaMobileAlt, FaFilePdf, FaGlobe, FaBolt, FaLock } from 'react-icons/fa';

const Section = styled.section`
  padding: 100px 0;
  background: var(--surface-secondary);
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border);
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
    border-color: var(--slate-300);
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: var(--radius);
  background: var(--primary-soft);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
`;

const FeatureText = styled.p`
  color: var(--slate-600);
  font-size: 0.9375rem;
  line-height: 1.6;
`;

const features = [
  {
    icon: <FaPaintBrush />,
    title: "Premium Templates",
    desc: "Choose from Modern, Timeline, or Classic designs. All professionally structured and ATS-friendly."
  },
  {
    icon: <FaMobileAlt />,
    title: "Works Anywhere",
    desc: "Fully responsive. Build your resume on your laptop, and tweak it on your phone right before the interview."
  },
  {
    icon: <FaFilePdf />,
    title: "High-Quality Exports",
    desc: "Download your CV instantly as a pixel-perfect PDF. Ready to print or email to recruiters."
  },
  {
    icon: <FaGlobe />,
    title: "Multilingual Support",
    desc: "Supports over 10 languages including full Right-To-Left (RTL) capabilities for Arabic."
  },
  {
    icon: <FaBolt />,
    title: "Real-time Preview",
    desc: "See your changes instantly. No loading screens, no waiting. What you see is exactly what you get."
  },
  {
    icon: <FaLock />,
    title: "100% Private",
    desc: "No accounts, no cloud saving. All data stays strictly on your device for absolute privacy."
  }
];

export const Features = () => {
  return (
    <Section id="features">
      <div className="container">
        <Header>
          <Title>Everything You Need to Stand Out</Title>
          <Subtitle>Powerful features designed to make resume building effortless and fast.</Subtitle>
        </Header>

        <Grid>
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <IconWrapper>{feature.icon}</IconWrapper>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureText>{feature.desc}</FeatureText>
            </FeatureCard>
          ))}
        </Grid>
      </div>
    </Section>
  );
};
