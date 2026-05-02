import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  padding: 120px 0 80px;
  min-height: 80vh;
  background: var(--surface);
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.5rem;
    margin: 2rem 0 1rem;
    color: var(--slate-800);
  }

  p {
    color: var(--slate-600);
    margin-bottom: 1rem;
    line-height: 1.7;
  }
`;

export const Privacy = () => {
  return (
    <PageWrapper>
      <div className="container">
        <Content>
          <h1>Privacy Policy</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Information We Collect</h2>
          <p>MakeIt CV Builder operates strictly as a client-side application. We do not collect, store, or transmit your personal data to any external servers. All information you input into the CV builder remains entirely on your local device.</p>
          
          <h2>2. How We Use Your Information</h2>
          <p>The information you provide is used exclusively within your browser to generate your CV. It is temporarily held in your browser's local state and is lost once you refresh or close the page (unless you explicitly save it locally).</p>
          
          <h2>3. Cookies and Tracking</h2>
          <p>We do not use tracking cookies, analytics, or third-party marketing trackers on this application.</p>
          
          <h2>4. Your Rights</h2>
          <p>Because we do not store your data, you retain complete ownership and control over your personal information at all times. Simply close the application to clear your current session.</p>
          
          <h2>5. Contact Us</h2>
          <p>If you have any questions about this privacy policy, please contact us.</p>
        </Content>
      </div>
    </PageWrapper>
  );
};
