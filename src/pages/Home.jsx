import React from 'react';
import Button from '../components/Button';

const Home = () => {
  return (
    <>
      <div>
        <Button size="big" color="primary" fill={true} label="로그인" />
      </div>
      <div style={{ marginTop: '20px' }}>
        <Button size="small" color="primary" fill={false} label="프로필 수정" />
      </div>
    </>
  );
};

export default Home;
