import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../ui/Button';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 72px;
  background: ${props => props.$scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent'};
  backdrop-filter: ${props => props.$scrolled ? 'blur(12px)' : 'none'};
  border-bottom: ${props => props.$scrolled ? '1px solid rgba(0, 0, 0, 0.05)' : '1px solid transparent'};
  z-index: 1000;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Logo = styled(Link)`
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.5rem;
  letter-spacing: -0.02em;
  color: ${props => props.$scrolled ? 'var(--slate-900)' : 'white'};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    color: var(--primary);
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${props => props.$scrolled ? 'var(--slate-600)' : 'rgba(255, 255, 255, 0.7)'};
  font-weight: 500;
  font-size: 0.9375rem;

  &:hover {
    color: ${props => props.$scrolled ? 'var(--slate-900)' : 'white'};
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderWrapper $scrolled={scrolled}>
      <div className="container" style={{ width: '100%' }}>
        <Nav>
          <Logo to="/" $scrolled={scrolled}>Make<span>It</span></Logo>
          
          <NavLinks>
            <NavLink href="#features" $scrolled={scrolled}>Features</NavLink>
            <NavLink href="#templates" $scrolled={scrolled}>Templates</NavLink>
            <NavLink href="#how-it-works" $scrolled={scrolled}>How it Works</NavLink>
          </NavLinks>

          <Actions>
            <Button href="./builder/" variant="primary">Start for Free &rarr;</Button>
          </Actions>
        </Nav>
      </div>
    </HeaderWrapper>
  );
};
