import React from 'react';
import styled, { keyframes } from 'styled-components';

// TODO: children 추가한 부분 충돌이 날 수도 있으니
// merge 때 확인 필요
const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <StOverlay onClick={onClose}>
      <StModalContainer isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <StCloseButton onClick={onClose}>X</StCloseButton>
      </StModalContainer>
    </StOverlay>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
  }
`;

const StOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const StModalContainer = styled.div`
  position: relative;
  width: 90%;
  max-width: 750px;
  padding: 50px 80px;
  background: var(--color-white);
  border-radius: 5px;
  box-shadow: var(--drop-shadow);
  animation: ${({ isOpen }) => (isOpen ? fadeIn : fadeOut)} 0.3s ease-in-out;
`;

const StCloseButton = styled.button`
  position: absolute;
  right: 40px;
  top: 40px;
  font-size: 25px;
`;

export default Modal;
