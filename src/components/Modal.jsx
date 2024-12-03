import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import tackIcon from '/tack.svg';

const Modal = ({ isOpen, onClose, children, isDetail }) => {
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
          <StTackButton>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_78_148)">
                <path
                  d="M13.8769 5.38372L8.61629 0.123114C8.45084 -0.0423402 8.18356 -0.0423402 8.01811 0.123114L3.72902 4.41221L0.356291 4.97645C0.199321 5.0019 0.0720483 5.11221 0.0211392 5.26493C-0.0255275 5.41766 0.0126543 5.58311 0.1272 5.69342L3.91993 9.48615L0.415685 12.9819L1.01387 13.5801L4.51387 10.0801L8.30659 13.8728C8.3872 13.9577 8.4975 14.0001 8.60781 14.0001C8.65023 14.0001 8.69265 13.9916 8.73508 13.9789C8.88781 13.9322 8.99811 13.8007 9.02356 13.6437L9.58781 10.271L13.8769 5.9819C14.0424 5.82069 14.0424 5.54917 13.8769 5.38372Z"
                  fill="#00115E"
                />
              </g>
              <defs>
                <clipPath id="clip0_78_148">
                  <rect width="14" height="14" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </StTackButton>
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

const StTackButton = styled.button`
  border: 1px solid var(--color-gray5);
  border-radius: 3px;
  padding: 5px;

  position: absolute;
  right: 70px;
  top: 37px;
  cursor: pointer;

  width: 30px;
  height: 30px;

  &:hover {
    border-color: var(--color-primary);
  }

  svg path {
    fill: var(--color-gray5);
  }

  &:hover svg path {
    fill: var(--color-primary);
  }
`;

const StCloseButton = styled.button`
  position: absolute;
  right: 40px;
  top: 40px;
  font-size: 25px;
`;

export default Modal;
