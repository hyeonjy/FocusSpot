import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DetailContent = ({ place, activeFilter }) => {
  // 세부 카테고리를 위한 trimming
  // 원래 데이터 - 서비스,산업 > 전문대행 > 공간대여 > 스터디카페,스터디룸
  const categories = place.category_name.split('>');
  const finalCategory = categories.slice(-1).join(', ').trim();

  // 지번 주소를 위한 trimming
  // 원래 데이터 - 서울 양천구 신정동 952-5
  // 변형 데이터 - (지번) 신정동 952-5
  const trimmedAddress = '(지번) ' + place.address_name.split(' ').slice(-2).join(' ');

  return (
    <StContentWrapper>
      <header>
        <StModalCategory>{place.category_name.split('>').pop().trim()}</StModalCategory>
        <h1>{place.place_name}</h1>
      </header>
      <main>
        <h1>상세정보</h1>
        <p>
          <img src="/map.svg" />
          {place.address_name}
        </p>
        <StP>{trimmedAddress}</StP>
        <Link to={place.place_url}>
          <p>
            <img src="/home.svg" />
            {place.place_url}
          </p>
        </Link>
        <p>
          <img src="/phone.svg" />
          {place.phone || '전화번호 없음'}
        </p>
        <p>
          {' '}
          <img src="/net.svg" />#{activeFilter || finalCategory}
        </p>
      </main>
    </StContentWrapper>
  );
};

export default DetailContent;

const StContentWrapper = styled.div`
  background: transparent;
  margin: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  /* text-align: center; */
  position: relative;
  z-index: 15;

  header {
    margin-top: 25px;
    margin-left: 5px;
  }

  header > h1 {
    font-size: 30px;
    font-weight: 400;
  }

  main {
    padding: 10px;
    margin-top: 50px;
    margin-bottom: 10px;
  }

  main > h1 {
    font-size: 20px;
    font-weight: 800;
  }

  main > p {
    margin-top: 15px;
    display: flex;
    align-items: center;
  }

  main > p:last-child {
    color: #007aff;
  }

  p > img {
    margin-right: 10px;
  }

  a {
    display: block;
    margin-top: 15px;
    color: #007aff;
  }
`;

const StP = styled.p`
  padding-left: 1.5rem;
`;

const StModalCategory = styled.span`
  color: #999999;
  font-size: 20px;
  margin-bottom: 10px;
`;

const StButtonBox = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  align-items: center;
`;

const StTackButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #00115e;
  border-radius: 3px;
  margin-right: 12px;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #dddddd;
  }
`;

const StCloseButton = styled.div`
  cursor: pointer;
  font-size: 25px;
  &:hover {
    color: #dddddd;
  }
`;
