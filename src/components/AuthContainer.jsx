import React from 'react';
import styled from 'styled-components';
import AuthForm from './AuthForm';

const AuthContainer = ({ mode }) => {
  return (
    <StContainer mode={mode}>
      <AuthForm mode={mode} />
    </StContainer>
  );
};

const StContainer = styled.section`
  width: 90%;
  max-width: ${(props) => (props.mode === 'login' ? '400px' : '750px')};
  margin: 0 auto;
  padding: 50px;
  background: var(--color-white);
  border-radius: 5px;
  box-shadow: var(--drop-shadow);
  & > button {
    margin: 0 auto;
  }
`;

export default AuthContainer;
