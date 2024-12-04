import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import CarouselList from '../common/CarouselList';
import ListItem from '../common/ListItem';
import Modal from '../common/Modal';
import DetailContent from '../common/DetailContent';
import AuthForm from '../bookmark/AuthForm';

const ListSection = ({ title, listData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    type: '',
    data: null
  });
  const [isDetail, setIsDetail] = useState(false);

  const handleShowDetail = useCallback((itemData) => {
    setIsDetail(true);
    setModalContent({ type: 'detail', data: itemData });
    setModalOpen(true);
  }, []);

  const handleShowProfile = useCallback(() => {
    setIsDetail(false);
    setModalContent({ type: 'profile', data: '프로필 데이터' });
    setModalOpen(true);
  }, []);

  return (
    <StListSection>
      <StInner>
        <StH3>{title}</StH3>
        <StList>
          {listData && listData.length > 0 ? (
            <CarouselList>
              {listData.map((data) => (
                <ListItem
                  key={data.spot_id}
                  itemData={data.spots}
                  handleClick={() => handleShowDetail(data.spots)} // 모달 열기
                />
              ))}
            </CarouselList>
          ) : (
            <StPanel>북마크한 장소가 없습니다</StPanel>
          )}
        </StList>
      </StInner>

      {/* 모달 */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} isDetail={isDetail} itemData={modalContent.data}>
        {modalContent.type === 'detail' ? <DetailContent place={modalContent.data} /> : <AuthForm mode="edit" />}
      </Modal>
    </StListSection>
  );
};

const StListSection = styled.section`
  margin-top: 100px;
`;

const StInner = styled.div`
  width: var(--inner-width);
  margin: 0 auto;
  @media ${theme.device.tablet} {
    width: 75%;
  }
`;

const StH3 = styled.h3`
  font-size: 30px;
  font-weight: 500;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  @media ${theme.device.tablet} {
    font-size: 20px;
    padding-bottom: 15px;
  }
`;

const StList = styled.div`
  .slick-list {
    padding: 40px 0 10px;
    margin: 0 -14px;
  }
  .slick-track {
    display: flex;
    width: 100% !important;
  }
  .slick-slide {
    background: var(--color-white);
    border: 1px solid var(--color-gray6);
    margin: 0 14px;
    padding: 35px 40px 35px 20px;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      border: 1px solid var(--color-primary);
      box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px;
      transform: translateY(-7px);
    }
  }

  .slick-prev {
    left: -40px !important;
  }
  .slick-next {
    right: -40px !important;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 30px;
    color: var(--color-primary);
  }
  .slick-prev:before {
    content: '❮';
  }
  .slick-next:before {
    content: '❯';
  }
`;

const StPanel = styled.p`
  width: 100%;
  padding: 80px 0;
  text-align: center;
  font-size: 25px;
  color: var(--color-gray4);
`;

export default ListSection;
