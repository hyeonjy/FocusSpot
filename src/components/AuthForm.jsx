import React from 'react';
import styled from 'styled-components';
import InputText from './InputText';
import Button from './Button';

const AuthForm = ({ mode }) => {
  return (
    <StContainer>
      <StH2>{mode}</StH2>
      <StAuthForm>
        <li>
          <StInputTitle>회원 ID</StInputTitle>
          <InputText placeholderText="ID를 입력해주세요" />
        </li>
        <li>
          <StInputTitle>비밀번호</StInputTitle>
          <InputText placeholderText="비밀번호를 입력해주세요" />
        </li>
      </StAuthForm>
      <Button size="big" color="primary" fill={true} label="로그인" />
    </StContainer>
  );
};

const StContainer = styled.section`
  width: fit-content;
  max-width: 750px;
  min-width: 400px;
  margin: 0 auto;
  padding: 50px;
  background: var(--color-white);
  border-radius: 5px;
  box-shadow: var(--drop-shadow);
  button {
    margin: 0 auto;
  }
`;

const StH2 = styled.h2`
  text-align: center;
  margin-bottom: 50px;
  font-size: 30px;
  font-weight: 500;
`;

const StAuthForm = styled.ul`
  margin-bottom: 45px;
  li + li {
    margin-top: 28px;
  }
`;

const StInputTitle = styled.p`
  padding-left: 10px;
  font-size: 15px;
`;

export default AuthForm;
