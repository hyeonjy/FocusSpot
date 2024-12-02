import React from 'react';
import styled from 'styled-components';

const defaultData = {
  name: '감자 카페',
  category: '스터디카페',
  address: '감자나라 고구마시 옥수수구 초당동'
};

const ListItem = ({ handleClick, itemData = defaultData }) => {
  // TODO: 주소 분리하는 로직 필요
  const streetAddress = itemData.address.split('\n');
  return (
    <StContainer>
      <button onClick={handleClick}></button>
      <StTitle>{itemData.name}</StTitle>
      <StCategory>{itemData.category}</StCategory>
      <StAddress>{streetAddress[0]}</StAddress>
      <StAddress>{streetAddress[1]}</StAddress>
      <StPhone>010-2549-3854</StPhone>
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
