import React from 'react';
import styled from 'styled-components';

const AddressList = ({ addresses }) => {
  return (
    <StAddressList>
      <img src="/map.svg" />
      {addresses.map((address, index) => (
        <StAddressItem key={index}>
          {address}
          {index < addresses.length - 1 && <img src="/gt.svg" />}
        </StAddressItem>
      ))}
    </StAddressList>
  );
};

const StAddressList = styled.ol`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 30px;
  left: 50%;
  height: 40px;
  padding: 12px 30px;
  border-radius: 20px;
  background-color: var(--color-white);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 4px 0px;
  transform: translateX(-50%);
  z-index: 99999;

  img {
    margin-right: 10px;
  }
`;

const StAddressItem = styled.li`
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.03em;

  img {
    margin: 0 10px;
    font-size: 14px;
  }
`;

export default AddressList;
