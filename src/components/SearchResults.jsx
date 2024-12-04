import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import DetailContent from './DetailContent';

const SearchResults = ({ places, activeFilter }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const toggleList = () => {
    setIsOpen((prev) => !prev);
  };

  const openModal = (place) => {
    setSelectedPlace(place);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPlace(null);
    setIsModalOpen(false);
  };

  console.log('places: ', places);
  console.log('open: ', isModalOpen);

  return (
    <>
      <StContainer $isOpen={isOpen}>
        <StSearchList>
          {places.map((place, index) => (
            <StSearchItem key={place.id} onClick={() => openModal(place)}>
              <StSearchTitle>
                <h3>{place.place_name}</h3>
                <StBookMark>📌</StBookMark>
              </StSearchTitle>
              <p>{place.road_address_name || place.address_name}</p>
              <p>{place.phone || '전화번호 없음'}</p>
            </StSearchItem>
          ))}
        </StSearchList>
      </StContainer>
      <StToggleButton $isOpen={isOpen} onClick={toggleList}>
        {isOpen ? '>' : '<'}
      </StToggleButton>

      <Modal isOpen={isModalOpen} onClose={closeModal} isDetail={true} itemData={selectedPlace}>
        <DetailContent place={selectedPlace} activeFilter={activeFilter} />
      </Modal>
    </>
  );
};

export default SearchResults;

const StContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 365px;
  z-index: 10;
  background: white;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.$isOpen ? 'translateX(0)' : 'translateX(365px)')};
  border-left: 1px solid #dddddd;
  overflow-y: auto;
`;

const StToggleButton = styled.button`
  position: absolute;
  top: 50%;
  right: ${(props) => (props.$isOpen ? '365px' : '10px')};
  transition: right 0.3s ease;
  background-color: #fff;
  border: 1px solid #dddddd;
  border-right: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  height: 70px;
  width: 30px;
  cursor: pointer;
  font-size: 18px;
  z-index: 11;
`;

const StSearchList = styled.div`
  height: 100vh;
  width: 100%;
  overflow-y: auto;
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
