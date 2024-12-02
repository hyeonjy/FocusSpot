import React, { useState } from 'react';
import styled from 'styled-components';

const Bookmark = () => {
  // css 영역 확인용 토글
  const [enableBG, setEnableBG] = useState(false);
  const emptyCard = Array(8).fill({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <StBookmarkPage>
      {/* 프로파일 섹션 */}
      <StProfileSection enableBG={enableBG}>
        <StProfilePicture alt={'profile image'} src={'https://www.w3schools.com/css/paris.jpg'} />
        <StProfileDetails enableBG={enableBG}>
          <StH1>김철수!</StH1>
          <StUserEmail>test1234@naver.com</StUserEmail>
          <StProfileEditButton onClick={openModal}>컴포넌트로 변경</StProfileEditButton>
        </StProfileDetails>
      </StProfileSection>

      {/* 북마크 섹션 */}
      <StBookmarkSection enableBG={enableBG}>
        <StH1>내가 북마크한 곳</StH1>
        <StHr />
        <StBookmarkGird enableBG={enableBG}>
          {/* 8개 기준 */}
          {emptyCard.map((_, i) => {
            return (
              <StCard key={i} enableBG={enableBG}>
                컴포넌트로 변경
              </StCard>
            );
          })}
        </StBookmarkGird>
      </StBookmarkSection>

      {/* 모달 */}
      {isModalOpen && (
        <StModalSection onClick={closeModal}>
          <StModalContent>컴포넌트로 변경</StModalContent>
        </StModalSection>
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
  background-color: ${({ enableBG }) => (enableBG ? 'rgba(170, 170, 170, 0.3)' : 'transparent')};
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
  background-color: ${({ enableBG }) => (enableBG ? 'rgba(170, 170, 170, 0.3)' : 'transparent')};
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
  color: var(--color-gray);
`;

const StProfileEditButton = styled.button`
  font-size: 13px;
  color: var(--color-primary);
  width: 100px;
  aspect-ratio: 10/3;
  border: var(--color-primary) 1px solid;
  border-radius: 30px;
`;

const StBookmarkSection = styled.div`
  background-color: ${({ enableBG }) => (enableBG ? 'rgba(170, 170, 170, 0.3)' : 'transparent')};
  width: 1280px;

  display: flex;
  flex-direction: column;

  margin-top: 80px;
  margin-bottom: 50px;
`;

const StHr = styled.hr`
  margin-top: 25px;
  margin-bottom: 30px;
  border-top: 1px solid var(--color-gray);
`;

const StBookmarkGird = styled.div`
  background-color: ${({ enableBG }) => (enableBG ? 'rgba(170, 170, 170, 0.3)' : 'transparent')};

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
`;

const StCard = styled.div`
  background-color: ${({ enableBG }) => (enableBG ? 'rgba(170, 170, 170, 0.3)' : 'transparent')};

  width: 300px;
  height: 200px;

  border: var(--color-gray) 1px solid;
`;

const StModalSection = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 5;
`;

const StModalContent = styled.div`
  position: relative;
  z-index: 10;
  background-color: white;
  width: 750px;
  height: 580px;
`;

export default Bookmark;
