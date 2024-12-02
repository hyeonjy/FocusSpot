import React, { useState } from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';

const SearchSidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // NOTE : 임시 데이터 추후 변경
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <StContainer $isSidebarOpen={isSidebarOpen}>
      <StTitle>
        현재 위치 <span>전체</span> 결과 총 <span>14</span>개
      </StTitle>
      <StSearchList>
        {items.map((item, index) => (
          <StListItemWrapper key={item} $isFirstChild={index === 0}>
            <ListItem key={item} handleClick={openModal} />
          </StListItemWrapper>
        ))}
      </StSearchList>
      <StButton title={`${isSidebarOpen ? '검색 리스트 닫기' : '검색 리스트 열기'}`} onClick={toggleSidebar}>
        {/* NOTE : 임시 svg, 따로 제공해줄지, react-icons사용할지 논의 */}
        {isSidebarOpen ? (
          <svg
            stroke="currentColor"
            fill="currentColor"
            viewBox="0 0 192 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
          </svg>
        ) : (
          <svg
            stroke="currentColor"
            fill="currentColor"
            viewBox="0 0 192 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M192 384.662V127.338c0-17.818-21.543-26.741-34.142-14.142L29.196 241.858c-7.81 7.81-7.81 20.474 0 28.284l128.662 128.662C170.457 411.404 192 402.48 192 384.662z"></path>
          </svg>
        )}
      </StButton>
    </StContainer>
  );
};

const StContainer = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: 380px;
  height: 100vh;
  padding: 30px;
  background-color: var(--color-white);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 5px 0px 15px 0px;
  transform: translate3d(${({ $isSidebarOpen }) => ($isSidebarOpen ? '0' : '380px')}, 0, 0);
  transition: transform 300ms ease-in-out;
  z-index: 99999;
`;

const StTitle = styled.h2`
  padding: 10px 0px 20px;
  font-size: 18px;
  line-height: 1;
  letter-spacing: -0.03em;
  border-bottom: 1px solid var(--color-gray2);

  span {
    color: var(--color-primary);
  }
`;

const StSearchList = styled.ul`
  height: 100%;
  overflow-y: auto;
  padding: 25px 0;

  &::-webkit-scrollbar {
    display: none !important;
  }

  &::after {
    content: '';
    display: block;
    height: 25px;
  }
`;

const StListItemWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--color-gray7);
  padding: ${({ $isFirstChild }) => ($isFirstChild ? '0 0 20px' : '20px 0')};
`;

const StButton = styled.button`
  position: absolute;
  top: 50%;
  right: 380px;
  width: 24px;
  height: 58px;
  background-color: var(--color-white);
  border-radius: 4px 0px 0px 4px;
  transform: translateY(-50%);
  box-shadow: rgba(0, 0, 0, 0.1) -4px 1px 4px 0px;
  z-index: 99999;

  &:focus {
    box-shadow: rgba(0, 0, 0, 0.1) -4px 1px 4px 0px;
  }
`;

export default SearchSidebar;
