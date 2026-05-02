import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: var(--slate-950);
  color: var(--slate-400);
  padding: 4rem 0 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Brand = styled.div`
  max-width: 300px;
`;

const Logo = styled(Link)`
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.5rem;
  letter-spacing: -0.02em;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  span {
    color: var(--primary);
  }
`;

const NavCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ColTitle = styled.h4`
  color: white;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const FooterLink = styled(Link)`
  color: var(--slate-400);
  font-size: 0.875rem;
  
  &:hover {
    color: white;
  }
`;

const ExternalLink = styled.a`
  color: var(--slate-400);
  font-size: 0.875rem;
  
  &:hover {
    color: white;
  }
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.875rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

export const Footer = () => {
  return (
    <FooterWrapper>
      <div className="container">
        <FooterGrid>
          <Brand>
            <Logo to="/">Make<span>It</span></Logo>
            <p>Build stunning, ATS-ready resumes in minutes. Completely private, fully customizable, and entirely free.</p>
          </Brand>
          
          <NavCol>
            <ColTitle>Product</ColTitle>
            <ExternalLink href="#features">Features</ExternalLink>
            <ExternalLink href="#templates">Templates</ExternalLink>
            <ExternalLink href="http://localhost:5173">App</ExternalLink>
          </NavCol>

          <NavCol>
            <ColTitle>Legal</ColTitle>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms of Service</FooterLink>
          </NavCol>
        </FooterGrid>

        <Bottom>
          <p>&copy; {new Date().getFullYear()} MakeIt CV Builder. All rights reserved.</p>
        </Bottom>
      </div>
    </FooterWrapper>
  );
};
