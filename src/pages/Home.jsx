import React, { useState } from 'react';
import Button from '../components/Button';
import InputText from '../components/InputText';

const Home = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <>
      <div>
        <Button size="big" color="primary" fill={true} label="로그인" />
      </div>
      <div style={{ marginTop: '20px' }}>
        <Button size="small" color="gray2" fill={false} label="프로필 수정" />
      </div>
      <div style={{ marginTop: '20px', maxWidth: '300px' }}>
        <InputText inputType="text" inputName='test' placeholderText="장소를 검색해주세요." handleChange={handleInputChange} />
      </div>
    </>
  );
};

export default Home;
