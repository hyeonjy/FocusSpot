import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CarouselList from '../components/CarouselList';
import ListItem from '../components/ListItem';
import useFetchUserBookmarks from '../hooks/useFetchUserBookmarks';

const Home = () => {
  const userId = 'f75f60ff-8c33-4aba-813b-6a6e18af9d1e';
  const { bookmarks, isPending, isError, error } = useFetchUserBookmarks(userId);

  return (
    <>
      <StMainVisual>
        <StInner>
          <Stflex>
            <StTitleArea>
              <h2>
                빠르고 편리하게 찾아보는
                <br />내 주변 집중 공간
              </h2>
              <p>당신의 집중력을 높여줄 장소를 쉽게 찾는 방법</p>
              <Link to="">스터디카페 찾기</Link>
            </StTitleArea>
            <StVisualImage></StVisualImage>
          </Stflex>
        </StInner>
      </StMainVisual>
      <StBanner>
        <strong>여러분의 학습을 지원하는 스터디카페를 간편하게 찾아보세요</strong>
        <p>
          다양한 옵션을 제공하는 저희 플랫폼을 통해, 빠르고 효율적인 검색으로
          <br />
          여러분의 필요에 맞는 최적의 공간을 만나실 수 있습니다.
        </p>
      </StBanner>

      <StListSection>
        <StInner>
          <StH3>주변 스터디카페</StH3>
          <StList>
            <CarouselList>
              {bookmarks.map((bookmark) => {
                return <ListItem key={bookmark.spot_id} itemData={bookmark.spots} />;
              })}
            </CarouselList>
          </StList>
        </StInner>
      </StListSection>
      <StListSection>
        <StInner>
          <StH3>주변 도서관</StH3>
          <StList>
            <CarouselList>
              {bookmarks.map((bookmark) => {
                return <ListItem key={bookmark.spot_id} itemData={bookmark.spots} />;
              })}
            </CarouselList>
          </StList>
        </StInner>
      </StListSection>
    </>
  );
};

const StListSection = styled.section`
  margin-top: 100px;
`;

const StH3 = styled.h3`
  font-size: 30px;
  font-weight: 500;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
`;

const StList = styled.div`
  .slick-list {
    padding: 40px 0 10px;
    margin: 0 -14px;
  }
  li {
    border: var(--color-gray6) 1px solid;
    margin: 0 14px;
    padding: 35px 40px 35px 20px;
    transition: transform 0.2s, box-shadow 0.2s;
    &:hover {
      border: var(--color-primary) 1px solid;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px;
      transform: translateY(-7px);
    }
  }
`;

// -------------------------

const StMainVisual = styled.section`
  width: 100%;
  padding: 50px 0 160px;
`;

const StInner = styled.div`
  width: 1280px;
  margin: 0 auto;
`;

const Stflex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StTitleArea = styled.div`
  h2 {
    font-size: 50px;
    font-weight: 500;
    letter-spacing: -2.5px;
  }
  p {
    font-weight: 400;
    margin-top: 25px;
    font-size: 18px;
    letter-spacing: -1px;
  }
  a {
    display: block;
    width: 200px;
    padding: 19px 0 16px;
    margin-top: 60px;
    text-align: center;
    color: var(--color-white);
    background: var(--color-primary);
  }
`;

const StVisualImage = styled.div`
  width: 500px;
  height: 630px;
  background: url('/main_visual_img.jpg') no-repeat 50% 50%;
`;

const StBanner = styled.section`
  width: 100%;
  height: 350px;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  background: url('/main_section_bg.jpg') no-repeat 50% 50%;

  strong {
    font-size: 40px;
    font-weight: 500;
    letter-spacing: -2px;
  }
  p {
    font-size: 20px;
    margin-top: 30px;
    line-height: 1.4;
  }
`;

export default Home;
