import React, { useState } from 'react';
import Button from '../components/Button';
import InputText from '../components/InputText';
import ListItem from '../components/ListItem';
import Modal from '../components/Modal';
import AuthForm from '../components/AuthForm';
import AuthContainer from '../components/AuthContainer';
import Search from '../components/Search';
import styled from 'styled-components';
import BookmarksLoding from '../components/bookmark/BookmarksLoding';

const SharePreview = () => {
  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <div>
        <Button size="big" color="primary" fill={true} label="로그인" />
      </div>
      <div style={{ marginTop: '20px' }}>
        <Button size="small" color="gray2" fill={false} label="프로필 수정" />
      </div>
      <div style={{ marginTop: '20px', maxWidth: '300px' }}>
        <InputText
          inputType="text"
          inputName="test"
          placeholderText="장소를 검색해주세요."
          handleChange={handleInputChange}
        />
        <TestBtn>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_78_148)">
              <path
                d="M13.8769 5.38372L8.61629 0.123114C8.45084 -0.0423402 8.18356 -0.0423402 8.01811 0.123114L3.72902 4.41221L0.356291 4.97645C0.199321 5.0019 0.0720483 5.11221 0.0211392 5.26493C-0.0255275 5.41766 0.0126543 5.58311 0.1272 5.69342L3.91993 9.48615L0.415685 12.9819L1.01387 13.5801L4.51387 10.0801L8.30659 13.8728C8.3872 13.9577 8.4975 14.0001 8.60781 14.0001C8.65023 14.0001 8.69265 13.9916 8.73508 13.9789C8.88781 13.9322 8.99811 13.8007 9.02356 13.6437L9.58781 10.271L13.8769 5.9819C14.0424 5.82069 14.0424 5.54917 13.8769 5.38372Z"
                fill="#00115E"
              />
            </g>
            <defs>
              <clipPath id="clip0_78_148">
                <rect width="14" height="14" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </TestBtn>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AuthForm mode="edit"></AuthForm>
      </Modal>

      <AuthContainer mode="login"></AuthContainer>
      <AuthContainer mode="signup"></AuthContainer>

      <Search />

      <StInner>
        <BookmarksLoding />
      </StInner>
    </>
  );
};

const StInner = styled.div`
  width: var(--inner-width);
  margin: 0 auto;
`;

const TestBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: 1px solid var(--color-primary);

  &:hover {
    border-color: var(--color-gray5);
  }

  &:hover path {
    fill: var(--color-gray5) !important;
  }
`;

export default SharePreview;
