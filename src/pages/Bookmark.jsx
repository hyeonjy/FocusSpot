import React, { useState } from 'react';
import styled from 'styled-components';

const Bookmark = () => {
  // css 영역 확인용 토글
  const [enableBG, setEnableBG] = useState(false);

  const emptyCard = Array(8).fill({});

  return (
    <StBookmarkPage>
      {/* 나중에 components로 refactor하기 (코드가 너무 길어유 -ㅅ-) */}
      <StProfileSection enableBG={enableBG}>
        <StProfilePicture alt={'profile image'} src={'https://www.w3schools.com/css/paris.jpg'} />
        <StProfileDetails enableBG={enableBG}>
          <StH1>김철수</StH1>
          <StUserEmail>test1234@naver.com</StUserEmail>
          <StProfileEditButton>컴포넌트로 변경</StProfileEditButton>
        </StProfileDetails>
      </StProfileSection>

      <StBookmarkSection enableBG={enableBG}>
        <StH1>내가 북마크한 곳</StH1>
        <StHr />
        <StBookmarkGird enableBG={enableBG}>
          {/* 8개 기준 */}
          {emptyCard.map((_, i) => {
            return <StCard key={i} enableBG={enableBG}>
              컴포넌트로 변경
            </StCard>;
          })}

        </StBookmarkGird>
      </StBookmarkSection>
    </StBookmarkPage>
  );
};

const StBookmarkPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StProfileSection = styled.div`
  background-color: ${({ enableBG }) => (enableBG ? 'rgba(170, 170, 170, 0.5)' : 'transparent')};
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
  background-color: ${({ enableBG }) => (enableBG ? 'rgba(170, 170, 170, 0.5)' : 'transparent')};
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
  background-color: ${({ enableBG }) => (enableBG ? 'rgba(170, 170, 170, 0.5)' : 'transparent')};
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
  background-color: ${({ enableBG }) => (enableBG ? 'rgba(170, 170, 170, 0.5)' : 'transparent')};

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
`;

const StCard = styled.div`
  background-color: ${({ enableBG }) => (enableBG ? 'rgba(170, 170, 170, 0.5)' : 'transparent')};

  width: 300px;
  height: 200px;

  border: var(--color-gray) 1px solid;
`;

export default Bookmark;
