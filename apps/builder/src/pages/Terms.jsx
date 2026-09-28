import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiArrowLeft } from 'react-icons/fi';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #030712;
  color: #f8fafc;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  padding: 40px 20px 80px;
`;

const NavHeader = styled.div`
  max-width: 800px;
  margin: 0 auto 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Card = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: clamp(24px, 5vw, 48px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);

  h1 {
    font-size: clamp(2rem, 3.5vw, 2.8rem);
    font-weight: 800;
    margin-bottom: 0.5rem;
    color: #f8fafc;
  }

  .date {
    color: #64748b;
    font-size: 0.9rem;
    margin-bottom: 2.5rem;
  }

  h2 {
    font-size: 1.35rem;
    font-weight: 700;
    margin: 2rem 0 0.75rem;
    color: #93c5fd;
  }

  p {
    color: #cbd5e1;
    margin-bottom: 1.25rem;
    line-height: 1.75;
    font-size: 1rem;
  }
`;

export default function Terms() {
  return (
    <PageWrapper>
      <NavHeader>
        <BackLink to="/">
          <FiArrowLeft />
          <span>Back to Home</span>
        </BackLink>
      </NavHeader>

      <Card>
        <h1>Terms of Service</h1>
        <p className="date">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using MakeIt CV Builder, you acknowledge and agree to comply with these terms of service.
        </p>
        
        <h2>2. Permitted Use</h2>
        <p>
          MakeIt is provided to you as a free web-based resume preparation tool. You are granted a personal, non-exclusive license to utilize the templates, typography, and export functionality for creating resumes.
        </p>
        
        <h2>3. Content Ownership & Responsibility</h2>
        <p>
          You retain full copyright and responsibility for the text, credentials, qualifications, and graphics you include in your CV. We neither verify nor endorse any content created with this software.
        </p>
        
        <h2>4. Disclaimer of Warranties</h2>
        <p>
          The application and exported documents are provided on an "as-is" and "as-available" basis without representations or warranties of any kind.
        </p>
        
        <h2>5. Limitation of Liability</h2>
        <p>
          In no event shall the authors or maintainers be liable for any direct, indirect, incidental, or consequential damages resulting from your use of this service.
        </p>
      </Card>
    </PageWrapper>
  );
}
