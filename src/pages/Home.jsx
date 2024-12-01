import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
  return (
    <>
      <StMainVisual>
        <StInner>
          <StTitleArea>
            <h2>
              빠르고 편리하게 찾아보는
              <br />내 주변 집중 공간
            </h2>
            <p>당신의 집중력을 높여줄 장소를 쉽게 찾는 방법</p>
            <Link to="">스터디카페 찾기</Link>
          </StTitleArea>
          <StVisualImage></StVisualImage>
        </StInner>
      </StMainVisual>
      <StSection>
        <strong>여러분의 학습을 지원하는 스터디카페를 간편하게 찾아보세요</strong>
        <p>
          다양한 옵션을 제공하는 저희 플랫폼을 통해, 빠르고 효율적인 검색으로
          <br />
          여러분의 필요에 맞는 최적의 공간을 만나실 수 있습니다.
        </p>
      </StSection>
    </>
  );
};

const StMainVisual = styled.section`
  width: 100%;
  padding: 50px 0 160px;
`;

const StInner = styled.div`
  width: 1280px;
  margin: 0 auto;
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

const StSection = styled.section`
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
