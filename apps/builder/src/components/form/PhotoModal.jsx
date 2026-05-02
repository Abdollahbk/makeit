import React, { useState, useRef, useEffect } from 'react';
import { FiX, FiZoomIn, FiMove } from 'react-icons/fi';
import { ModalOverlay, ModalContent, ModalClose } from '../CVFormStyles';
import translations from '../../translations';

const PhotoModal = ({ 
  showPhotoModal, uploadedPhoto, language, 
  setShowPhotoModal, setUploadedPhoto, 
  appearance, setAppearance, 
  zoom, setZoom,
  posX, setPosX,
  posY, setPosY,
  handleSavePhoto 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // DRAG HANDLERS
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - posX,
      y: e.clientY - posY
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    setPosX(newX);
    setPosY(newY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // GLOBAL DRAG LISTENERS
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, posX, posY, dragStart]); // Added dependencies to ensure fresh closure values if needed

  // HOOKS MUST BE DECLARED ABOVE THIS LINE
  if (!showPhotoModal || !uploadedPhoto) return null;

  return (
    <ModalOverlay>
      <ModalContent style={{ maxWidth: '420px', padding: '2rem' }}>
        <ModalClose onClick={() => { setShowPhotoModal(false); setUploadedPhoto(null); }}><FiX /></ModalClose>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.4rem', fontWeight: 800, textAlign: 'center', color: '#1e293b' }}>
          {translations[language].photo}
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Draggable Preview Window */}
          <div 
            ref={containerRef}
            onMouseDown={handleMouseDown}
            style={{ 
              width: 220, 
              height: 220, 
              overflow: 'hidden', 
              borderRadius: appearance === 'circle' ? '50%' : appearance === 'arched' ? '75px 75px 0 0' : '16px', 
              border: '4px solid #fff', 
              boxShadow: '0 10px 25px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)',
              marginBottom: '1.5rem', 
              position: 'relative',
              background: '#f1f5f9',
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: 'none',
              touchAction: 'none'
            }}
          >
            <img 
              src={uploadedPhoto} 
              alt="Preview" 
              draggable="false"
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                transform: `scale(${zoom}) translate(${posX}px, ${posY}px)`,
                pointerEvents: 'none',
                transition: isDragging ? 'none' : 'transform 0.1s ease-out'
              }} 
            />
            {/* Guide Grid Overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none',
              border: '1px solid rgba(255,255,255,0.3)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gridTemplateRows: '1fr 1fr 1fr',
              opacity: isDragging ? 1 : 0,
              transition: 'opacity 0.2s'
            }}>
              <div style={{ border: '0.5px solid rgba(255,255,255,0.2)', borderLeft: 'none', borderTop: 'none' }}></div>
              <div style={{ border: '0.5px solid rgba(255,255,255,0.2)', borderLeft: 'none', borderTop: 'none' }}></div>
              <div style={{ border: 'none', borderTop: 'none' }}></div>
              <div style={{ border: '0.5px solid rgba(255,255,255,0.2)', borderLeft: 'none', borderTop: 'none' }}></div>
              <div style={{ border: '0.5px solid rgba(255,255,255,0.2)', borderLeft: 'none', borderTop: 'none' }}></div>
              <div style={{ border: 'none', borderTop: 'none' }}></div>
            </div>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FiMove /> Drag the image to reposition
          </p>

          {/* Controls Container */}
          <div style={{ width: '100%', background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
            {/* Zoom Slider */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <FiZoomIn style={{ color: '#2563eb' }} />
                <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#334155' }}>Zoom Level</label>
                <span style={{ marginLeft: 'auto', fontSize: '0.8rem', fontWeight: 600, color: '#2563eb', background: '#eff6ff', padding: '2px 8px', borderRadius: '4px' }}>
                  {Math.round(zoom * 100)}%
                </span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="4" 
                step="0.01" 
                value={zoom} 
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                style={{ width: '100%', cursor: 'pointer', accentColor: '#2563eb' }}
              />
            </div>

            {/* Appearance Toggles */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setAppearance('circle')}
                style={{
                  flex: 1,
                  padding: '0.6rem',
                  border: appearance === 'circle' ? '2px solid #2563eb' : '1px solid #e2e8f0',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  color: appearance === 'circle' ? '#2563eb' : '#64748b',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  boxShadow: appearance === 'circle' ? '0 4px 12px rgba(37,99,235,0.15)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {translations[language].circle}
              </button>
              <button
                type="button"
                onClick={() => setAppearance('square')}
                style={{
                  flex: 1,
                  padding: '0.6rem',
                  border: appearance === 'square' ? '2px solid #2563eb' : '1px solid #e2e8f0',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  color: appearance === 'square' ? '#2563eb' : '#64748b',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  boxShadow: appearance === 'square' ? '0 4px 12px rgba(37,99,235,0.15)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {translations[language].square}
              </button>
              <button
                type="button"
                onClick={() => setAppearance('arched')}
                style={{
                  flex: 1,
                  padding: '0.6rem',
                  border: appearance === 'arched' ? '2px solid #2563eb' : '1px solid #e2e8f0',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  color: appearance === 'arched' ? '#2563eb' : '#64748b',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  boxShadow: appearance === 'arched' ? '0 4px 12px rgba(37,99,235,0.15)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {translations[language].arched}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
            <button
              type="button"
              onClick={handleSavePhoto}
              style={{
                flex: 1.5,
                padding: '0.85rem',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '1rem',
                boxShadow: '0 4px 12px rgba(37,99,235,0.2)'
              }}
            >
              {translations[language].save}
            </button>
            <button
              type="button"
              onClick={() => { setShowPhotoModal(false); setUploadedPhoto(null); }}
              style={{
                flex: 1,
                padding: '0.85rem',
                backgroundColor: '#fff',
                color: '#64748b',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              {translations[language].cancel}
            </button>
          </div>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PhotoModal;
