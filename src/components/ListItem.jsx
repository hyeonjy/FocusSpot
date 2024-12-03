import React from 'react';
import styled from 'styled-components';

const defaultData = {
  place_name: '감자 카페',
  category_name: '서비스,산업 > 스터디카페,스터디룸',
  address_name: '감자나라 고구마시 옥수수구 초당동',
  road_address_name: '감자나라 고구마시 옥수수로 321',
  phone: '010-1234-3456'
};

const ListItem = ({ handleClick, itemData = defaultData }) => {
  // 세부 카테고리를 위한 trimming
  // 원래 데이터 - 서비스,산업 > 전문대행 > 공간대여 > 스터디카페,스터디룸
  const categories = itemData.category_name.split('>');
  const finalCategory = categories.slice(-1).join(', ').trim();

  // 지번 주소를 위한 trimming
  // 원래 데이터 - 서울 양천구 신정동 952-5
  // 변형 데이터 - (지번) 신정동 952-5
  const trimmedAddress = '(지번) ' + itemData.address_name.split(' ').slice(-2).join(' ');

  return (
    <StContainer>
      <button onClick={handleClick}></button>
      <StTitle>{itemData.place_name}</StTitle>
      <StCategory>{finalCategory}</StCategory>
      {itemData.road_address_name && <StAddress>{itemData.road_address_name}</StAddress>}
      {itemData.address_name && <StAddress>{trimmedAddress}</StAddress>}
      <StPhone>{itemData.phone ? itemData.phone : '전화번호 없음'}</StPhone>
    </StContainer>
  );
};

const StContainer = styled.li`
  position: relative;
  button {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const StCategory = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: var(--color-gray4);
  margin-bottom: 13px;
`;

const StAddress = styled.p`
  font-size: 13px;
  color: var(--color-gray2);
  p + & {
    margin-top: 4px;
  }
`;

const StPhone = styled.p`
  font-size: 13px;
  font-weight: 300;
  color: var(--color-gray2);
  margin-top: 16px;
`;

export default ListItem;
