import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding-bottom: 5rem;
`;

export const Section = styled.div`
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 0;
  animation: ${fadeIn} 0.4s ease-out;
`;

export const SectionTitle = styled.h2`
  font-family: 'Outfit', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--slate-900);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  svg {
    color: var(--primary);
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  align-items: start;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0; /* Critical for preventing overflow */
`;

export const JobTitleGroup = styled(FormGroup)`
  grid-column: 1 / -1;
`;

export const Label = styled.label`
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--slate-600);
  text-transform: uppercase;
  letter-spacing: 0.025em;
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1.5px solid var(--slate-200);
  border-radius: var(--radius);
  font-size: 0.9375rem;
  font-family: 'Inter', sans-serif;
  width: 100%;
  transition: var(--transition);
  background: var(--slate-50);
  color: var(--slate-900);

  &:hover {
    border-color: var(--slate-300);
  }

  &:focus {
    outline: none;
    border-color: var(--primary);
    background: #fff;
    box-shadow: 0 0 0 4px var(--primary-soft);
  }

  &::placeholder {
    color: var(--slate-400);
  }
`;

export const Textarea = styled.textarea`
  padding: 1rem;
  border: 1.5px solid var(--slate-200);
  border-radius: var(--radius);
  font-size: 0.9375rem;
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  resize: vertical;
  min-height: 120px;
  width: 100%;
  transition: var(--transition);
  background: var(--slate-50);
  color: var(--slate-900);

  &:hover {
    border-color: var(--slate-300);
  }

  &:focus {
    outline: none;
    border-color: var(--primary);
    background: #fff;
    box-shadow: 0 0 0 4px var(--primary-soft);
  }

  &::placeholder {
    color: var(--slate-400);
  }
`;

export const AddButton = styled.button`
  width: 100%;
  background: var(--slate-50);
  color: var(--primary);
  border: 2px dashed var(--slate-300);
  padding: 1rem;
  border-radius: var(--radius);
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;

  &:hover {
    background: var(--primary-soft);
    border-color: var(--primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const RemoveButton = styled.button`
  background: #fee2e2;
  color: #ef4444;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: var(--transition);
  margin-top: 1.5rem;

  &:hover {
    background: #ef4444;
    color: #fff;
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
  }
`;

export const ItemContainer = styled.div`
  border: 1.5px solid var(--slate-100);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  background: #fff;
  position: relative;
  transition: var(--transition);

  &:hover {
    border-color: var(--primary-soft);
    box-shadow: var(--shadow-md);
  }
`;

export const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
`;

export const SkillTag = styled.span`
  background: var(--grad-blue);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full);
  font-size: 0.8125rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
`;

export const SkillInput = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

export const PhotoBox = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 160px;
  background: var(--slate-50);
  border-radius: var(--radius-lg);
  border: 2px dashed var(--slate-300);
  cursor: pointer;
  position: relative;
  transition: var(--transition);
  overflow: hidden;

  &:hover {
    border-color: var(--primary);
    background: var(--primary-soft);
  }
`;

export const PhotoIcon = styled.div`
  color: var(--slate-400);
  font-size: 2.5rem;
`;

export const PlusSign = styled.div`
  position: absolute;
  right: 8px;
  bottom: 8px;
  background: var(--primary);
  color: #fff;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  box-shadow: var(--shadow);
`;

export const PhotoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const DateRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  padding: 0.5rem 0 0 0;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const ModalContent = styled.div`
  background: #fff;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  padding: 3rem 2rem;
  min-width: 440px;
  max-width: 90vw;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalClose = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: var(--slate-100);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--slate-500);
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background: var(--error);
    color: #fff;
    transform: rotate(90deg);
  }
`;

export const CustomizeButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #fff;
  border: 1.5px solid var(--slate-200);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--slate-600);
  cursor: pointer;
  z-index: 10;
  box-shadow: var(--shadow);
  transition: var(--transition);

  &:hover {
    border-color: var(--primary);
    color: var(--primary);
    transform: rotate(15deg);
  }
`;

export const PillTag = styled.button`
  border: 1.5px solid var(--slate-200);
  background: #fff;
  color: var(--slate-700);
  border-radius: var(--radius-full);
  padding: 0.5rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    border-color: var(--primary);
    color: var(--primary);
    background: var(--primary-soft);
    transform: translateY(-1px);
  }
`;

export const OutlinedPlusButton = styled.button`
  border: 1.5px solid var(--slate-200);
  background: #fff;
  color: var(--primary);
  border-radius: var(--radius);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    border-color: var(--primary);
    background: var(--primary);
    color: #fff;
    box-shadow: var(--shadow);
  }
`;
