import React from 'react';
import styled from 'styled-components';
import InputText from '../common/InputText';
import Button from '../common/Button';
import ImageUpload from '../common/ImageUpload';

const AuthForm = ({ mode }) => {
  const renderForm = {
    login: (
      <>
        <StH2>로그인</StH2>
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
      </>
    ),
    signup: (
      <>
        <StH2>회원가입</StH2>
        <StFlex>
          <StAuthFormLeft>
            <li>
              <ImageUpload />
            </li>
            <li>
              <StInputTitle>
                이름 <StRed>*</StRed>
              </StInputTitle>
              <InputText placeholderText="이름을 입력해주세요" />
            </li>
          </StAuthFormLeft>
          <StAuthForm>
            <li>
              <StInputTitle>
                회원 ID <StRed>*</StRed>
              </StInputTitle>
              <InputText placeholderText="ID를 입력해주세요" />
            </li>
            <li>
              <StInputTitle>
                이메일 <StRed>*</StRed>
              </StInputTitle>
              <InputText placeholderText="이메일을 입력해주세요" />
            </li>
            <li>
              <StInputTitle>
                비밀번호 <StRed>*</StRed>
              </StInputTitle>
              <InputText placeholderText="비밀번호를 입력해주세요" />
            </li>
            <li>
              <StInputTitle>
                비밀번호 확인 <StRed>*</StRed>
              </StInputTitle>
              <InputText placeholderText="비밀번호를 확인해주세요" />
            </li>
          </StAuthForm>
        </StFlex>
        <Button size="big" color="primary" fill={true} label="회원가입" />
      </>
    ),
    edit: (
      <>
        <StH2>프로필 수정</StH2>
        <StFlex>
          <StAuthFormLeft>
            <li>
              <ImageUpload />
            </li>
            <li>
              <StInputTitle>
                이름 <StRed>*</StRed>
              </StInputTitle>
              <InputText placeholderText="이름을 입력해주세요" />
            </li>
          </StAuthFormLeft>
        </StFlex>
        <Button size="big" color="primary" fill={true} label="수정 완료" />
      </>
    )
  };

  return renderForm[mode] || null;
};

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

const StFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 30px;
  ul {
    width: 47%;
  }
`;

const StAuthFormLeft = styled.ul`
  justify-self: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-height: 313px;
  margin: 0 auto;
  li {
    margin: 20px 0;
  }
`;

const StInputTitle = styled.p`
  padding-left: 10px;
  font-size: 15px;
`;

const StRed = styled.span`
  color: var(--color-red);
`;

export default AuthForm;
