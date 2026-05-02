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

export const Terms = () => {
  return (
    <PageWrapper>
      <div className="container">
        <Content>
          <h1>Terms of Service</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using MakeIt CV Builder, you accept and agree to be bound by the terms and provision of this agreement.</p>
          
          <h2>2. Use of the Application</h2>
          <p>MakeIt CV Builder is provided "as is" and "as available". We grant you a personal, non-exclusive, non-transferable license to use the application strictly to create your personal resumes.</p>
          
          <h2>3. User Content</h2>
          <p>You are solely responsible for all content that you input into the application. We do not store, review, or verify any of the information you provide.</p>
          
          <h2>4. Disclaimer of Warranties</h2>
          <p>The application is provided without warranties of any kind, whether express or implied. We do not guarantee that the application will always be available, secure, or error-free.</p>
          
          <h2>5. Limitation of Liability</h2>
          <p>In no event shall MakeIt CV Builder be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.</p>
        </Content>
      </div>
    </PageWrapper>
  );
};
