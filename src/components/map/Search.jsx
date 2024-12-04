import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Search = ({ activeFilter, handleFilterClick, onSearchSubmit }) => {
  const [text, setText] = useState('');

  const [isVisible, setIsVisible] = useState(true); // 토글용 state
  const toggleSearchUI = () => {
    setIsVisible((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setText('');
    onSearchSubmit(text);
  };

  return (
    <StSearchWrapper $isVisible={isVisible}>
      <StToggleButton title={`${isVisible ? '검색 UI 닫기' : '검색 UI 열기'}`} onClick={toggleSearchUI}>
        {isVisible ? 'X' : <img src="/search.svg" />}
      </StToggleButton>
      <StSearchContainer $isVisible={isVisible}>
        <StLogoBox>
          <Link to="/">
            <img src="/white_logo.svg" />
          </Link>
          <StLoginButton>로그인</StLoginButton>
        </StLogoBox>
        <StSearchBox>
          <StSearchForm onSubmit={handleSubmit}>
            <StSearchInput placeholder="장소를 검색해주세요." value={text} onChange={handleSearchChange} />
            <button style={{ marginRight: '15px' }}>
              <img src="/search.svg" />
            </button>
          </StSearchForm>
          <StButtonGroup>
            <StFilterButton $isActive={activeFilter === '전체'} onClick={() => handleFilterClick('전체')}>
              전체
            </StFilterButton>
            <StFilterButton $isActive={activeFilter === '스터디카페'} onClick={() => handleFilterClick('스터디카페')}>
              <img src={activeFilter === '스터디카페' ? '/white_pencil.svg' : '/navy_pencil.svg'} />
              <p>스터디카페</p>
            </StFilterButton>
            <StFilterButton $isActive={activeFilter === '도서관'} onClick={() => handleFilterClick('도서관')}>
              <img src={activeFilter === '도서관' ? '/white_book.svg' : '/navy_book.svg'} />
              <p>도서관</p>
            </StFilterButton>
            <StFilterButton $isActive={activeFilter === '카페'} onClick={() => handleFilterClick('카페')}>
              <img src={activeFilter === '카페' ? '/white_coffee.svg' : '/navy_coffee.svg'} />
              <p>카페</p>
            </StFilterButton>
          </StButtonGroup>
        </StSearchBox>
      </StSearchContainer>
    </StSearchWrapper>
  );
};

export default Search;

// 토글버튼

const StToggleButton = styled.button`
  position: absolute;
  right: -50px;
  top: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-white);
  border: 1px solid var(--color-gray5);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;

//------------------

const StSearchWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 400px;
  transform: translateX(${({ $isVisible }) => ($isVisible ? '0' : '-100%')});
  transition: 0.5s ease;
  z-index: 10;
`;

const StSearchContainer = styled.div`
  opacity: ${({ $isVisible }) => ($isVisible ? '1' : '0')};
  transition: inherit;
  background: white;
  border: 1px solid #00115e;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const StLogoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #00115e;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 15px;
  height: 60px;
  img {
    vertical-align: middle;
  }
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
  display: flex;
  align-items: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  &:hover {
    background: #e0e0e0;
  }
  p {
    margin-left: 5px;
  }
`;
