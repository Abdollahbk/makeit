import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { motion } from 'motion/react';

const buttonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  text-decoration: none;
  font-family: inherit;

  ${props => props.$variant === 'primary' && css`
    background: var(--primary);
    color: white;
    border: none;
    box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.39);
    
    &:hover {
      background: var(--primary-hover);
      box-shadow: 0 6px 20px rgba(37, 99, 235, 0.23);
      transform: translateY(-1px);
    }
  `}

  ${props => props.$variant === 'secondary' && css`
    background: white;
    color: var(--slate-900);
    border: 1px solid var(--slate-200);
    box-shadow: var(--shadow-sm);
    
    &:hover {
      background: var(--slate-50);
      border-color: var(--slate-300);
    }
  `}

  ${props => props.$variant === 'ghost' && css`
    background: transparent;
    color: var(--slate-600);
    border: none;
    
    &:hover {
      background: var(--slate-100);
      color: var(--slate-900);
    }
  `}

  ${props => props.$size === 'lg' && css`
    padding: 1rem 2rem;
    font-size: 1.125rem;
  `}
`;

const StyledButton = styled(motion.button)`
  ${buttonStyles}
`;

const StyledLink = styled(motion(Link))`
  ${buttonStyles}
`;

const ExternalLink = styled(motion.a)`
  ${buttonStyles}
`;

export const Button = ({ children, variant = 'primary', size = 'md', to, href, ...props }) => {
  if (to) {
    return (
      <StyledLink to={to} $variant={variant} $size={size} whileTap={{ scale: 0.98 }} {...props}>
        {children}
      </StyledLink>
    );
  }
  
  if (href) {
    return (
      <ExternalLink href={href} $variant={variant} $size={size} whileTap={{ scale: 0.98 }} {...props}>
        {children}
      </ExternalLink>
    );
  }

  return (
    <StyledButton $variant={variant} $size={size} whileTap={{ scale: 0.98 }} {...props}>
      {children}
    </StyledButton>
  );
};
