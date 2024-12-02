import React, { useState } from 'react';
import Button from '../components/Button';
import InputText from '../components/InputText';
import ListItem from '../components/ListItem';
import Modal from '../components/Modal';
import AuthForm from '../components/AuthForm';
import AuthContainer from '../components/AuthContainer';

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
      </div>

      <ul style={{ marginTop: '20px', maxWidth: '300px' }}>
        <ListItem handleClick={openModal} />
      </ul>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AuthForm mode="edit"></AuthForm>
      </Modal>

      <AuthContainer mode="login"></AuthContainer>
      <AuthContainer mode="signup"></AuthContainer>
    </>
  );
};

export default SharePreview;
