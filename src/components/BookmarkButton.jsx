import React, { useState } from 'react';
import styled from 'styled-components';
import { useUserStore } from '../zustand/userStore';
import useAddBookmark from '../hooks/useAddBookmark';
import useDeleteBookmark from '../hooks/useDeleteBookmark';

const BookmarkButton = ({ itemData }) => {
  const { id: userId } = useUserStore();
  const [activated, setActivated] = useState(false);
  const { mutate: addBookmark, isPending: adding } = useAddBookmark(userId);
  const { mutate: deleteBookmark, isPending: deleting } = useDeleteBookmark(userId);

  // 버튼 기능
  const toggleBookmark = () => {
    setActivated((prev) => !prev);
    if (activated) {
      deleteBookmark(itemData.spot_id, {
        onSuccess: () => setActivated(false)
      });
    } else {
      addBookmark(
        { itemData },
        {
          onSuccess: () => setActivated(true)
        }
      );
    }
  };
  return (
    <StBookmarkButton onClick={toggleBookmark} $isActivated={activated} disabled={adding || deleting}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_78_148)">
          <path
            d="M13.8769 5.38372L8.61629 0.123114C8.45084 -0.0423402 8.18356 -0.0423402 8.01811 0.123114L3.72902 4.41221L0.356291 4.97645C0.199321 5.0019 0.0720483 5.11221 0.0211392 5.26493C-0.0255275 5.41766 0.0126543 5.58311 0.1272 5.69342L3.91993 9.48615L0.415685 12.9819L1.01387 13.5801L4.51387 10.0801L8.30659 13.8728C8.3872 13.9577 8.4975 14.0001 8.60781 14.0001C8.65023 14.0001 8.69265 13.9916 8.73508 13.9789C8.88781 13.9322 8.99811 13.8007 9.02356 13.6437L9.58781 10.271L13.8769 5.9819C14.0424 5.82069 14.0424 5.54917 13.8769 5.38372Z"
            fill="#00115E"
          />
        </g>
        <defs>
          <clipPath id="clip0_78_148">
            <rect width="14" height="14" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </StBookmarkButton>
  );
};

export default BookmarkButton;

const StBookmarkButton = styled.button`
  border: 1px solid var(--color-gray5);
  border-radius: 3px;
  padding: 5px;

  position: absolute;
  right: 70px;
  top: 37px;
  cursor: pointer;

  width: 30px;
  height: 30px;

  // 추가된 이펙트
  border-color: ${(props) => (props.$isActivated ? 'var(--color-primary)' : 'var(--color-gray5)')};

  svg path {
    fill: ${(props) => (props.$isActivated ? 'var(--color-primary)' : 'var(--color-gray5)')};
  }

  &:hover {
    border-color: var(--color-primary);
  }

  &:hover svg path {
    fill: var(--color-primary);
  }
`;
