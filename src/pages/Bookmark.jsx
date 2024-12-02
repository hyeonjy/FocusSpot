import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Modal from '../components/Modal';
import ListItem from '../components/ListItem';
import useFetchUserBookmarks from '../hooks/useFetchUserBookmarks';

const Bookmark = () => {
  const emptyCard = Array(8).fill({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 테스트용 유저 uuid
  // Bookmark 컴포넌트가 props로 받거나 다른 상태 관리 통해 전달 받을 것
  const userId = 'f75f60ff-8c33-4aba-813b-6a6e18af9d1e';
  // const { bookmarks, isLoading, isError, error } = useFetchUserBookmarks(userId);

  // // TODO 로딩화면 및 낙관적 업데이트 반영하기
  // if (isLoading) {
  //   return <div>로딩중...</div>;
  // }

  // // TODO 에러 발생시 처리 구현 필요
  // if (isError) {
  //   return <div>에러 발생 {error.message}</div>;
  // }

  // // TODO 북마크 존재 안하는 경우 구현 필요
  // if (bookmarks.length < 1) {
  //   return <div>북마크된 장소 없음</div>
  // }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleShowDetail = (i = "") => {
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
          <StH1>김철수!</StH1>
          <StUserEmail>test1234@naver.com</StUserEmail>
          <Button size="small" color="primary" fill={false} label="프로필 수정" handleClick={openModal} />
        </StProfileDetails>
      </StProfileSection>

      {/* 북마크 섹션 */}
      <StBookmarkSection>
        <StH1>내가 북마크한 곳</StH1>
        <StHr />
        <StBookmarkGird>
          {emptyCard.map((_, i) => {
            return (
              <StItemWrapper key={i}>
                {/* 현재 공용 컴포넌트 내용이 고정되어있어 유저 데이터로 변환 필요 */}
                <ListItem handleClick={() => handleShowDetail()} />
              </StItemWrapper>
            );
          })}
        </StBookmarkGird>
      </StBookmarkSection>

      {/* 모달 */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          컴포넌트 조건부 렌더링 필요
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
