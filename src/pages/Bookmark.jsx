import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../components/Modal';
import useFetchUserBookmarks from '../hooks/useFetchUserBookmarks';
import ProfileContainer from '../components/bookmark/ProfileContainer';
import BookmarksContainer from '../components/bookmark/BookmarksContainer';

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
  const { bookmarks, isPending, isError, error } = useFetchUserBookmarks(userId);

  // // TODO 로딩화면 및 낙관적 업데이트 반영하기
  if (isPending) {
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
    setModalContent({ type: 'detail', data: itemData });
    setModalOpen(true);
  };

  return (
    <StBookmarkPage>
      {/* 프로파일 섹션 */}
      {/* openModal 부분이 props drilling 되고 있음 2단계 정도*/}
      <ProfileContainer openModal={handleShowProfile} />

      {/* 북마크 섹션 */}
      <BookmarksContainer bookmarks={bookmarks} onShowDetail={handleShowDetail} />

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

export default Bookmark;
