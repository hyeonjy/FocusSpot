import React, { useState } from 'react';
import styled from 'styled-components';

const SearchResults = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleList = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <StContainer $isOpen={isOpen}>
      <StToggleButton onClick={toggleList}>{isOpen ? '>' : '<'}</StToggleButton>
      <StSearchList $isOpen={isOpen}>
        <StSearchItem>
          <StSearchTitle>
            <h3>A 런앤런스터디카페 부개점</h3>
            <StBookMark>📌</StBookMark>
          </StSearchTitle>
          <p>인천 부평구 길주남로 129</p>
          <p>010-2549-3854</p>
        </StSearchItem>
        <StSearchItem>
          <StSearchTitle>
            <h3>B 런앤런스터디카페 부개점</h3>
            <StBookMark>📌</StBookMark>
          </StSearchTitle>
          <p>인천 부평구 길주남로 129</p>
          <p>010-2549-3854</p>
        </StSearchItem>
      </StSearchList>
    </StContainer>
  );
};

export default SearchResults;

const StContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  display: flex;
  z-index: 10;
  align-items: center;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.$isOpen ? 'translateX(0)' : 'translateX(95%)')};
`;

const StToggleButton = styled.button`
  background-color: #fff;
  border: 1px solid #dddddd;
  border-right: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  height: 58px;
  cursor: pointer;
  font-size: 18px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StSearchList = styled.div`
  width: 365px;
  height: 100%;
  overflow: hidden;
  background: white;
  border-left: ${(props) => (props.$isOpen ? '1px solid #DDDDDD' : 'none')};
`;

const StSearchTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StBookMark = styled.div`
  border: 1px solid #dddddd;
  border-radius: 3px;
  padding: 3px;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    background-color: #dddddd;
  }
`;

const StSearchItem = styled.div`
  padding: 20px;
  border-bottom: 1px solid #ddd;

  h3 {
    margin: 0;
    font-size: 18px;
  }

  p {
    margin: 5px 0 0;
    color: #555;
  }
`;
