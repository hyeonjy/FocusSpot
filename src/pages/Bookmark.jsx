import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Modal from '../components/Modal';
import ListItem from '../components/ListItem';

const Bookmark = () => {
  const emptyCard = Array(8).fill({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleShowDetail = (i) => {
    console.log(`spot's [${i}] card clicked`);
    // TODO 정보 모달이 뜨게금 구현 필요
    openModal();
  };

  return (
    <StBookmarkPage>
      {/* 프로파일 섹션 */}
      <StProfileSection>
        <StProfilePicture alt={'profile image'} src={'https://www.w3schools.com/css/paris.jpg'} />
        <StProfileDetails>
          <StH1>김철수</StH1>
          <StUserEmail>test1234@naver.com</StUserEmail>
          <Button size="small" color="primary" fill={false} label="프로필 수정" handleClick={openModal} />
        </StProfileDetails>
      </StProfileSection>

      {/* 북마크 섹션 */}
      <StBookmarkSection>
        <StH1>내가 북마크한 곳</StH1>
        <StHr />
        <StBookmarkGird>
          {/* 8개 기준 */}
          {emptyCard.map((_, i) => {
            return (
              <StItemWrapper key={i}>
                <ListItem handleClick={() => handleShowDetail(i)} />
              </StItemWrapper>
            );
          })}
        </StBookmarkGird>
      </StBookmarkSection>

      {/* 모달 */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {/* 조건부 컴포넌트 내용 필요 */}
        </Modal>
      )}
    </StBookmarkPage>
  );
};

const StBookmarkPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StProfileSection = styled.div`
  /* TODO 반응형 구현시 바꾸어야 할 부분 */
  height: 140px;
  width: 1280px;

  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 30px;
  margin-bottom: 30px;
`;

const StProfilePicture = styled.img`
  border-radius: 50%;
  height: 100%;
  width: auto;
  aspect-ratio: 1/1;
`;

const StProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  height: 100%;

  margin-left: 40px;
`;

const StH1 = styled.p`
  font-size: 30px;
`;

const StUserEmail = styled.p`
  font-size: 15px;
  color: var(--color-gray2);
`;

const StBookmarkSection = styled.div`
  /* TODO 반응형 구현시 바꾸어야 할 부분 */
  width: 1280px;

  display: flex;
  flex-direction: column;

  margin-top: 80px;
  margin-bottom: 50px;
`;

const StHr = styled.hr`
  margin-top: 25px;
  margin-bottom: 30px;
  border-top: 1px solid var(--color-gray5);
`;

const StBookmarkGird = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(300px, auto));
  gap: 25px;
`;

const StItemWrapper = styled.div`
  border: var(--color-gray6) 1px solid;
  width: 100%;
  padding: 35px 40px 35px 20px;

  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    border: var(--color-primary) 1px solid;
    box-shadow: rgba(0, 0, 0, 0.6) 0px 4px 8px;
    transform: translateY(-7px);
  }
`;

export default Bookmark;
