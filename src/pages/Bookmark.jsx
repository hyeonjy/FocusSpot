import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../components/Modal';
import ListItem from '../components/ListItem';
import useFetchUserBookmarks from '../hooks/useFetchUserBookmarks';
import ProfileContainer from '../components/bookmark/ProfileContainer';

const Bookmark = () => {
  // const emptyCard = Array(8).fill({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    type: '',
    data: null
  });

  // 테스트용 유저 uuid
  // Bookmark 컴포넌트가 props로 받거나 다른 상태 관리 통해 전달 받을 것
  const userId = 'f75f60ff-8c33-4aba-813b-6a6e18af9d1e';
  const { bookmarks, isLoading, isError, error } = useFetchUserBookmarks(userId);

  // // TODO 로딩화면 및 낙관적 업데이트 반영하기
  if (isLoading) {
    return <div>로딩중...</div>;
  }

  // TODO 에러 발생시 처리 구현 필요
  if (isError) {
    return <div>에러 발생 {error.message}</div>;
  }

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleShowProfile = () => {
    setModalOpen(true);
    setModalContent({ type: 'profile', data: '제발 프로필 떠라ㅏㅏ' });
  };

  const handleShowDetail = (itemData) => {
    console.log(`spot's card clicked`);
    // TODO 정보 모달이 뜨게금 구현 필요
    setModalContent({ type: 'detail', data: itemData });
    setModalOpen(true);
  };

  return (
    <StBookmarkPage>
      {/* 프로파일 섹션 */}
      {/* openModal 부분이 props drilling 되고 있음 */}
      <ProfileContainer openModal={handleShowProfile} />

      {/* 북마크 섹션 */}
      <StBookmarkSection>
        <StH1>내가 북마크한 곳</StH1>
        <StHr />
        <StBookmarkGird>
          {/* TODO 북마크가 존재하지 않을때 처리 구현 필요 */}
          {bookmarks.map((bookmark) => {
            return (
              <StItemWrapper key={bookmark.spot_id}>
                {/* 현재 공용 컴포넌트 내용이 고정되어있어 유저 데이터로 변환 필요 */}
                <ListItem handleClick={() => handleShowDetail(bookmark.spots)} itemData={bookmark.spots} />
              </StItemWrapper>
            );
          })}
        </StBookmarkGird>
      </StBookmarkSection>

      {/* 모달 */}
      {modalOpen && (
        <Modal isOpen={modalOpen} onClose={closeModal}>
          {modalContent.type === 'detail' ? <p>디테일 컴포넌트로 변경</p> : <p>프로필 수정 form으로 변경</p>}
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

const StH1 = styled.p`
  font-size: 30px;
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
