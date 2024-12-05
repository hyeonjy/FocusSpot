import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import useFetchUserBookmarks from '../hooks/useFetchUserBookmarks';
import theme from '../styles/theme';
import ListSection from '../components/home/ListSection';
import { useUserStore } from '../zustand/userStore';

const Home = () => {
  const { id: userId } = useUserStore();
  const { bookmarks, isPending, isLoading, isError, error } = useFetchUserBookmarks(userId);

  const titleRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // 애니메이션 클래스를 추가
    if (titleRef.current) {
      titleRef.current.classList.add('fade-in');
    }
    if (imageRef.current) {
      imageRef.current.classList.add('fade-in');
    }
  }, []);

  return (
    <>
      <StMainVisual>
        <StInner>
          <Stflex>
            <StTitleArea ref={titleRef}>
              <h2>
                빠르고 편리하게 찾아보는
                <br />내 주변 집중 공간
              </h2>
              <p>당신의 집중력을 높여줄 장소를 쉽게 찾는 방법</p>
              <Link to={`/map?filter=스터디카페`}>스터디카페 찾기</Link>
            </StTitleArea>
            <StVisualImage ref={imageRef}></StVisualImage>
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

      <ListSection title="북마크한 곳" listData={bookmarks} />
      {/* <ListSection title="주변 도서관" listData={bookmarks} /> */}
    </>
  );
};

// 애니메이션 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StMainVisual = styled.section`
  position: relative;
  width: 100%;
  padding: 50px 0 160px;
  @media ${theme.device.tablet} {
    padding: 150px 0 200px;
  }
`;

const StInner = styled.div`
  width: var(--inner-width);
  margin: 0 auto;
`;

const Stflex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  @media ${theme.device.tablet} {
    flex-wrap: wrap;
  }
`;

const StTitleArea = styled.div`
  @media ${theme.device.mobile} {
    text-align: center;
    margin: 0 auto;
  }
  h2 {
    font-size: 3.1vw;
    font-weight: 500;
    letter-spacing: -2.5px;
    @media ${theme.device.laptop} {
      font-size: 30px;
    }
    @media ${theme.device.mobile} {
      font-size: 27px;
      letter-spacing: -1px;
    }
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
    @media ${theme.device.tablet} {
      width: 160px;
      padding: 15px 0 13px;
    }
    @media ${theme.device.mobile} {
      margin: 60px auto;
    }
  }
  &.fade-in {
    animation: ${fadeIn} 1s ease forwards;
  }
`;

const StVisualImage = styled.div`
  width: 39.0625%;
  max-width: 500px;
  aspect-ratio: 1/1.26;
  background: url('/main_visual_img.jpg') no-repeat 50% 50%;
  background-size: cover;
  position: relative;
  opacity: 0;

  @media ${theme.device.tablet} {
    position: absolute;
    right: 5%;
    bottom: 100px;
    z-index: -1;
    width: 250px;
    opacity: 0.2 !important;
  }
  @media ${theme.device.mobile} {
    right: 50%;
    bottom: 130px;
    aspect-ratio: 1/0.8;
    margin-right: -125px;
  }
  &.fade-in {
    animation: ${fadeIn} 1s ease forwards;
    animation-delay: 0.7s; /* 지연 시간 추가 */
  }
`;

const StBanner = styled.section`
  width: 100%;
  height: 350px;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  background: url('/main_section_bg.jpg') no-repeat 50% 50%;
  @media ${theme.device.laptop} {
    padding: 30px;
  }
  @media ${theme.device.tablet} {
    height: 280px;
    background-size: cover;
    background: none;
  }
  strong {
    font-size: 40px;
    font-weight: 500;
    letter-spacing: -2px;
    line-height: 1.3;
    word-break: keep-all;
    @media ${theme.device.laptop} {
      font-size: 30px;
    }
    @media ${theme.device.laptop} {
      font-size: 25px;
    }
  }
  p {
    font-size: 20px;
    margin-top: 30px;
    line-height: 1.4;
    word-break: keep-all;
    @media ${theme.device.laptop} {
      font-size: 18px;
    }
    @media ${theme.device.tablet} {
      font-size: 16px;
    }
  }
  p br {
    @media ${theme.device.tablet} {
      display: none;
    }
  }
`;

export default Home;
