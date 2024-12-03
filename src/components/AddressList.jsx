import React from 'react';
import styled from 'styled-components';

const AddressList = ({ addresses }) => {
  return (
    <StAddressList>
      <StMap
        stroke="currentColor"
        fill="#2F3B84"
        strokeWidth="0"
        viewBox="0 0 384 512"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"></path>
      </StMap>
      {addresses.map((address, index) => (
        <StAddressItem key={index}>
          {address}
          {/* NOTE : 임시 Arrow */}
          {index < addresses.length - 1 && <StArrow>&gt;</StArrow>}
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
`;

const StAddressItem = styled.li`
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.03em;
`;

const StMap = styled.svg`
  margin-right: 10px;
`;

const StArrow = styled.span`
  margin: 0 10px;
  font-size: 14px;
`;

export default AddressList;
