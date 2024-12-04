import React, { useState } from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import Modal from './Modal';
import DetailContent from './DetailContent';

const SearchSidebar = ({ searchWord, activeFilter, places }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const openModal = (place) => {
    setSelectedPlace(place);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPlace(null);
    setIsModalOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <StContainer $isSidebarOpen={isSidebarOpen}>
        <StTitle>
          현재 위치 <span>{activeFilter || searchWord}</span> 결과 총 <span>{places.length}</span>개
        </StTitle>
        <StSearchList>
          {places.length === 0 ? (
            <div>검색결과가 없습니다.</div>
          ) : (
            places.map((place, index) => (
              <StListItemWrapper key={`${place.id}-${index}`} $isFirstChild={index === 0}>
                <ListItem index={index} itemData={place} handleClick={() => openModal(place)} />
              </StListItemWrapper>
            ))
          )}
        </StSearchList>
        <StButton title={`${isSidebarOpen ? '검색 리스트 닫기' : '검색 리스트 열기'}`} onClick={toggleSidebar}>
          {isSidebarOpen ? <img src="/close.svg" /> : <img src="/open.svg" />}
        </StButton>
      </StContainer>

      <Modal isOpen={isModalOpen} onClose={closeModal} isDetail={true} itemData={selectedPlace}>
        <DetailContent place={selectedPlace} activeFilter={activeFilter} />
      </Modal>
    </>
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
  z-index: 12;
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
  z-index: 12;

  &:focus {
    box-shadow: rgba(0, 0, 0, 0.1) -4px 1px 4px 0px;
  }
`;

export default SearchSidebar;
