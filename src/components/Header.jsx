import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <StHeader>
      <StInner></StInner>
    </StHeader>
  );
};

const StHeader = styled.header``;

const StInner = styled.div`
  width: var(--inner-width);
  margin: 0 auto;
`;

export default Header;
