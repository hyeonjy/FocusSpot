import React from 'react';
import styled from 'styled-components';

const Search = ({ activeFilter, handleFilterClick }) => {
  return (
    <StSearchContainer>
      <StLogoBox>
        <StLogo>✎ FOCUS SPOT</StLogo>
        <StLoginButton>로그인</StLoginButton>
      </StLogoBox>
      <StSearchBox>
        <StSearchForm>
          <StSearchInput placeholder="장소를 검색해주세요." />
          <div style={{ marginRight: '15px' }}>🔍</div>
        </StSearchForm>
        <StButtonGroup>
          <StFilterButton $isActive={activeFilter === '전체'} onClick={() => handleFilterClick('전체')}>
            전체
          </StFilterButton>
          <StFilterButton $isActive={activeFilter === '스터디카페'} onClick={() => handleFilterClick('스터디카페')}>
            ✎ 스터디카페
          </StFilterButton>
          <StFilterButton $isActive={activeFilter === '도서관'} onClick={() => handleFilterClick('도서관')}>
            📖 도서관
          </StFilterButton>
          <StFilterButton $isActive={activeFilter === '카페'} onClick={() => handleFilterClick('카페')}>
            🧋 카페
          </StFilterButton>
        </StButtonGroup>
      </StSearchBox>
    </StSearchContainer>
  );
};

export default Search;

const StSearchContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
  background: white;
  border: 1px solid #00115e;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const StLogoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #00115e;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 12px;
  height: 60px;
`;

const StLogo = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

const StLoginButton = styled.button`
  border: 1px solid white;
  border-radius: 30px;
  background-color: #00115e;
  padding: 6px 18px;
  font-size: 13px;
  color: white;
  cursor: pointer;
`;

const StSearchBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

const StSearchForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
`;

const StSearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  width: 90%;
`;

const StButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StFilterButton = styled.button`
  background-color: ${(props) => (props.$isActive ? '#00115e' : 'white')};
  color: ${(props) => (props.$isActive ? 'white' : '#00115e')};
  border-radius: 50px;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #e0e0e0;
  }
`;
