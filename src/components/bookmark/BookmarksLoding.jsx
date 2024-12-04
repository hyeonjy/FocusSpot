import React from 'react';
import styled, { keyframes } from 'styled-components';

const BookmarksLoading = () => {
  return (
    <StContainer>
      {Array.from({ length: 6 }).map((_, index) => (
        <li key={index}></li>
      ))}
    </StContainer>
  );
};

const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const StContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  li {
    aspect-ratio: 1/0.7;
    background: linear-gradient(
      -45deg,
      var(--color-gray6),
      var(--color-gray7),
      var(--color-gray6),
      var(--color-gray7),
      var(--color-gray6),
      var(--color-gray7)
    );
    background-size: 500% auto;
    animation: ${gradient} 4s linear infinite;
  }
`;

export default BookmarksLoading;
