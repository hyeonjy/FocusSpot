import React from 'react'
import styled from 'styled-components';
import ListItem from '../ListItem';

const BookmarksContainer = ({ bookmarks, onShowDetail }) => {
  return (
    <StBookmarkSection>
      <StH1>내가 북마크한 곳</StH1>
      <StHr />
      <StBookmarkGird>
        {bookmarks.length === 0 ? (
          <p>저장된 북마크가 없습니다.</p>
        ) : (
          bookmarks.map((bookmark, i) => {
            return (
              <ListItem
                index={i}
                key={bookmark.spot_id}
                handleClick={() => onShowDetail(bookmark.spots)}
                itemData={bookmark.spots}
              />
            );
          })
        )}
      </StBookmarkGird>
    </StBookmarkSection>
  );
};

const StBookmarkSection = styled.div`
  width: var(--inner-width);

  display: flex;
  flex-direction: column;

  margin-top: 80px;
  margin-bottom: 50px;
`;

const StH1 = styled.p`
  font-size: 30px;
`;

const StHr = styled.hr`
  margin-top: 25px;
  margin-bottom: 30px;
  border-top: 1px solid var(--color-gray5);
`;

const StBookmarkGird = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(300px, auto));
  gap: 25px;
  li {
    border: var(--color-gray6) 1px solid;
    width: 100%;
    padding: 35px 40px 35px 20px;
    transition: transform 0.2s, box-shadow 0.2s;
    &:hover {
      border: var(--color-primary) 1px solid;
      box-shadow: rgba(0, 0, 0, 0.6) 0px 4px 8px;
      transform: translateY(-7px);
    }
  }
`;

export default React.memo(BookmarksContainer)
