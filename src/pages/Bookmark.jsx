import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Modal from '../components/common/Modal';
import useFetchUserBookmarks from '../hooks/useFetchUserBookmarks';
import ProfileContainer from '../components/bookmark/ProfileContainer';
import BookmarksContainer from '../components/bookmark/BookmarksContainer';
import DetailContent from '../components/common/DetailContent';
import { useUserStore } from '../zustand/userStore';
import EditForm from '../components/bookmark/EditForm';

const Bookmark = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    type: '',
    data: null
  });
  const [isDetail, setIsDetail] = useState(false);

  // Bookmark 컴포넌트가 props로 받거나 다른 상태 관리 통해 전달 받을 것
  const { id: userId } = useUserStore();
  const { bookmarks, isPending, isLoading, isError, error } = useFetchUserBookmarks(userId);

  // 렌더링 방지를 위해 useCallback으로 감싸봄
  const handleShowDetail = useCallback((itemData) => {
    setIsDetail(true);
    setModalContent({ type: 'detail', data: itemData });
    setModalOpen(true);
  }, []);

  const handleShowProfile = useCallback(() => {
    setModalOpen(true);
    setIsDetail(false);
    setModalContent({ type: 'profile', data: '제발 프로필 떠라ㅏㅏ' });
  }, []);

  if (isError) {
    return <div>에러 발생 {error.message}</div>;
  }
  return (
    <StBookmarkPage>
      {/* 프로파일 섹션 */}
      <ProfileContainer openModal={handleShowProfile} />

      {/* 북마크 섹션 */}
      <BookmarksContainer bookmarks={bookmarks} onShowDetail={handleShowDetail} isLoading={isLoading} />

      {/* 모달 */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} isDetail={isDetail} itemData={modalContent.data}>
        {modalContent.type === 'detail' ? <DetailContent place={modalContent.data} /> : <EditForm mode="edit" />}
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
