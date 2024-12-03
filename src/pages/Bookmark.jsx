import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Modal from '../components/Modal';
import useFetchUserBookmarks from '../hooks/useFetchUserBookmarks';
import ProfileContainer from '../components/bookmark/ProfileContainer';
import BookmarksContainer from '../components/bookmark/BookmarksContainer';
import Button from '../components/Button';
import useAddBookmark from '../hooks/useAddBookmark';

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
  const itemData = {
    address_name: 'test50 서울 영등포구 영등포동592-70',
    category_group_code: '',
    category_group_name: '',
    category_name: '교육,학문 > 학습시설 > 도서관 > 작은도서관',
    distance: '1181',
    id: '21812157',
    phone: '02-847-8883',
    place_name: 'test50 영등포 본동 작은도서관',
    place_url: 'http://place.map.kakao.com/21812157',
    road_address_name: '서울 영등포구 신길로61길 17',
    x: '126.90934096274742',
    y: '37.51465047684256'
  };
  const { bookmarks, isPending, isError, error } = useFetchUserBookmarks(userId);

  // 북마크 추가 테스트
  const { mutate: addBookmark } = useAddBookmark(userId);

  // 렌더링 방지를 위해 useCallback으로 감싸봄
  const handleShowDetail = useCallback((itemData) => {
    console.log(`spot's card clicked`);
    setModalContent({ type: 'detail', data: itemData });
    setModalOpen(true);
  }, []);

  const handleShowProfile = useCallback(() => {
    setModalOpen(true);
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

  const handleAddBookmark = () => {
    console.log('북마크 추가 실행');
    addBookmark({ itemData });
  };

  const handleDeleteBookmark = () => {
    console.log('북마크 제거 실행');
  };

  return (
    <StBookmarkPage>
      <br />
      <Button size="small" color="primary" fill={false} label="북마크 추가" handleClick={handleAddBookmark} />
      <Button size="small" color="primary" fill={false} label="북마크 삭제" handleClick={handleDeleteBookmark} />
      {/* 프로파일 섹션 */}
      {/* openModal 부분이 props drilling 되고 있음 2단계 정도*/}
      <ProfileContainer openModal={handleShowProfile} />

      {/* 북마크 섹션 */}
      <BookmarksContainer bookmarks={bookmarks} onShowDetail={handleShowDetail} />

      {/* 모달 */}
      {modalOpen && (
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
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
