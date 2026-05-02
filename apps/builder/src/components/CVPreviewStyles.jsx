import styled from 'styled-components';

export const CVGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.language === 'ar' ? '1fr 240px' : '240px 1fr'};
  height: 100%;
  width: 100%;
  background: #000;
`;

export const SidebarAccent = styled.div`
  position: absolute;
  ${props => props.language === 'ar' ? 'right: 0;' : 'left: 0;'}
  top: 0;
  width: 8px;
  height: 100%;
  background: var(--primary);
  border-radius: 0;
`;

export const Sidebar = styled.aside`
  position: relative;
  background: var(--gray-50);
  padding: 2.2rem 1.2rem 2.2rem 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${props => props.language === 'ar' ? 'border-left: 1.5px solid var(--border);' : 'border-right: 1.5px solid var(--border);'}
  height: 100%;
  min-width: 180px;
  max-width: 260px;
  border-radius: 0;
  box-shadow: 0 4px 24px 0 rgba(37,99,235,0.07);
  overflow: hidden;
`;

export const SidebarSection = styled.div`
  margin-bottom: 2.2em;
  width: 100%;
`;

export const Main = styled.main`
  padding: 2.2rem 2.5rem 2.2rem 2.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const Name = styled.h1`
  font-size: 2.2em;
  font-weight: 700;
  margin: 0 0 0.2em 0;
  color: var(--text-primary);
`;

export const Title = styled.h2`
  font-size: 1.1em;
  font-weight: 500;
  margin: 0 0 1.2em 0;
  color: var(--primary);
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1.5px solid var(--border);
  margin: 2em 0 2em 0;
`;

export const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4em;
  margin-top: 0.5em;
`;

export const Tag = styled.span`
  background: var(--primary-soft);
  color: var(--text-primary);
  padding: 0.2em 0.8em;
  border-radius: 12px;
  font-size: 0.85em;
  font-weight: 500;
`;

export const ExperienceItem = styled.div`
  margin-bottom: 1.7em;
  background: var(--primary-soft);
  border-radius: 12px;
  padding: 1.1em 1.3em 1.1em 1.3em;
  box-shadow: 0 2px 8px 0 rgba(37,99,235,0.04);
  page-break-inside: avoid;
  break-inside: avoid;
`;

export const ExperienceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.4em;
`;

export const ExperienceRole = styled.div`
  font-weight: 700;
  color: var(--text-primary);
  font-size: 1.08em;
`;

export const ExperienceCompany = styled.div`
  color: var(--primary);
  font-size: 0.97em;
  font-weight: 500;
`;

export const ExperienceDate = styled.div`
  color: var(--text-secondary);
  font-size: 0.93em;
  font-weight: 500;
`;

export const ExperienceDesc = styled.div`
  color: var(--text-secondary);
  font-size: 0.97em;
  margin-top: 0.5em;
`;

export const PhotoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  margin: 0 auto 1.2rem auto;
`;

export const PhotoImg = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  background: var(--surface);
  border-radius: ${props => (props['data-appearance'] === 'circle' ? '50%' : props['data-appearance'] === 'arched' ? '60px 60px 0 0' : '12px')};
  border: 4px solid var(--surface);
  box-shadow: var(--shadow);
`;

export const PreviewWrapper = styled.div`
  width: 210mm;
  min-height: 297mm;
  height: auto;
  background: #fff;
  margin: 0;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  position: relative;
  overflow: visible;
  direction: ${props => props.language === 'ar' ? 'rtl' : 'ltr'};
`;
