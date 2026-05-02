import React from 'react';
import styled from 'styled-components';
import { Hero } from '../components/sections/Hero';
import { Features } from '../components/sections/Features';
import { Templates } from '../components/sections/Templates';
import { HowItWorks } from '../components/sections/HowItWorks';
import { CTA } from '../components/sections/CTA';

const Main = styled.main`
  flex: 1;
`;

export const Home = () => {
  return (
    <Main>
      <Hero />
      <Features />
      <Templates />
      <HowItWorks />
      <CTA />
    </Main>
  );
};
