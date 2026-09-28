import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiArrowLeft, FiFileText, FiShield } from 'react-icons/fi';

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
    display: flex;
    align-items: center;
    gap: 8px;
  }

  p {
    color: #cbd5e1;
    margin-bottom: 1.25rem;
    line-height: 1.75;
    font-size: 1rem;
  }
`;

export default function Privacy() {
  return (
    <PageWrapper>
      <NavHeader>
        <BackLink to="/">
          <FiArrowLeft />
          <span>Back to Home</span>
        </BackLink>
      </NavHeader>

      <Card>
        <h1>Privacy Policy</h1>
        <p className="date">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Information We Collect</h2>
        <p>
          MakeIt operates strictly as a client-side application. We do not collect, transmit, or store any personal information on external servers. All text, dates, contact details, and images you provide remain entirely inside your local browser session.
        </p>
        
        <h2>2. How Your Information Is Handled</h2>
        <p>
          The data you type into the editor is processed in memory on your device solely to render the preview and generate the downloadable PDF and DOCX files. Once you close the tab, your session is wiped clean unless you have saved files locally.
        </p>
        
        <h2>3. Third-Party Tracking & Cookies</h2>
        <p>
          We do not use tracking cookies, analytics pixels, or advertisement trackers. You can build and download your resumes with total confidentiality.
        </p>
        
        <h2>4. Your Rights & Control</h2>
        <p>
          Because we never store your data, you retain 100% ownership and control over your intellectual property and personal data at all times.
        </p>
        
        <h2>5. Contact Us</h2>
        <p>
          If you have questions regarding this privacy statement, please open an issue or pull request on our repository.
        </p>
      </Card>
    </PageWrapper>
  );
}
