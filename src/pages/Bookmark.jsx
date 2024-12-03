import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Modal from '../components/Modal';
import useFetchUserBookmarks from '../hooks/useFetchUserBookmarks';
import ProfileContainer from '../components/bookmark/ProfileContainer';
import BookmarksContainer from '../components/bookmark/BookmarksContainer';
import DetailContent from '../components/DetailContent';
import { useUserStore } from '../zustand/userStore';

const Bookmark = () => {
  // const emptyCard = Array(8).fill({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    type: '',
    data: null
  });
  const [isDetail, setIsDetail] = useState(false);

  // 테스트용 유저 uuid
  // Bookmark 컴포넌트가 props로 받거나 다른 상태 관리 통해 전달 받을 것
  const { id: userId } = useUserStore();
  const { bookmarks, isPending, isError, error } = useFetchUserBookmarks(userId);

  // 북마크 추가 테스트

  // 렌더링 방지를 위해 useCallback으로 감싸봄
  const handleShowDetail = useCallback((itemData) => {
    console.log(`spot's card clicked`);
    setIsDetail(true);
    setModalContent({ type: 'detail', data: itemData });
    setModalOpen(true);
  }, []);

  const handleShowProfile = useCallback(() => {
    setModalOpen(true);
    setIsDetail(false);
    setModalContent({ type: 'profile', data: '제발 프로필 떠라ㅏㅏ' });
  }, []);

  // // TODO 로딩화면 및 낙관적 업데이트 반영하기
  if (isPending) {
    return <div>로딩중...</div>;
  }

  // TODO 에러 발생시 처리 구현 필요
  if (isError) {
    return <div>에러 발생 {error.message}</div>;
  }

  return (
    <StBookmarkPage>
      {/* 프로파일 섹션 */}
      {/* openModal 부분이 props drilling 되고 있음 2단계 정도*/}
      <ProfileContainer openModal={handleShowProfile} />

      {/* 북마크 섹션 */}
      <BookmarksContainer bookmarks={bookmarks} onShowDetail={handleShowDetail} />

      {/* 모달 */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} isDetail={isDetail} itemData={modalContent.data}>
        {modalContent.type === 'detail' ? (
          <DetailContent place={modalContent.data} />
        ) : (
          <p>프로필 수정 form으로 변경</p>
        )}
      </Modal>
    </StBookmarkPage>
  );
};

const StBookmarkPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Bookmark;
