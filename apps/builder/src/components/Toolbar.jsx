import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiType, FiChevronDown, FiMaximize2, FiMinimize2, FiPlus, FiMinus } from 'react-icons/fi';
import { FaPalette } from 'react-icons/fa';
import translations from '../translations';

const ToolbarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1rem;
  justify-content: center;
  width: fit-content;
  flex-wrap: nowrap;

  @media (max-width: 768px) {
    gap: 0.35rem;
    padding: 0 0.25rem;
  }
`;

const ToolbarGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.25rem;
  }
`;

const ToolbarButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1.5px solid transparent;
  background: transparent;
  border-radius: var(--radius);
  color: var(--slate-600);
  cursor: pointer;
  transition: var(--transition);
  font-size: 1.125rem;
  
  &:hover {
    background: #fff;
    color: var(--primary);
    border-color: var(--primary-soft);
    box-shadow: var(--shadow-sm);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &.active {
    background: var(--primary);
    color: white;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }
`;

const ToolbarSelect = styled.select`
  border: 1.5px solid var(--slate-200);
  border-radius: var(--radius);
  padding: 0.5rem 2rem 0.5rem 1rem;
  background: #fff;
  color: var(--slate-700);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  min-width: 140px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  
  &:hover {
    border-color: var(--slate-300);
  }
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px var(--primary-soft);
  }

  @media (max-width: 768px) {
    min-width: 100px;
    padding: 0.4rem 1.5rem 0.4rem 0.5rem;
    font-size: 0.75rem;
  }
`;

const ToolbarInput = styled.input`
  border: 1.5px solid var(--slate-200);
  border-radius: var(--radius);
  padding: 0.5rem;
  background: #fff;
  color: var(--slate-700);
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
  width: 54px;
  transition: var(--transition);
  
  &:hover {
    border-color: var(--slate-300);
  }
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px var(--primary-soft);
  }

  @media (max-width: 768px) {
    width: 44px;
    padding: 0.4rem;
    font-size: 0.75rem;
  }
`;

const ZoomDisplay = styled.span`
  min-width: 56px;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--slate-700);
  background: var(--slate-100);
  padding: 0.5rem;
  border-radius: var(--radius);

  @media (max-width: 768px) {
    min-width: 46px;
    font-size: 0.75rem;
    padding: 0.4rem;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 24px;
  background: var(--slate-200);
  margin: 0 0.5rem;

  @media (max-width: 768px) {
    margin: 0 0.25rem;
    height: 18px;
  }
`;

const Toolbar = ({ 
  font, 
  setFont, 
  fontSize, 
  setFontSize, 
  zoom, 
  setZoom,
  textColor,
  setTextColor,
  onFullscreen,
  fullscreen,
  style,
  language
}) => {
  return (
    <ToolbarContainer style={style} fullscreen={fullscreen}>
      <ToolbarGroup>
        <ToolbarSelect value={font} onChange={e => setFont(e.target.value)}>
          <option value="Inter">Inter</option>
          <option value="Outfit">Outfit</option>
          <option value="Roboto">Roboto</option>
          <option value="Merriweather">Merriweather</option>
          <option value="Poppins">Poppins</option>
          <option value="Playfair Display">Playfair Display</option>
          <option value="Montserrat">Montserrat</option>
          <option value="Lato">Lato</option>
        </ToolbarSelect>
        <ToolbarInput 
          type="number" 
          min={8} 
          max={24} 
          value={fontSize} 
          onChange={e => setFontSize(Number(e.target.value))} 
        />
      </ToolbarGroup>

      <ToolbarGroup>
        <div style={{ position: 'relative', width: 38, height: 38 }}>
          <ToolbarButton 
            title={translations[language].text_color} 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          >
            <FaPalette style={{ color: textColor }} />
          </ToolbarButton>
          <input
            type="color"
            value={textColor}
            onChange={e => setTextColor(e.target.value)}
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              opacity: 0, 
              cursor: 'pointer',
              zIndex: 2
            }}
          />
        </div>
        <Divider />
        <ToolbarButton onClick={() => setZoom(z => Math.max(z - 0.1, 0.4))}>
          <FiMinus />
        </ToolbarButton>
        <ZoomDisplay>{Math.round(zoom * 100)}%</ZoomDisplay>
        <ToolbarButton onClick={() => setZoom(z => Math.min(z + 0.1, 2))}>
          <FiPlus />
        </ToolbarButton>
        <Divider />
        <ToolbarButton onClick={onFullscreen} title={fullscreen ? translations[language].exit_fullscreen : translations[language].enter_fullscreen}>
          {fullscreen ? <FiMinimize2 /> : <FiMaximize2 />}
        </ToolbarButton>
      </ToolbarGroup>
    </ToolbarContainer>
  );
};

export default Toolbar;