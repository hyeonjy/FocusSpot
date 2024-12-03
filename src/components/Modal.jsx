import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import BookmarkButton from './BookmarkButton';

const Modal = ({ isOpen, onClose, children, isDetail = null, itemData }) => {
  // 스크롤 비활성화
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <StOverlay onClick={onClose} $isOpen={isOpen}>
      <StModalContainer onClick={(e) => e.stopPropagation()} $isOpen={isOpen}>
        {isDetail && (
          <BookmarkButton itemData={itemData} />
        )}
        <StCloseButton onClick={onClose}>X</StCloseButton>
        {children}
      </StModalContainer>
    </StOverlay>
  );
};

// 공통 애니메이션 정의
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
  }
  to {
    opacity: 0;
  }
`;

const StOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  z-index: 1000;
  animation: ${({ $isOpen }) => ($isOpen ? fadeIn : fadeOut)} 0.3s ease forwards;
`;

const StModalContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 750px;
  padding: 50px 80px;
  background: var(--color-white);
  border-radius: 5px;
  box-shadow: var(--drop-shadow);
  animation: ${({ $isOpen }) => ($isOpen ? fadeIn : fadeOut)} 0.3s ease forwards;

  & > button {
    margin: 0 auto;
  }
`;

const StCloseButton = styled.button`
  position: absolute;
  right: 40px;
  top: 40px;
  font-size: 25px;
`;

export default Modal;
